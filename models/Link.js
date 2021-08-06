const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const linkSchema = new mongoose.Schema({
	self: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Link', linkSchema);
