var AppDispatcher = require('./../dispatcher/AppDispatcher');

var _pendingActions = [],
    _pendingIds = [];

var CLIActions = {
  // sendCLI
  sendCLI: function(cli) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    AppDispatcher.handleViewAction({
        actionType: 'waitingResponse',
        id: id
    });

    _pendingActions.push(setTimeout(function() {
        AppDispatcher.handleServerAction({
          actionType: 'sendCLI',
          cli: cli,
          id: id
        });
    }, 3000));

    _pendingIds.push(id);
  },

  cancelAction: function() {
    var index = _pendingActions.length - 1,
        id = _pendingIds[index];

    clearTimeout(_pendingActions[index]);

    AppDispatcher.handleServerAction({
        actionType: 'cancelAction',
        id: _pendingIds[index]
    });

    _pendingActions.splice(index, 1);
    _pendingIds.splice(index, 1);
  }

};

module.exports = CLIActions;
