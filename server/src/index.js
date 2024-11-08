const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// File imports
const { app, server } = require("./socket");
const apiRouter = require("./routes");
const connectDB = require("./db");
const { sendErrorResponse } = require("./utils/responseUtils");

// Constants
const port = process.env.PORT || 8000;
const corsOptions = {
	origin: true,
	methods: "*",
	credential: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api", apiRouter);

// Error handling
app.use((err, req, res, next) => {
	return sendErrorResponse(res, err);
});

// Server initialization
(async () => {
	// Let the database connect before starting the server
	await connectDB();

	// Listening
	server.listen(port, () => {
		console.log(`Server is running on port ${port}`);
		console.log(`http://localhost:${port}`);
	});
})();
