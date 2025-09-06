if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}   

//1
const express = require("express");
const app = express();

const path = require("path");
const mo = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//4
const mongoose = require("mongoose");

const dbUrl = process.env.ATLASDB_URL;

//7
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(mo("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'public')));

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*60*60
});

store.on("error",() =>{
    console.log("SESSION STORE ERROR",err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true,
        expires : Date.now() + 1000*60*60*24*7,
        maxAge : 1000*60*60*24*7,
    }
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//5
main()
.then(() => {console.log("Database Connected Successfully")})
.catch((err) => console.log(err))

//6
async function main() {
    await mongoose.connect(dbUrl);
}


app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// app.get("/demouser", async (req,res) => {
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username : "delta-student",
//     });
//     let registeredUser = await User.register(fakeUser,"chicken");
//     res.send(registeredUser);
// })




app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

// MiddleWare

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err,req,res,next) => {
    let {statusCode=500,message="something went wrong!"} = err;
    res.render("error.ejs",{message});
    // res.status(statusCode).send(message);
});

//2
app.listen(8050, () => {
    console.log("Listening to port no 8050");
});



//8 Testing Listing.js
// app.get("/Testing",(req,res) => {
//     let List = new Listing({
//         title : "nature",
//         description : "Vibing peacefully",
//         price : 2000,
//         location : "paris",
//         country : "europe",
//     });
//     List
//     .save()
//     .then(res => {console.log(res)})
//     .catch(err => {console.log(err)})
    
//     res.send("Testing Successfull");
// });
