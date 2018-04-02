var fs = require('fs');
var path = require('path');

module.exports = {
  getCurrentDirectoryBase : function() {
    return path.basename(process.cwd());
  },

  directoryExists : function(filePath) {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },
  fileExists : function(fileName){
    try{
      fs.statSync(fileName);
      return true;
    }catch(err){
      return false;
   }
  }

};