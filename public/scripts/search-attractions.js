// Initial latitude and longitude values
var mapLat = -15.77972;
var mapLong = -47.92972;

// Get user current location
function getUserLocation(map) {
    navigator.geolocation.getCurrentPosition(place => {
        const { latitude, longitude } = place.coords;
        mapLat = latitude;
        mapLong = longitude;
        map.setView([mapLat, mapLong], 12);
        L.marker([latitude, longitude]).addTo(map)
            .bindPopup("<b>Estou aqui!</b>").openPopup();
    }, err => {
        alert(err.message);
    });
}

// Toggle button text content and hide image
function toggleMapText() {
    const ctx = document.getElementById('open-map');
    const imgctx = document.getElementById('map-image');
    imgctx.style.display = 'none';
    ctx.style.display = 'none';
}

// Open map on button click
function onButtonClick() {
    const mapContainer = document.getElementById('map-container');
    mapContainer.style.width = "600px";
    mapContainer.style.height = "400px";
    const map = L.map('map-container', { loadingControl: true }).setView([mapLat, mapLong], 13);

    getUserLocation(map);

    L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    toggleMapText();
}