const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Configure AWS SDK
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Multer-S3 configuration
const upload = multer({
    storage: multer.memoryStorage(),
});

const uploadToS3 = async (file, folderName) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${folderName}/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        await s3.send(new PutObjectCommand(params));
        return `${process.env.BUCKET_NAME}/${params.Key}`;
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
};

module.exports = { upload, uploadToS3 };
