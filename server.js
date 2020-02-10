var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
