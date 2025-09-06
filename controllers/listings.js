const Listing = require("../models/listing");
const axios = require("axios");

const mapToken = process.env.MAPTILER_KEY;

module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const list = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path : "author",
        }
    })
    .populate("owner");
    if(!list) {
        req.flash("error","Listing doesn't exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {list});
}

module.exports.createListing = async (req,res) => {
    try {
        //  Forward geocoding
        const geoRes = await axios.get(
            `https://api.maptiler.com/geocoding/${encodeURIComponent(req.body.Listing.location)}.json`,
            { params: { key: mapToken } }
        );

        //  Log the raw response
        // console.log("📌 Geocoding API response:", JSON.stringify(geoRes.data, null, 2));

        if (!geoRes.data.features || geoRes.data.features.length === 0) {
            req.flash("error", "Invalid location");
            return res.redirect("/listings/new");
        }

        const geometry = geoRes.data.features[0].geometry;

        console.log("✅ Geometry extracted:", geometry);

        //  Save listing
        let url = req.file.path;
        let filename = req.file.filename;

        const list = new Listing(req.body.Listing);
        list.owner = req.user._id;
        list.image = { url, filename };
        list.geometry = geometry;
        let savedlist = await list.save();
        console.log(savedlist);

        req.flash("success","new listing created!");
        res.redirect("/listings");
    } catch (err) {
        console.error("Geocoding error:", err.message);
        req.flash("error","Could not process location");
        res.redirect("/listings/new");
    }
};


module.exports.renderEditForm = async(req,res) => {
    let {id} = req.params;
    const list = await Listing.findById(id);
    if(!list) {
        req.flash("error","Listing doesn't exist");
        return res.redirect("/listings");
    }
    let originalImageUrl = list.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs",{list, originalImageUrl});
}

module.exports.updateListing = async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async(req,res) => {
    let {id} = req.params;
    let DeletedList = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");
}