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

const command = process.argv[2]

var readConfig = new ReadConfigTask({
  project: projectDesc,
  deployTarget: command == 'development' ? 'development' : command ,
  deployConfigFile: filePath
});


module.exports = task('list', () => Promise.resolve()
  .then(() => {
    readConfig.run().then(function(config){
        // const Uploader = new Promise((resolve, reject) => {
        const client = s3.createClient({
        s3Options:config.s3
        })
        
       
        log()
        // // display revisions
         client.displayRevisions()
      
        // // activate the new value
        //  client.activateRevisions('index:a00a13d')
      // });
    })
  })

)
