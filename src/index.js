const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const engine = require('ejs-mate');

require('dotenv').config();

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(require('./routes'));

require('./sockets')(io);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(process.env.PORT, () => {
	console.log('Server on port', process.env.PORT);
});
