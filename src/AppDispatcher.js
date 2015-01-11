define([
    './Dispatcher'

], function(fluxDispather) {

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

return AppDispatcher;

});