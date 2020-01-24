/** @jsx React.createElement */

var FilterSetCheckbox = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    filters: React.PropTypes.array.isRequired,
    defaultAllSelected: React.PropTypes.bool,
    eventName: React.PropTypes.string,
    label1: React.PropTypes.string,
    label2: React.PropTypes.string

  },

  getDefaultProps: function() {
    return {
      name: 'filterSet',
      eventName: 'filterSet',
      defaultAllSelected: false,
      label1: 'Select All',
      label2: 'Unselect All'
    };
  },

  getInitialState: function() {
    return {
      filters: this.initFilters(this.props.defaultAllSelected)
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
      filters: this.initFilters(false),
    });
  },

  initFilters: function(value) {
    return this.props.filters.map(function(item) {
      item.isChecked = value;
      return item;
    });
  },

  handleChange: function(index) {
    var filters = this.state.filters;
    filters[index].isChecked = !filters[index].isChecked;

    this.setState({
      filters: filters
    });

    this.dispatchChange();
  },

  handleSelectAll: function(value) {
    var filters = this.initFilters(value);

    this.setState({
      filters: filters
    });

    this.dispatchChange();
  },

  dispatchChange: function() {
    var filters = this.state.filters.filter(function(item) {
      return item.isChecked;
    });
    Dispatcher.dispatch(this.props.eventName + ':change', this.props.name, filters);
  },

  render: function() {
    var items = [];
    var selectedItems = 0;

    this.state.filters.map(function(item, index) {
      if (item.isChecked) {
        selectedItems++;
      }

      var key = this.props.name + '-' + index;
      items.push(
        <li key={key}>
          <input type="checkbox"
            id={key}
            checked={item.isChecked}
            onChange={this.handleChange.bind(this, index)} />
          <label htmlFor={key}>{item.label}</label>
        </li>
      );
    }.bind(this));

    var currentState = 'some';
    if (selectedItems <= 0) {
      currentState = 'none';
    } else if (selectedItems >= this.props.filters.length) {
      currentState = 'all';
    }

    var label1ClassName = (currentState === 'all') ? 'active' : '';
    var label1 = <span className={'button ' + label1ClassName} onClick={this.handleSelectAll.bind(this, true)}>{this.props.label1}</span>;
    var label2ClassName = (currentState === 'none') ? 'active' : '';
    var label2 = <span className={'button ' + label2ClassName} onClick={this.handleSelectAll.bind(this, false)}>{this.props.label2}</span>;

    return (
      <ul className="filterset">
        <li>
          <label className="select-all">
            <span className="state">{currentState}</span>
            {label1} {label2}
          </label>
        </li>
        {items}
      </ul>
    );
  }
});