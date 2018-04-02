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

if (files.fileExists('config/deploy.js')) {
  console.log(chalk.red('Deployment file already exits'));
  process.exit();
}
//copy file   path: path.join(__dirname, 'dist'),
var fileCreatingSpinner = new Spinner('Creating deployment file, please wait...');
fileCreatingSpinner.start();
fs.copyFileSync(path.join(__dirname, './../../blueprints/react-deploy/files/config/deploy.js'), path.join(__dirname,'./../../config/deploy.js'));
console.log(chalk.green('Deployment file already exits'));
fileCreatingSpinner.stop();