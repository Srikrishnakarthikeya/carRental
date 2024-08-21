const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

const loadCars = () => {
  fetch('/api/cars')
    .then(response => response.json())
    .then(cars => {
      cars.forEach(car => {
        const color = car.isAvailable ? 'red' : 'green';
        const marker = L.circleMarker([51.505 + Math.random() * 0.01, -0.09 + Math.random() * 0.01], {
          color,
          radius: 10,
        }).addTo(map);

        marker.bindPopup(`<b>${car.make} ${car.model}</b><br>Availability: ${car.isAvailable}`);
      });
    });
};

loadCars();

const socket = io();
socket.on('carAvailabilityUpdate', () => {
  map.eachLayer((layer) => {
    if (!!layer.toGeoJSON) {
      map.removeLayer(layer);
    }
  });
  loadCars(); // Reload cars when an update is detected
});
