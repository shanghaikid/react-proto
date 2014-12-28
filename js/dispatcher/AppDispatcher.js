var fluxDispather = require('flux').Dispatcher;


var AppDispatcher = Object.create(new fluxDispather());
AppDispatcher.handleServerAction = function(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });

    console.log('action', action);
};

AppDispatcher.handleViewAction = function(action) {
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
};

module.exports = AppDispatcher;