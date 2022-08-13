require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();
const server = require("http").createServer(app);

// Connect to db
const db = require("./db");
db();

// Routes
app.use(cors());
app.use(express.json());
app.use("/api", require("./routes"));

// Socket connection
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  client.on("send_message", (data) => {
    // Broadcast to all users
    io.sockets.emit("receive_message", data);
  });
});

server.listen(process.env.PORT || 5000);
