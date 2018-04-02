const s3 = require('s3');
const path = require('path');
// const build = require('./build');
const task = require('./commands/task')

const deployFile = require('./../config/deploy')

console.log(deployFile(),'test');
// const config = require('./config');

module.exports = task('upload', () => Promise.resolve()
  .then(() => Uploader)
);
const Uploader = new Promise((resolve, reject) => {
  // const client = s3.createClient({
  // s3Options: {
  //     accessKeyId: 'AKIAJKZT6UYKUVQTB66A',
  //     secretAccessKey: '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',
  //     region: 'us-east-1',
  //     sslEnabled: true,
  //   },
  // });
  // const uploader = client.uploadDir({
  //   localDir: 'build/',
  //   deleteRemoved: false,
  //   s3Params: {
  //     Bucket: 'lms-front-dev'
  //   },
  // });
  // uploader.on('error', reject);
  // uploader.on('end', resolve);
})