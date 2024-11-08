const { HttpError } = require("../errors");

const isArray = (arr) => {
	return Array.isArray(arr);
};

const isHttpError = (err) => {
	return err instanceof HttpError;
};

module.exports = { isArray, isHttpError };
