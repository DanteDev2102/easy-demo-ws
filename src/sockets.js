module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log('new socket connected');
		console.log('hola');
		socket.on('userCoordinates', (coords) => {
			console.log(coords);
			socket.broadcast.emit('newUserCoordinates', coords);
		});
	});
};
