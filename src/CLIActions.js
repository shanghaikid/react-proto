define([
    'cli/AppDispatcher'

], function(AppDispatcher) {

    var _pendingActions = [],
        _pendingIds = [];

    return {
      // sendCLI
      sendCLI: function(cli) {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        AppDispatcher.handleViewAction({
            actionType: 'waitingResponse',
            id: id
        });

        var _timeout;

        var promise = new Promise(function(resolve, reject) {
            _timeout = setTimeout(function() {
                resolve({
                    actionType: 'sendCLI',
                    cli: cli,
                    id: id
                });
            }, 1500);
        });

        promise.then(function(res) {
            AppDispatcher.handleServerAction(res);
        });

        _pendingActions.push(_timeout);
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


});