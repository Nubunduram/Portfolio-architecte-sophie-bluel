const db = require('./../models');
const Works = db.works;
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

exports.findAll = async (req, res) => {
	try {
		const works = await Works.findAll({ include: 'category' });
		return res.status(200).json(works);
	} catch (err) {
		return res.status(500).json({ error: 'Something went wrong' });
	}
}

exports.create = async (req, res) => {
	const title = req.body.title;
	const categoryId = req.body.category;
	const userId = req.auth.userId;
	const imageUrl = req.file.location;

	try {
		const work = await Works.create({
			title,
			imageUrl,
			categoryId,
			userId
		});
		return res.status(201).json(work);
	} catch (err) {
		return res.status(500).json({ error: 'Something went wrong' });
	}
}

const url = require('url');

exports.delete = async (req, res) => {
	try {
		// Fetch the work object from the database
		const work = await Works.findByPk(req.params.id);
		if (!work) {
			return res.status(404).json({ error: 'Work not found' });
		}

		const parsedUrl = url.parse(work.imageUrl);
		const key = parsedUrl.pathname.substr(1);

		const s3 = new S3Client({
			region: "eu-north-1",
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
			}
		});
		const deleteParams = {
			Bucket: 'architect-portfolio',
			Key: key
		};
		await s3.send(new DeleteObjectCommand(deleteParams));

		// Delete the work object from the database
		await Works.destroy({ where: { id: req.params.id } });

		return res.status(204).json({ message: 'Work Deleted Successfully' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Something went wrong' });
	}
};
