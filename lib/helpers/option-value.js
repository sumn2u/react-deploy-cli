module.exports = function(commandOption, settings, optionKey, defaultValue) {
  if (commandOption !== undefined) {
    return commandOption;
  }
  if (settings && settings['react-deploy'] && settings['react-deploy'][optionKey] !== undefined) {
    return settings['react-deploy'][optionKey];
  }
  return defaultValue;
};
