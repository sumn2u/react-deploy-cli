const reactDeploy = require('./react-deploy')
var ReadConfigTask = require('../lib/tasks/read-config');
var files       = require('./files');
var chalk       = require('chalk');
let filePath =  'deploy.js'

const s3 = require('react-deploy')
const task = require('../lib/commands/task')
const log = console.log

let projectDesc= {
    root:files.getCurrentDirectoryBase()
}
const key = process.argv[2]
const env = process.argv[3]

if(!key) {
    log()
    log( chalk.red('⚠  No activation key passed '))
    process.exit()
}
var readConfig = new ReadConfigTask({
    project: projectDesc,
    deployTarget: env == 'development' ? 'development' : env ,
    deployConfigFile: filePath
  });

module.exports = task('activate', () => Promise.resolve()
  .then(() => {
    readConfig.run().then(function(config){
        const Uploader = new Promise((resolve, reject) => {
        const client = s3.createClient({
        s3Options:config.s3
        })
        
       
        log()
        
        // // activate new versions
         client.activateRevisions(`index:${key}`)

         
      });
    })
  })

)
