// fillGeometry.js
require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Listing = require('./models/listing.js');

const mapToken = process.env.MAPTILER_KEY;
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/WanderLust';

mongoose.connect(dbUrl)
    .then(() => console.log("✅ DB connected"))
    .catch(err => console.error("❌ DB connection error:", err));

async function updateListings() {
    const listings = await Listing.find({ geometry: { $exists: false } });

    for (let list of listings) {
        try {
            const geoRes = await axios.get(
                `https://api.maptiler.com/geocoding/${encodeURIComponent(list.location)}.json`,
                { params: { key: mapToken } }
            );

            if (geoRes.data.features && geoRes.data.features.length > 0) {
                const geometry = geoRes.data.features[0].geometry;
                list.geometry = geometry;
                await list.save();
                console.log(`✅ Updated geometry for: ${list.title}`);
            } else {
                console.log(`⚠️ No features found for: ${list.title}`);
            }

        } catch (err) {
            console.log(`❌ Error geocoding ${list.title}:`, err.message);
        }
    }

    console.log("🎉 Done updating listings!");
    mongoose.connection.close();
}

updateListings();
