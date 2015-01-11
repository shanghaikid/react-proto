define([
    'react/react'

], function(React) {

return React.createClass({

    displayName: 'CLIResponse',

    render: function () {

        return (
            <li className="responseItem" key={this.props.key}>{this.props.response.response}</li>
        );
    }
});

});