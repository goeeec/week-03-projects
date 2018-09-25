import React, { Component } from 'react';

class City extends Component {
  render() {
    return (
      <div className="card">
        <h2 className="card-header">{this.props.title}</h2>
        <ul className="card-body">
          <li>State: {this.props.state}</li>
          <li>Location: {this.props.location}</li>
          <li>Population (estimated): {this.props.population}</li>
          <li>Total Wages: {this.props.wages}</li>
        </ul>
      </div>
    );
  }
}

class CityBox extends Component {
  render() {
    console.log(this.props.cities.length);
    if (this.props.cities.length !== 0) {
      return (
        <div className="city-box">
          {this.props.cities.map((city, i) => {
            return (
              <City
                title={city.cityName}
                state={city.state}
                location={city.location}
                population={city.population}
                wages={city.totalWages}
                index={i}
                key={i}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          No results
        </div>
      );
    }
  }
}


export default CityBox;