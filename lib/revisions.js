const reactDeploy = require('./react-deploy')
var ReadConfigTask = require('../lib/tasks/read-config');
var files       = require('./files');
var chalk       = require('chalk');
let filePath =  'config/deploy.js'

const s3 = require('react-deploy')
const task = require('../lib/commands/task')

// if (files.fileExists('config/deploy.js')) {
//   console.log(chalk.green('Deployment file already exits'));
// //   process.exit();
// }
// console.log('====================================');
// console.log(files.getCurrentDirectoryBase(), 'ReadConfigTask');
// console.log('====================================');
let projectDesc= {
    root:files.getCurrentDirectoryBase()
}
var readConfig = new ReadConfigTask({
    project: projectDesc,
    deployTarget: 'development',
    deployConfigFile: filePath
  });

//   console.log('====================================');
//   console.log(readConfig);
//   console.log('====================================');

module.exports = task('upload', () => Promise.resolve()
  .then(() => {
    readConfig.run().then(function(config){
        // var DeployTask = require('./lib/tasks/deploy');
        const Uploader = new Promise((resolve, reject) => {
        const client = s3.createClient({
        s3Options:config.s3
        })
        
       
    
        // // display revisions
         client.displayRevisions()
    
        // // activate the new value
        //  client.activateRevisions('index:a00a13d')
      });
  })
)

   
// }

// var chalk       = require('chalk');
// var fs = require('fs');

// fs.access('config/deploy.js', fs.F_OK, function(err) {
//     if (!err) {
//         // Do something
//         console.log(chalk.red('Deployment file  deosexits'));
//     } else {
//         // It isn't accessible
//     }
// });

// console.log(reactDeploy.includedCommands().deploy.run(['development, production'], 'development' ),'reactDeploy')