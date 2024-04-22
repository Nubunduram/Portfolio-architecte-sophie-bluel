const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config();

const s3 = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const uploadImage = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'architect-portfolio',
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			const uniquePrefix = Date.now().toString();
			const filename = `${uniquePrefix}-${file.originalname}`;
			cb(null, filename);
		}
	})
});


module.exports = uploadImage;
