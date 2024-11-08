const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const { addToWishlist } = require("./wishlistHandlers");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: true,
		methods: "*",
	},
});

// Store the loggedin user's socket id who are connected to this server instance
const userSocketMap = {}; // { userId -> [socketId, ...] }

// Helper function to get socketId by userId
const getSocketIds = (userId) => userSocketMap[userId];

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;
	if (userId !== undefined) {
		// Handle multiple loggedin
		if (userId in userSocketMap) {
			userSocketMap[userId].push(socket.id);
		} else {
			userSocketMap[userId] = [socket.id];
		}
	}

	// Triggered when user want to Add wishlist
	socket.on("add-wishlist", (data) => {
		// Save wishlist to database and emit to all connected sockets of multiple loggedin
		addToWishlist(data, getSocketIds(userId), io);
	});

	socket.on("disconnect", () => {
		// Don't delete all soceketId
		if (userId in userSocketMap) {
			userSocketMap[userId] = userSocketMap[userId].filter(
				(id) => id !== socket.id
			);
			if (userSocketMap[userId].length === 0) {
				delete userSocketMap[userId];
			}
		}
	});
});

module.exports = { app, io, server, getSocketIds };
