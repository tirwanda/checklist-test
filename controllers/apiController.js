const Attribute = require('../models/Attribute');
const Data = require('../models/List');
const Link = require('../models/Link');

module.exports = {
	getDataById: async (req, res) => {
		try {
			const { id } = req.params;
			const data = await Data.findOne({ _id: id })
				.populate({
					path: 'attributes',
					select: 'object_domain object_id description is_completed due urgency completed_at last_updated_by update_at created_at',
				})
				.populate({
					path: 'links',
					select: 'self',
				});

			res.status(200).json({
				data,
			});
		} catch (err) {
			res.status(500).json({
				error: 'Server Error',
			});
		}
	},

	updateDataById: async (req, res) => {
		try {
			const {
				type,
				object_domain,
				object_id,
				description,
				is_completed,
				completed_at,
				created_at,
				self,
			} = req.body;
			const { id } = req.params;
			const data = await Data.findOne({ _id: id })
				.populate({
					path: 'attributes',
					select: 'object_domain object_id description is_completed urgency completed_at created_at',
				})
				.populate({
					path: 'links',
					select: 'self',
				});

			const attribute = await Attribute.findOne({
				_id: data.attributes._id,
			});
			attribute.object_domain = object_domain;
			attribute.object_id = object_id;
			attribute.description = description;
			attribute.is_completed = is_completed;
			attribute.completed_at = completed_at;
			attribute.created_at = created_at;
			await attribute.save();

			const link = await Link.findOne({
				_id: data.links._id,
			});
			link.self = self;

			data.type = type;

			await link.save();
			await data.save();

			res.status(200).json({
				data,
			});
		} catch (err) {
			res.status(500).json({
				error: 'Server Error',
			});
		}
	},

	getData: async (req, res) => {
		try {
			const data = await Data.find()
				.populate({
					path: 'attributes',
					select: 'object_domain object_id description is_completed due urgency completed_at last_updated_by update_at created_at',
				})
				.populate({
					path: 'links',
					select: 'self',
				});

			res.status(200).json({
				data,
			});
		} catch (error) {
			res.status(500).json({
				error: 'Server Error',
			});
		}
	},

	addData: async (req, res) => {
		const dataPost = new Data({
			attributes: req.body.attributes,
			links: req.body.links,
		});

		try {
			const data = await dataPost.save();
			res.json({ data });
		} catch (err) {
			res.json({ message: err });
		}
	},

	addLink: async (req, res) => {
		const linkPost = new Link({
			self: req.body.self,
		});

		try {
			const link = await linkPost.save();
			res.json({ link });
		} catch (err) {
			res.json({ message: err });
		}
	},

	addAttribute: async (req, res) => {
		const attributePost = new Attribute({
			object_domain: req.body.object_domain,
			object_id: req.body.object_id,
			description: req.body.description,
		});

		try {
			const attribute = await attributePost.save();
			res.json({ attribute });
		} catch (err) {
			res.json({ message: err });
		}
	},

	deleteDataById: async (req, res) => {
		try {
			const { id } = req.params;
			const data = await Data.findOne({ _id: id })
				.populate('attributes')
				.populate('links');

			const attribute = await Attribute.findOne({
				_id: data.attributes._id,
			});
			await attribute.remove();

			const link = await Link.findOne({
				_id: data.links._id,
			});
			await link.remove();

			await data.remove();

			res.status(200).json({
				message: 'Success Delete List',
			});
		} catch (err) {}
	},
};
