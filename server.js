const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let httpPort = 3000;
let messages = [];

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/messages', (request, response) => {
	response.send(messages);
});

app.post('/messages', (request, response) => {
	let inputData = request.body;
	messages.push(inputData);
	io.emit('message', inputData);
});

io.on('connection', (socket) => {
	console.log('user connnected!');
});

http.listen(httpPort, (err) => {
	if (err == null) {
		console.log('Server is running at port : ' + httpPort);
	} else {
		console.log('Error : ', err);
	}
});
