var React = require('react');

var CLIBody = React.createClass({
    displayName: 'CLIBody',

    componentDidMount: function() {
        console.log('yes, mounted');
    },

    _response: '',
    render: function () {
        var response = this._response + this.props.response;
        return (
            <div>{response}</div>
        );
    }
});

module.exports = CLIBody;