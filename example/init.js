var map = L.map('map');
map.setView([51.505, -0.09], 13);

var layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

layer.addTo(map);

const geo_pr = new PlaceholderProvider('http://localhost:3000');

const search = new GeoSearch.GeoSearchControl({
    provider: geo_pr,
    showMarker: false,
    style: 'bar',
    maxSuggestions: -1,
    notFoundMessage: 'No matches',
});

map.addControl(search);
