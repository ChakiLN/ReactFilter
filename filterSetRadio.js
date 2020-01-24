/** @jsx React.createElement */

var FilterSetRadio = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    filters: React.PropTypes.array.isRequired,
    defaultChecked: React.PropTypes.string,
    eventName: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      name: 'filterSet',
      eventName: 'filterSet',
      defaultChecked: ''
    };
  },
  
  getInitialState: function() {
    return {
      checked: this.props.defaultChecked
    };
  },
  
  componentDidMount: function() {
    Dispatcher.register(this.props.eventName + ':reset', this.handleReset);
  },
  
  componentWillUnmount: function() {
    Dispatcher.unregister(this.props.eventName + ':reset', this.handleReset);
  },
  
  handleReset: function() {
    this.setState({
      checked: this.props.defaultChecked
    });
  },

  handleChange: function(index) {
    this.setState({
      checked: this.props.filters[index].label
    });
    Dispatcher.dispatch(this.props.eventName + ':change', this.props.name, [this.props.filters[index]]);
  },

  render: function() {
    return (
      <ul className="filterset">
        {this.props.filters.map(function(item, index) {
          var key = this.props.name + '-' + index;
          return (
            <li key={key}>
              <input type="radio"
                id={key}
                name={this.props.name}
                value={item.label}
                checked={item.label === this.state.checked}
                onChange={this.handleChange.bind(this, index)} />
              <label htmlFor={key}>{item.label}</label>
            </li>
          );
        }.bind(this))}
      </ul>
    );
  }
});