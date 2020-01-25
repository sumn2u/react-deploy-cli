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

if (files.fileExists('deploy.js')) {
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
var data = fs.readFileSync(path.join(__dirname, './../../blueprints/react-deploy/files/deploy.js'), 'utf-8');

fs.writeFile('deploy.js', data, function (err) {
  if (err) return console.log(err);
});
log();
log(chalk.green('✓ ') + chalk.green('Deployment file created'));
log()
log(chalk.green('➡ ') + chalk.yellow(' Type help command to proceed further'))
log()
fileCreatingSpinner.stop();