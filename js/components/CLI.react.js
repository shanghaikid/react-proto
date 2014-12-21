var React = require('react'),
    CLIBody = require('./CLIBody.react'),
    CLIInput = require('./CLIInput.react'),
    CLIHistoryStore = require('./../stores/CLIHistoryStore'),
    CLIResponseStore = require('./../stores/CLIResponseStore');

function getCLIstate() {
    return {
        responses: CLIResponseStore.getAll()
    }
}

var CLIApp = React.createClass({
    displayName: 'CLIApp',

    componentDidMount: function() {
        CLIResponseStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        CLIResponseStore.removeChangeListener(this._onChange);
    },

    getInitialState: function() {
        return getCLIstate();
    },

    render: function () {
        return (
            <div id="webconsole">
                <CLIBody responses={this.state.responses}></CLIBody>
                <CLIInput></CLIInput>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getCLIstate());
    }
});

module.exports = CLIApp;