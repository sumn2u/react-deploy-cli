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

   uploader.on('error', reject)
   uploader.on('end', resolve)
})