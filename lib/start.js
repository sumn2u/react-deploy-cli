const reactDeploy = require('./react-deploy')
var ReadConfigTask = require('../lib/tasks/read-config');
var files       = require('./files');
var chalk       = require('chalk');
let filePath =  'config/deploy.js'
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


   readConfig.run().then(function(config){
    // var DeployTask = require('./lib/tasks/deploy');
    console.log('====================================');
    console.log(config, 'config');
    console.log('====================================');
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