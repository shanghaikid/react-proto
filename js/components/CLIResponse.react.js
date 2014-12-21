var React = require('react');

var CLIResponse = React.createClass({

    displayName: 'CLIResponse',

    render: function () {

        return (
            <li key={this.props.key}>{this.props.response.response}</li>
        );
    }
});

module.exports = CLIResponse;