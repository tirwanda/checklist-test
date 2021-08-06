const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const attributeSchema = new mongoose.Schema({
	object_domain: {
		type: String,
		required: true,
	},
	object_id: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	is_completed: {
		type: Boolean,
		default: false,
	},
	updated_by: {
		type: String,
	},
	update_at: {
		type: Date,
		default: null,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	due: {
		type: String,
		default: null,
	},
	urgency: {
		type: Number,
		default: 0,
	},
	last_updated_by: {
		type: String,
		default: null,
	},
	completed_at: {
		type: Date,
		default: null,
	},
});

module.exports = mongoose.model('Attribute', attributeSchema);
