/** @jsx React.createElement */

var Tab = React.createClass({
  getDefaultProps: function() {
    return {
      selected: true
    };
  },
  
  componentWillReceiveProps: function(newProps) {
    this.setState({
      selected: newProps.selected
    });
  },
  
  getInitialState: function() {
    return {
      selected: this.props.selected
    };
  },
  
  render: function() {
    var className= this.state.selected ? 'active' : '';
    return (
      <div className={'tab ' + className}>
        {this.props.children}
      </div>
    );
  }
});