require("dotenv").config();
const axios = require("axios");

const mapToken = process.env.MAPTILER_KEY;

async function testForwardGeocode(address) {
  try {
    const geoRes = await axios.get(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json`,
      { params: { key: mapToken } }
    );

    if (geoRes.data.features && geoRes.data.features.length > 0) {
      const { coordinates } = geoRes.data.features[0].geometry;
      console.log("✅ Geocode success:");
      console.log("Address:", address);
      console.log("Coordinates:", coordinates); // [lng, lat]
    } else {
      console.log("❌ No results found for:", address);
    }
  } catch (err) {
    console.error("Geocoding error:", err.message);
  }
}

// 🔍 Test with any address
testForwardGeocode("Bangalore, India");
