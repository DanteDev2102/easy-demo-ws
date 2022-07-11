const map = L.map('map-template').setView([51.505, -0.09], 3);

const tileURL =
	'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=b7061d3c0fb54a409dee717c946dd025';
const tileURL2 =
	'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=b7061d3c0fb54a409dee717c946dd025';

const tile = L.tileLayer(tileURL2);

const socket = io.connect();

const marker = L.marker([50.5, 30.5]); // kiev, ukraine
marker.bindPopup('Hello There!');
map.addLayer(marker);

map.locate({ enableHighAccuracy: true });
map.on('locationfound', (e) => {
	const coords = [e.latlng.lat, e.latlng.lng];
	const newMarker = L.marker(coords);
	newMarker.bindPopup('You are Here!');
	map.addLayer(newMarker);
	socket.emit('userCoordinates', e.latlng);
});

socket.on('newUserCoordinates', (coords) => {
	console.log(coords);
	const userIcon = L.icon({
		iconUrl: '/img/icon2.png',
		iconSize: [38, 42]
	});
	const newUserMarker = L.marker([coords.lat, coords.lng], {
		icon: userIcon
	});
	newUserMarker.bindPopup('New User!');
	map.addLayer(newUserMarker);
});

map.addLayer(tile);
