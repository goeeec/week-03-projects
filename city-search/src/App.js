import React, { Component } from 'react';
import SearchField from './components/SearchField';
import ResultBox from './components/ResultBox';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: '',
      search_str: '',
      zipcodes: [],
      states: [],
      details: []
    };
  }

  getNewTarget = (newTarget) => {
    let new_search_str = ''
    for (let i = 0; i < newTarget.length; i++) {
      if (newTarget.charAt(i) === ' ') {
        new_search_str += '%20';
      } else {
        new_search_str += newTarget.toUpperCase().charAt(i);
      }
    }
    this.setState({
      target: newTarget.toUpperCase(),
      search_str: new_search_str,
      zipcodes: [],
      states: [],
      details: []
    }, this.getCities);
    console.log('search_str:' + new_search_str);
    console.log('target:' + newTarget.toUpperCase());
  }

  getCities = () => {
    if (this.state.target.length > 0) {
      this.getZips();
    } else {
      console.log('Error: empty string');
    }
  }

  getZips = async () => {
    const url = 'http://ctp-zip-api.herokuapp.com/city/' + this.state.target;
    await fetch(url)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw Error('No results');
        }
      }).then(data => {
        console.log(data);
        this.setState({
          zipcodes: data
        });
        return data
      }).then(data => {
        data.forEach(this.getCityDetails);
      }).catch(err => {
        console.log(err);
      });
  }

  getCityDetails = async (zipcode) => {
    const url = 'http://ctp-zip-api.herokuapp.com/zip/' + zipcode;
    await fetch(url)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw Error('No results');
        }
      }).then(data => {
        let result = data.filter(entry => (entry.City === this.state.target && entry.ZipCodeType === "STANDARD"))[0];
        if (!this.state.states.includes(result.State)) {
          this.setState({
            states: [...this.state.states, result.State]
          });
        }
        let city_detail = {
          "state": result.State,
          "zipcode": result.Zipcode,
          "city_name": result.LocationText,
          "location": '(' + result.Lat + ',' + result.Long + ')',
          "population": result.EstimatedPopulation ? result.EstimatedPopulation : "No data",
          "total_wages": result.TotalWages ? result.TotalWages : "No data"
        };
        this.setState({
          details: [...this.state.details, city_detail]
        });
        console.log(city_detail);
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className="App-body">
          <SearchField changeHandler={this.getNewTarget} />
          <ResultBox results={this.state.details} states={this.state.states} />
        </div>
      </div>
    );
  }
}

export default App;
