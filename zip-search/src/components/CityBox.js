import React, { Component } from 'react';

class City extends Component {
  render() {
    return(
      <div className="city">
        <h2>{this.props.title}</h2>
        <ul>
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
    if (this.props.cities.length !== 0) {
      return(
        <div>
          {this.props.cities.map((city, i) => {
            return(
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
      return(
        <div>
          No results
        </div>
      );
    }
  }
}


export default CityBox;