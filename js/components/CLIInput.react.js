var React = require('react'),
    CLIActions = require('./../actions/CLIActions');

var CLIInput = React.createClass({
    displayName: 'CLIInput',

    getInitialState: function() {
        return {
            value: this.props.value || ''
        };
    },

    // update input stat
    _onChange: function(e) {
        this.setState({
            value: e.target.value
        });
    },

    // handle keydown event
    _onKeyDown: function(e) {
        // you can not use console.log(e) to print e obj
        // This happens because React reuses the event objects for performance,
        // so the properties are null.
        // by the time the console looks them up. 
        // If Chrome were to copy the object immediately when it gets logged, you wouldn't encounter this "problem".
        //console.log(e.type, e.keyCode, e.which, e.timeStamp);

        if (e.keyCode === 13) {
            CLIActions.sendCLI(e.target.value);
            this._clear();
        }

        if (e.keyCode === 67 && e.ctrlKey) {
            CLIActions.sendCLI('cancel');
            this._clear();
        }

        // TODO: arrow up to show the former CLI

        // TODO: ctrl + r to search history
    },

    // clear the input box
    _clear: function() {
        this.setState({
            value: ''
        });
    },

    // render component
    render: function () {
        return (
            <div className="inputContainer">
                <input type="text" value={this.state.value} onChange={this._onChange} onKeyDown={this._onKeyDown} />
            </div>
        );
    }
});

module.exports = CLIInput;