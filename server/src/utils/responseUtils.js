const { isHttpError } = require("./commonUtils");

const sendErrorResponse = (res, err) => {
	console.log(err);

	res.status(err?.statusCode || 500).json({
		success: false,
		message: isHttpError(err) ? err.message : "Internal Server Error",
	});
};

module.exports = { sendErrorResponse };
