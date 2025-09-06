const express = require("express")
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer')

const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });
//3
// router.get("/",(req,res) => {
//     res.send("Connected Successfully");
// });

router
    .route("/")
    .get(wrapAsync (listingController.index))
    .post(
        isLoggedIn,
        upload.single("Listing[image]"),
        validateListing,
        wrapAsync (listingController.createListing)
    );

//3.3 New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync (listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("Listing[image]"),
        validateListing, 
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.deleteListing)
    );

//3.1  Index ROUTE

//3.2 Show ROUTE

//3.4 Create ROUTE

//3.5 Edit ROUTE
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync (listingController.renderEditForm));

//3.6 Update ROUTE

//3.7 Delete ROUTE


module.exports = router;