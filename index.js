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
var path = require('path');
var exec = require('child_process').exec;
var files       = require('./lib/files');
const program = require('commander'),
pkg = require('./package.json');

/**
 * list function definition
 *
 */
let hydrawebAct = (directory,options)  => {
  //  console.log(options, 'options');
  //  console.log(chalk.red(directory+"xf"));
    const cmd = 'ls';
    let params = [];

    if (options.all) params.push("a");
    if (options.long) params.push("l");
    // console.log("options ==>", options, params);
    let parameterizedCommand = params.length
                                ? cmd + ' _' + params.join('')
                                : cmd ;
    if (directory) parameterizedCommand += ' ' + directory ;

    let output = (error, stdout, stderr) => {
        if (error) console.log(chalk.red.bold.underline("exec error:") + error);
        if (stdout) console.log(chalk.green.bold.underline("Result:") + stdout);
        if (stderr) console.log(chalk.red("Error: ") + stderr);
    };
    // console.log(parameterizedCommand,'parameterizedCommand');
    // let parameterizedCommandNormalize = parameterizedCommand.split('-').join('_')
    // console.log(parameterizedCommandNormalize,'parameterizedCommand');
    exec(parameterizedCommand,output);

};

// create html bolierplate
var argv = require('minimist')(process.argv.slice(2))

program
    .version(pkg.version)
    .command('init','initialize configuration file for react-deploy')
    .command('deploy', 'start to deploy dist folder to s3 bucket')
    .command('deploy environment', 'deploy using different environments')
    .command('revisions', 'display deployed revisions')
    .command('revisions [environment]', 'display deployed revisions on based of environment')
    .command('activate', 'activate current file')
    .command('activate [environment]', 'activate file on based of environment')
    .command('list [directory]')
    .option('-a, --all', 'List all')
    .option('-l, --long','Long list format')
    .action(hydrawebAct);


program.parse(process.argv);


// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();

clear();
console.log(
  chalk.yellow(
    figlet.textSync('react-deploy', { horizontalLayout: 'full' })
  )
)
