import React, { Component } from 'react';
import ZipSearchField from './components/ZipSearchField';
import CityBox from './components/CityBox';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: '',
      cityList: []
    };
  }

  getNewTarget = (newTarget) => {
    this.setState({
      target: newTarget
    }, this.getCities);
  }

  getCities = () => {
    if (this.state.target) {
      this.callApi();
    } else {
      console.log('no results');
    }
  }

  callApi = async () => {
    const url = 'http://ctp-zip-api.herokuapp.com/zip/' + this.state.target;
    await fetch(url)
      .then(res => {
        if (res.status === 404) {
          throw Error('No results');
        } else {
          return res.json();
        }
      }).then(data => {
        let cities = [];
        data.map((entry) => {
          let city = {
            'cityName': entry.LocationText,
            'state': entry.State,
            'location': '(' + entry.Lat + ',' + entry.Long + ')',
            'population': entry.EstimatedPopulation,
            'totalWages': entry.TotalWages
          }
          cities.push(city);
          return city;
        });
        console.log(cities);
        this.setState({
          cityList: cities
        });
        return (cities);
      }).catch(err => {
        this.setState({
          cityList: []
        });
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="App-body">
          <ZipSearchField changeHandler={this.getNewTarget} />
          <CityBox cities={this.state.cityList} />
        </div>
      </div>
    );
  }
}

export default App;
