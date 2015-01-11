define([
    'react/react',
    'cli/CLIResponseStore',
    'react/jsx!cli/CLIBody.js',
    'react/jsx!cli/CLIInput.js'

], function(React, CLIResponseStore, CLIBody, CLIInput) {

function getCLIstate() {
    return {
        responses: CLIResponseStore.getAll()
    };
}

return  React.createClass({
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

});