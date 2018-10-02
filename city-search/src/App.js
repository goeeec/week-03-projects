import React, { Component } from 'react';
import SearchField from './components/SearchField';
import ResultBox from './components/ResultBox';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: '',
      results: []
    };
  }

  getNewTarget = (newTarget) => {
    let search_str = ''
    for (let i = 0; i < newTarget.length; i++) {
      if (newTarget.charAt(i) === ' ') {
        search_str += '%20';
      } else {
        search_str += newTarget.toUpperCase().charAt(i);
      }
    }
    this.setState({
      target: search_str
    }, this.getCities);
    console.log(search_str);
  }

  getCities = () => {
    if (this.state.target.length > 0) {
      this.callApi();
    } else {
      console.log('Error: empty string');
    }
  }

  callApi = async () => {
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
          results: data
        });
      }).catch(err => {
        this.setState({
          results: []
        });
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
          <ResultBox results={this.state.results} />
        </div>
      </div>
    );
  }
}

export default App;
