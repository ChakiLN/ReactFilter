/** @jsx React.createElement */

var TabSet = React.createClass({
  getDefaultProps: function() {
    return {};
  },
  
  getInitialState: function() {
    return {
      selectedTab: 0
    };
  },
  
  handleTabClick: function(index) {
    this.setState({
      selectedTab: index
    });
  },
  
  render: function() {
    var items = [];
    if(this.props.children && ('length' in this.props.children)) {
      items = this.props.children.filter(function(item) {
        return item.type.displayName;
      });
    } else if (this.props.children && (this.props.children.type.displayName === 'Tab')) {
      items = [ this.props.children ];
    }
    
    return (
      <div className="tabset">
        <nav>
          <ul>
            {items.map(function(item, index) {
              var className = (this.state.selectedTab === index) ? 'active' : '';
              return <li key={'tabLink_' + index}
                className={className}
                onClick={this.handleTabClick.bind(this, index)}>
                  {item.props.title}
                </li>;
            }.bind(this))}
          </ul>
        </nav>
        {items.map(function(item, index) {
          item.props.selected = (this.state.selectedTab === index);
          item.props.key='tab_' + index;
          return React.createElement(Tab, item.props);
        }.bind(this))}
      </div>
    );
  }
});