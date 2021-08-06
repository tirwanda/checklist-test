const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const listSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
		default: 'checklists',
	},
	attributes: {
		type: ObjectId,
		ref: 'Attribute',
	},
	links: {
		type: ObjectId,
		ref: 'Link',
	},
});

module.exports = mongoose.model('List', listSchema);
