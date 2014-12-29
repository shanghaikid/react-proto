var React = require('react'),
    CLIResponse = require('./CLIResponse.react');

var CLIBody = React.createClass({

    displayName: 'CLIBody',

    componentDidMount: function() {
        console.log('yes, mounted');
    },

    render: function () {
        if (Object.keys(this.props.responses).length < 1) {
          return <ul className="responses"><li></li></ul>;
        }

        var responses = this.props.responses,
            reponsesItem = [];

        for (var key in responses) {
          reponsesItem.push(<CLIResponse key={key} response={responses[key]} />);
        }

        return (
            <ul className="responses">{reponsesItem}</ul>
        );
    }
});

module.exports = CLIBody;