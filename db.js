require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
	const connection = mongoose
		.connect(process.env.MONGODB_URI)
		try {
			if(connection)
			{
			  console.log("Mongodb Connection successed!")
			}
		} catch (error) {
			console.log("could not connect to database")
		}
};
