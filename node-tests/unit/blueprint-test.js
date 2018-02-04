var assert = require('../helpers/assert');

describe ('Installation Blueprint', function() {
  var subject;
  beforeEach(function() {
    subject = require('../../blueprints/react-deploy/index.js');
  });
  describe('afterInstall', function() {
    it('emits a message if no deploy plugins are installed', function() {
      var called = false;
      var context = {
        project: {
          addons: []
        },
        ui: {
          write: function(message) {
            assert(/react-deploy needs plugins to actually do the deployment work/.test(message));
            called = true;
          }
        }
      };

      subject.afterInstall.call(context);
      assert(called, 'ui.write() was called');
    });

    it('emits no message if a deploy plugin is found', function() {
      var called = false;
      var context = {
        project: {
          addons: [{
            pkg: {
              keywords: ['react-deploy-plugin']
            }
          }]
        },
        ui: {
          write: function() {
            called = true;
          }
        }
      };

      subject.afterInstall.call(context);
      assert(!called, 'ui.write() was not called');
    });
  });
});
