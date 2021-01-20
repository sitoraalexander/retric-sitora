
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	username: { type: String, required: true },
	body: { type: String, required: true },
	date: { type: Date, default: Date.now },
	reply:{
		username:{
			type:String
		},
		body:{
			type:String
		},
		date: { type: Date, default: Date.now }	
	},
	isApproved:{
		type:Boolean,
		default:false
	}	
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
