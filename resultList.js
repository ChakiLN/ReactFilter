/** @jsx React.createElement */

var ResultList = React.createClass({
  getDefaultProps: function() {
    return {
      list: []
    };
  },
  
  render: function() {
    return (
      <ul>
        {this.props.list.map(function(item, index) {
          return (
            <li key={'list_item_' + index}>
              Color: {item.color}<br />
              Size: {item.size}<br />
              Age: {item.age}
            </li>
          );
        })}
      </ul>
    );
  }
});