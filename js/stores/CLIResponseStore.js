// http://nodejs.org/api/events.html#events_class_events_eventemitter
var AppDispatcher = require('./../dispatcher/AppDispatcher');
    EventEmitter = require('events').EventEmitter,
    _responses = '';

// add history
function addResponse(text) {
    _responses += text + '\n';
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
            addResponse(action.cli);
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