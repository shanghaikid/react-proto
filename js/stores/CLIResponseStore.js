// http://nodejs.org/api/events.html#events_class_events_eventemitter
var AppDispatcher = require('./../dispatcher/AppDispatcher');
    EventEmitter = require('events').EventEmitter,
    _responses = {};

// add history
function create(action, waitingMessage) {
    // Using the current timestamp + random number in place of a real id.
    var id = action.id || (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
        response = waitingMessage || action.cli;

    _responses[id] = {
        id: id,
        response: response,
        complete: !!action.cli
    };

}

// cancel response
function cancel(action) {
    console.log(action.id);
    if (_responses[action.id] && !_responses[action.id].complete) {
        destroy(action.id);
    }
}

// delete history
function destroy(id) {
    delete _responses[id];
}

// create store object
var CLIResponseStore = Object.create(EventEmitter.prototype);

CLIResponseStore.emitChange = function() {
    this.emit('change');
};

CLIResponseStore.addChangeListener = function(callback) {
    this.on('change', callback);
};

CLIResponseStore.removeChangeListener = function(callback) {
    this.removeListener('change', callback);
};

CLIResponseStore.getAll = function() {
    return _responses;
};

// register dispatcher 
AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case 'sendCLI':
            create(action);
            CLIResponseStore.emitChange();
            break;

        case 'waitingResponse':
            create(action, 'Please wait...');
            CLIResponseStore.emitChange();
            break;

        case 'cancelAction':
            cancel(action);
            CLIResponseStore.emitChange();
            break;

        default:
            return true;

    }
    // needed by promise
    return true;
});

// export
module.exports = CLIResponseStore;