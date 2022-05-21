import dotenv from 'dotenv';
dotenv.config();

import AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

AWS.config.credentials = { accessKeyId: process.env.ACCESS_KEY_ID ?? '', secretAccessKey: process.env.SECRET_ACCESS_KEY ?? '' };

// Create S3 service object
let s3 = new AWS.S3({ endpoint: process.env.ENDPOINTAWS });

// call S3 to retrieve upload file to specified bucket
let uploadParams: PutObjectRequest = { Bucket: 'test-01', Key: '', Body: '', ACL: 'public-read', ContentType: 'image/jpeg' };
let file = process.argv[2];

// Configure the file stream and obtain the upload parameters
let fs = require('fs');
let fileStream = fs.createReadStream(file);
fileStream.on('error', function (err: any) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
let path = require('path');
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload(uploadParams, function (err, data) {
  if (err) {
    console.log('Error', err);
  }
  if (data) {
    console.log('Upload Success', data);
  }
});
