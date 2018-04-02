// const s3 = require('s3');
// const path = require('path');
// // const build = require('./build');
// const task = require('./commands/task')

// const deployFile = require('./../config/deploy')

// console.log(deployFile(),'test');
// // const config = require('./config');

// module.exports = task('upload', () => Promise.resolve()
//   .then(() => Uploader)
// );
// const Uploader = new Promise((resolve, reject) => {
//   // const client = s3.createClient({
//   // s3Options: {
//   //     accessKeyId: 'AKIAJKZT6UYKUVQTB66A',
//   //     secretAccessKey: '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',
//   //     region: 'us-east-1',
//   //     sslEnabled: true,
//   //   },
//   // });
//   // const uploader = client.uploadDir({
//   //   localDir: 'build/',
//   //   deleteRemoved: false,
//   //   s3Params: {
//   //     Bucket: 'lms-front-dev'
//   //   },
//   // });
//   // uploader.on('error', reject);
//   // uploader.on('end', resolve);
// })

const s3 = require('react-deploy')
const task = require('../lib/commands/task')

module.exports = task('upload', () => Promise.resolve()
  .then(() => {
    Uploader
  })
)
const Uploader = new Promise((resolve, reject) => {
  const client = s3.createClient({
  s3Options: {
      accessKeyId: 'AWS_KEY',
      secretAccessKey: 'AWS_SECRET_ACCESSKEY',
      region: 'REGION',
      sslEnabled: true,
      Bucket:'BUCKETNAME'
    },
  })
  const uploader = client.uploadDir({
    localDir: 'DISTRIBUTIONFOLDER', //dist
    deleteRemoved: false,
    s3Params: {
      Bucket: 'BUCKETNAME'
    },
  })

  // on deploy  create a finger print
    client.createRevision()

  // // display revisions
  //  client.displayRevisions()

  // // activate the new value
  //  client.activateRevisions('index:a00a13d')

   uploader.on('error', reject)
   uploader.on('end', resolve)
})