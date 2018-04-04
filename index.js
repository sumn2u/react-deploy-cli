#!/usr/bin/env node

"use strict";

var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
// var GitHubApi   = require('github');
var _           = require('lodash');
// var git         = require('simple-git')();
var touch       = require('touch');
var fs          = require('fs');
var commands    = require('./lib/commands');
// var start       = require('./lib/commands/init.js')
var path = require('path');
var exec = require('child_process').exec;
var files       = require('./lib/files');
const program = require('commander'),
pkg = require('./package.json');
let log = console.log;
var path = require('path');
let appRoot = path.resolve(__dirname);

/**
 * list function definition
 *
 */


program
.version(pkg.version)
// .option('-C, --chdir <path>', 'change the working directory')
// .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
// .option('-T, --no-tests', 'ignore test hook')

program
.command('setup')
.description('run deployment configuration file')
.action(function(cmd) {
  // let parameterizedCommand = 'npm run ' + cmd
  setupAct(cmd)
});

program
.command('deploy [env]')
.description('deploy code to s3 bucket with specific environment')
.action(function(cmd) {
  let args = process.argv.slice(2)
    if(args.indexOf('deploy') !== -1) {
      // let args = process.argv.slice(2)
      // console.log('exec "%s"', argsl, cmd);
      // var exec = require('child_process').execSync;
      log()
      console.log(
         chalk.yellow('Checking configuration file' )
      )
      log()
      let output = (error, stdout, stderr) => {
        if (error) console.log(chalk.red.bold.underline("exec error:") + error);
        if (stdout) console.log(chalk.green.bold.underline("Result:") + stdout);
        if (stderr) console.log(chalk.red("Error: ") + stderr);
      };
      var scriptPath =  path.join(appRoot, 'lib/deploy.js');
      var setupCommand  = 'node ' + scriptPath + ' ' + cmd
      exec(setupCommand,output);
      // let parameterizedCommand = 'npm run deploy ' + cmd;
      // exec(parameterizedCommand,output);
    }
});



program
.command('list [env]')
.description('list deployed version from s3')
.action(function(cmd) {
  let args = process.argv.slice(2)
  if(args.indexOf('list') !== -1) {
    // let args = process.argv.slice(2)
    // console.log('exec "%s"', args, cmd);
    // var exec = require('child_process').execSync;
    log()
    console.log(
       chalk.yellow('Checking configuration file' )
    )
    log()
    let output = (error, stdout, stderr) => {
      if (error) console.log(chalk.red.bold.underline("exec error:") + error);
      if (stdout) console.log(chalk.green.bold.underline("Result:") + stdout);
      if (stderr) console.log(chalk.red("Error: ") + stderr);
    };
    var scriptPath = path.join(appRoot, 'lib/revisions.js');
    var setupCommand  = 'node ' + scriptPath + ' ' + cmd
    exec(setupCommand,output);exec(setupCommand,output);
    // let parameterizedCommand = 'npm run list ' + cmd;
    // exec(parameterizedCommand,output);
  }
});


program
.command('activate <key> [env]')
.description('activate version with or specific environment')
.action(function(cmd, opt) {
  // console.log('exec "%s"', cmd, opt);
  // var exec = require('child_process').execSync;
  let args = process.argv.slice(2)
  if(args.indexOf('activate') !== -1) {
      log()
      console.log(
        chalk.yellow('Checking configuration file' )
      )
      log()
      let output = (error, stdout, stderr) => {
        if (error) console.log(chalk.red.bold.underline("exec error:") + error);
        if (stdout) console.log(chalk.green.bold.underline("Result:") + stdout);
        if (stderr) console.log(chalk.red("Error: ") + stderr);
    };
     
    var scriptPath = path.join(appRoot, 'lib/activate.js');
    var setupCommand  = 'node ' + scriptPath + ' ' +cmd + ' ' + opt
    exec(setupCommand,output);exec(setupCommand,output);
    // let parameterizedCommand = 'npm run activate ' + cmd + ' ' + opt;
    // exec(parameterizedCommand,output);
  }
});

let setupAct = (cmd)  => {
  //  console.log(options, 'options');
  //  console.log(chalk.red(directory+"xf"));
  let args = process.argv.slice(2)
  if(args.indexOf('setup') !== -1) {
    clear();
    console.log(
      chalk.yellow(
        figlet.textSync('react-deploy', { horizontalLayout: 'full' })
      )
    )
    

    let output = (error, stdout, stderr) => {
        if (error) console.log(chalk.red.bold.underline("exec error:") + error);
        if (stdout) console.log(chalk.green.bold.underline("Result:") + stdout);
        if (stderr) console.log(chalk.red("Error: ") + stderr);
    };
   
    //  let parameterizedCommand = 'node' + start;
    var setupCommand = path.join(appRoot, '/lib/commands/init.js');
    exec(setupCommand,output);
  }



};

// program
// .command('teardown <dir> [otherDirs...]')
// .description('run teardown commands')
// .action(function(dir, otherDirs) {
//   console.log('dir "%s"', dir);
//   if (otherDirs) {
//     otherDirs.forEach(function (oDir) {
//       console.log('dir "%s"', oDir);
//     });
//   }
// });

// program
// .command('*')
// .description('deploy the given env')
// .action(function(env) {
//   console.log('deploying "%s"', env);
// });

program.parse(process.argv);

if (program.args.length === 0) program.help();