define([
    'cli/AppDispatcher',
    'dojo/_base/declare',
    'dojo/Evented'

], function(AppDispatcher, declare, Evented) {

var _responses = {};

var store = declare([Evented], {

    startup: function() {
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
        this.emit('ready', {});

    },

    // add history
    create: function (action, waitingMessage) {
        // Using the current timestamp + random number in place of a real id.
        var id = action.id || (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
            response = waitingMessage || action.cli;

        _responses[id] = {
            id: id,
            response: response,
            complete: !!action.cli
        };
    },
    // cancel response
    cancel: function (action) {
        console.log(action.id);
        if (_responses[action.id] && !_responses[action.id].complete) {
            destroy(action.id);
        }
    },

    destroy: function(id) {
        delete _responses[id];
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    getAll: function() {
        return _responses;
    }
});

return (new store()).startup();
});