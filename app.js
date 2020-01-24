/** @jsx React.createElement */

var App = React.createClass({
  getDefaultProps: function() {
  },
  filters: [[{
      label: 'blue',
      criteria: {
        value: 'blue'
      }
    }, {
      label: 'Red',
      criteria: {
        value: 'red'
      }
    }, {
      label: 'Green',
      criteria: {
        value: 'green'
      }
    }, {
      label: 'Purple',
      criteria: {
        value: 'purple'
      }
    }],

    [{
      label: 'S',
      criteria: {
        value: 's'
      }
    }, {
      label: 'M',
      criteria: {
        value: 'm'
      }
    }, {
      label: 'L',
      criteria: {
        value: 'l'
      }
    }, {
      label: 'XL',
      criteria: {
        value: 'xl'
      }
    }],

    [{
      label: 'All',
      criteria: {
        value: '-1',
        comparator: 'greaterThan'
      }
    }, {
      label: '>10',
      criteria: {
        value: '10',
        comparator: 'greaterThan'
      }
    }, {
      label: '>50',
      criteria: {
        value: '50',
        comparator: 'greaterThan'
      }
    }, {
      label: '<50',
      criteria: {
        value: '50',
        comparator: 'lessThan'
      }
    }, {
      label: '<25',
      criteria: {
        value: '25',
        comparator: 'lessThan'
      }
    }]],

  results: [{
    color: 'red',
    size: 'm',
    age: 10
  }, {
    color: 'blue',
    size: 's',
    age: 18
  }, {
    color: 'green',
    size: 'l',
    age: 40
  }, {
    color: 'yellow',
    size: 'xl',
    age: 23
  }, {
    color: 'purple',
    size: 's',
    age: 64
  }],

  getInitialState: function() {
    return {
      filterCriteria: {},
      results: this.results
    };
  },

  componentDidMount: function () {
    Dispatcher.register('filter1:change', this.handleFilterChange);
    Dispatcher.register('filter2:change', this.handleFilterChange);
    Dispatcher.register('filter3:change', this.handleFilterChange);
  },

  componentWillUnmount: function() {
    Dispatcher.unregister('filter1:change', this.handleFilterChange);
    Dispatcher.unregister('filter2:change', this.handleFilterChange);
    Dispatcher.unregister('filter3:change', this.handleFilterChange);
  },

  handleFilterChange: function(filterKey, filters) {
    var filterCriteria = this.state.filterCriteria;
    filterCriteria[filterKey] = filters;

    // Filter results, AND comparator per filter set, OR comparator for filter item
    var filteredResults = this.results.filter(function(item, index) {
      var drop = true;
      for (var key in item) {
        if (filterCriteria.hasOwnProperty(key) && filterCriteria[key].length > 0) {
          var keep = false;
          for (var i in filterCriteria[key]) {
            switch (filterCriteria[key][i].criteria.comparator) {
              case 'greaterThan':
                keep = keep || item[key] > parseInt(filterCriteria[key][i].criteria.value);
                break;
              case 'lessThan':
                keep = keep || item[key] < parseInt(filterCriteria[key][i].criteria.value);
                break;
              default:
                keep = keep || item[key] === filterCriteria[key][i].criteria.value;
                break;
            }
          }
          drop = drop && keep;
        }
      }
      return drop;
    });

    this.setState({
      filterCriteria: filterCriteria,
      results: filteredResults
    });
  },
  
  handleReset: function() {
    
    Dispatcher.dispatch('filter1:reset');
    Dispatcher.dispatch('filter2:reset');
    Dispatcher.dispatch('filter3:reset');
    
    this.setState({
      filterCriteria: [],
      results: this.results
    });
  },

  render: function() {
    return (
      <div>
        <div className="filters">
          <TabSet>
            <Tab title="Tab 1">
              <h2>Tab 1</h2>
              <h3>Filter by color</h3>
              <FilterSetCheckbox title="Filter set 1"
                name="color"
                eventName="filter1"
                filters={this.filters[0]} />
              <h3>Filter by size</h3>
              <FilterSetCheckbox title="Filter set 2"
                name="size"
                eventName="filter2"
                filters={this.filters[1]} />
            </Tab>
            <Tab title="Tab 2">
              <h2>Tab 2</h2>
              <h3>Filter by age</h3>
              <FilterSetRadio title="Filter set 3"
                eventName="filter3"
                name="age"
                filters={this.filters[2]}
                defaultChecked="All" />
            </Tab>
          </TabSet>
        </div>
        <div className="results">
          <button type="button" onClick={this.handleReset}>Reset all filter</button>
          <ResultList list={this.state.results} />
        </div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('main'));