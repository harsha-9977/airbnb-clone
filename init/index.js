const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
.then(() => {console.log("Successfully DB connected")})
.catch(err => {console.log(err)})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/WanderLust");
}


const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner:"68bb430cda8d9bccd74c8ce8"}));
    await Listing.insertMany(initData.data);
    console.log("data initialized");
};

initDb()