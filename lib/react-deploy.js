var path                = require('path');
var commands            = require('./commands');

module.exports = {
  name: 'react-deploy',

  includedCommands: function() {
    return commands;
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  postBuild: function(result) {
    var _this = this;
    if (!this.app) {
       return;
    }
    var options = this.app.options.emberCLIDeploy || {};

    var deployTarget = options.runOnPostBuild;
    if (deployTarget) {
      var ReadConfigTask = require('./lib/tasks/read-config');
      var readConfig = new ReadConfigTask({
        project: this.project,
        deployTarget: deployTarget,
        deployConfigFile: options.configFile
      });
      return readConfig.run().then(function(config){
        var DeployTask = require('./tasks/deploy');
        var deploy = new DeployTask({
          project: _this.project,
          ui: _this.ui,
          deployTarget: deployTarget,
          config: config,
          shouldActivate: options.shouldActivate,
          commandOptions: {
            buildDir: result.directory
          }
        });
        return deploy.run();
      });
    }
  }
};