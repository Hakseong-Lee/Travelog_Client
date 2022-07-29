import AWS from 'aws-sdk';

const region = process.env.REACT_APP_AWS_BUCKET_REGION;
const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME;
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

AWS.config.update({
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
});
const myBucket = new AWS.S3({
	params: { Bucket: bucketName },
	region: region,
});

export function S3Upload(file) {
	const params = {
		ACL: 'public-read',
		Body: file,
		Bucket: bucketName,
		Key: `upload/${file.name}`,
		Expires: 86400,
	};
	myBucket
		.putObject(params)
		.on('httpUploadProgress')
		.send((err, data) => {
			if (err) alert(err);
		});
}

export function S3getFileURL(fileKey) {
	const params = {
		Bucket: bucketName,
		Key: fileKey,
	};
	const url = myBucket.getSignedUrl('getObject', params);
	return url;
}
export function S3deleteObject(fileKey) {
	const params = {
		Bucket: bucketName,
		Key: fileKey,
	};
	myBucket.deleteObject(params, function (err, data) {
		if (err) alert(err, err.stack);
	});
}
