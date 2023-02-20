require('dotenv').config();
const express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
let Topic =  require("./models/Topic");
const {runCompletion} = require("./services/OpenAIService")

const connectDB = async() => { 
	try {
		conn = await mongoose.connect(process.env.MONGODB_URI)
		console.log('MongoDB Connected: ' +conn.connection.host)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}
connectDB();

const port = process.env.PORT || 4000
const url = process.env.URL || "127.0.0.1"
const app = express();
const server = http.createServer(app)
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
const topicRoute = require('./routes/TopicRoutes'); 
app.use('/', topicRoute)

const io = new Server(server, {
	cors: {
		origin: "*",
	}
})

io.on("connection", (socket) => {
	socket.on("message", async(data) => {
		let message = [{message: data.message, sender: data.sender}];
		const topic = await Topic.findById(data.topicId);
		let updatedTopic = await Topic.findByIdAndUpdate(data.topicId, {
		  $set: { 
			history: topic.history.concat(message)
		  }
		}, { new: true })
		let prompt = updatedTopic.history.map(data => (data.message)).join('\n');
		console.log(prompt);
		const response = await runCompletion(prompt, updatedTopic.temperature);
		const responseMessage = {message: response, sender: 'robot'}
		updatedTopic = await Topic.findByIdAndUpdate(data.topicId, {
			$set: { 
			  history: updatedTopic.history.concat(responseMessage)
			}
		  }, { new: true })
		socket.emit("response", responseMessage);

	})

})

server.listen(port, () => {
console.log('Connected to port ' + port)
})
app.use((req, res, next) => {
    res.status(404).send('Error 404!')
});
    
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
});