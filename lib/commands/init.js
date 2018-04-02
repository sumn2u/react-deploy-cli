#!/usr/bin/env node

"use strict";

var chalk       = require('chalk');
// var clear       = require('clear');
var CLI         = require('clui');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
var fs          = require('fs');
var path = require('path');
var files       = require('./../files');
const log = console.log;

if (files.fileExists('config/deploy.js')) {
  log();
  log(chalk.red('❌  ') + chalk.red('Deployment file already exits. Please remove it or use the old file.'));
  log();
  log(chalk.green('➡ ') + chalk.yellow(' Type help command to proceed further'))
  log()
  process.exit();
}
//copy file   path: path.join(__dirname, 'dist'),
var fileCreatingSpinner = new Spinner('Creating deployment file, please wait...');
fileCreatingSpinner.start();
fs.copyFileSync(path.join(__dirname, './../../blueprints/react-deploy/files/config/deploy.js'), path.join(__dirname,'./../../config/deploy.js'));
log();
log(chalk.green('✓ ') + chalk.green('Deployment file created'));
log()
log(chalk.green('➡ ') + chalk.yellow(' Type help command to proceed further'))
log()
fileCreatingSpinner.stop();