document.addEventListener("DOMContentLoaded", function() {
    // Coordinates from backend (lng, lat)

    const [lng, lat] = list.geometry.coordinates; // destructure correctly

    const apiKey = mapToken; // pass from server
    const map = L.map('map').setView([lat, lng], 13);

    L.tileLayer(`https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${apiKey}`, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.maptiler.com/">MapTiler</a>',
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        crossOrigin: true
    }).addTo(map);

    console.log("📌 Coordinates (lng,lat):", list.geometry.coordinates);
    console.log("✅ Using in Leaflet (lat,lng):", lat, lng);

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
            `<b>${list.title}</b><br><p>Exact location provided after booking</p>`
        )
        .openPopup();
});
