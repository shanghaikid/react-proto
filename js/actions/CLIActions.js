var AppDispatcher = require('./../dispatcher/AppDispatcher');

var CLIActions = {
  // sendCLI
  sendCLI: function(cli) {
    AppDispatcher.handleServerAction({
      actionType: 'sendCLI',
      cli: cli
    });
  },

  receiveCLIResponse: function(response) {
    AppDispatcher.handleServerAction({
      type: 'receiveCLIResponse',
      rawMessage: response
    });
  }

};

module.exports = CLIActions;
