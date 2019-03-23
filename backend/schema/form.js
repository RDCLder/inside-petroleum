const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema(
	{
		id: Number,
		title: String,
		description: String
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Form", FormSchema);