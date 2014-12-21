// http://nodejs.org/api/events.html#events_class_events_eventemitter
var AppDispatcher = require('./../dispatcher/AppDispatcher');
    EventEmitter = require('events').EventEmitter,
    _cliHistory = {};

// add history
function create(text) {
    // Using the current timestamp + random number in place of a real id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _cliHistory[id] = {
        id: id,
        text: text
    };
}

// delete history
function destroy(id) {
    delete _cliHistory[id];
}

// create store object
var CLIHistoryStore = Object.create(EventEmitter.prototype);

CLIHistoryStore.emitChange = function() {
    this.emit('change');
};

CLIHistoryStore.addChangeListener = function(callback) {
    this.on('change', callback);
};

CLIHistoryStore.removeChangeListener = function(callback) {
    this.removeListener('change', callback);
};

// register dispatcher 
AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case 'sendCLI':
            create(action.cli);
            CLIHistoryStore.emitChange();
            break;

        default:
            return true;

    }
    // needed by promise
    return true;
});

// export
module.exports = CLIHistoryStore;