const reactDeploy = require('./react-deploy')
var ReadConfigTask = require('../lib/tasks/read-config');
var files       = require('./files');
var chalk       = require('chalk');
let filePath =  'deploy.js'
var SilentError    = require('silent-error');
const s3 = require('react-deploy')
const task = require('../lib/commands/task')
const log = console.log
let errorConfig = false


let projectDesc= {
    root:files.getCurrentDirectoryBase()
}

const command = process.argv[2]

var readConfig = new ReadConfigTask({
    project: projectDesc,
    deployTarget: command == 'development' ? 'development' : command ,
    deployConfigFile: filePath
  });



module.exports = task('upload', () => Promise.resolve()
  .then(() => {
    readConfig.run().then(function(config){
        if(!config.s3.accessKeyId) {
            errorConfig = true
            log()
            log( chalk.red('⚠  No accessKeyId found in s3 '))

        }

        if(!config.s3.secretAccessKey) {
            errorConfig = true
            log()
            log( chalk.red('⚠  No secretAccessKey found in s3 '))

        }

        if(!config.s3.region) {
            errorConfig = true
            log()
            log( chalk.red('⚠  No region found in s3 '))

        }
        if(!config.s3.Bucket) {
            errorConfig = true
            log()
            log( chalk.red('⚠  No Bucket found in s3 '))

        }

        if(!config.build.localDir) {
            errorConfig = true
            log()
            log( chalk.red('⚠  No localDir found in s3 '))

        }

        if(!config.build.s3Params.Bucket) {
            errorConfig = true
            log()
            log( chalk.red('⚠  No s3 params Bucket found in s3 '))

        }

        if(!config.build.environment) {
            errorConfig = true
            log()
            log( chalk.red('⚠  No environment found in s3 '))

        }
        if( errorConfig) {
            log()
            log( chalk.yellow('Existing deployment because of an error'))
            process.exit()
        }
        
        const Uploader = new Promise((resolve, reject) => {
        const client = s3.createClient({
        s3Options:config.s3
        })
        // const uploaderIndex = client.uploadDir({
        //     localDir: config.build.localDir + 'index.html',
        //     deleteRemoved:true,
        //     s3Params: config.build.s3Params
        // })
        const uploader = client.uploadDir({
            localDir: config.build.localDir, //dist
            deleteRemoved: config.build.deleteRemoved,
            s3Params: config.build.s3Params
        })
    
        log()
        // // display revisions
        //  client.displayRevisions()
        // uploaderIndex.on('error', reject)
        // uploaderIndex.on('end', resolve)
        // // activate the new value
        //  client.activateRevisions('index:a00a13d')
    
        uploader.on('error', reject)
        uploader.on('end', function(){
            log(' start creating revision')
            // on deploy  create a finger print
            client.createRevision()
            log()
            resolve
        })
        })
        // console.log('====================================');
        // console.log(config, 'config');
        // console.log('====================================');
        // var deploy = new DeployTask({
        //   project: _this.project,
        //   ui: _this.ui,
        //   deployTarget: deployTarget,
        //   config: config,
        //   shouldActivate: options.shouldActivate,
        //   commandOptions: {
        //     buildDir: result.directory
        //   }
        // });
        // return deploy.run();
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