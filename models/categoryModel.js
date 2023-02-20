const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	  },
	categoryCode: {
		type: String,
		required: [true, "Category Code is required"],
		unique: [true, "Category code Already Exists"],
	},
	categoryName: {
		type: String,
		required: [true, "category name required"],
		min: [12, "min is 12"],
		max: [12, "max is 12"],
	},
},
{  
     timestamps: true 
}
);

module.exports = mongoose.model("Category", categorySchema, "Category");
