const mongoose = require("mongoose");

const companyModel = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	  },
	  category_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Category",
	  },
	 companyName: {
		type: String,
		required: [true, "Company Name is required"],
		unique: [true, "Company Name Already Exists"],
	},
	phone: {
		type: Number,
		required: [true, "User phone number required"],
		min: [12, "Too Few. Not valid number. Eg. 251-XXX-XXXXXX"],
		unique: [true, "Company phone Already Exists"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		trim: true,
		lowercase: false,
		unique: [true, "Email already exists"],
	},
	location: {
		type: String,
		required: [true, "Location can't be blank"],
	},
	link: {
		type: String,
	},
	description: {
		type: String,
		required: [true, "description can't be blank"],
	},
	file:{
		 type: String, 
		 required: true 
		},

},
{  
	timestamps: true 
}
);

module.exports = mongoose.model("Company", companyModel, "Company");
