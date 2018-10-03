import React, { Component } from 'react';
import { Card, Collapsible, CollapsibleItem } from 'react-materialize';


class Result extends Component {
  render_collapsible = (city) => {
    return (
      <CollapsibleItem header={city.zipcode}>
        <ul>
          <li>City name: {city.city_name}</li>
          <li>Location: {city.location}</li>
          <li>Population (Estimated): {city.population}</li>
          <li>Total wages: {city.total_wages}</li>
        </ul>
      </CollapsibleItem>
    )
  };

  render() {
    return (
      <Card title={this.props.state_name}>
        <Collapsible accordion>
          {this.props.cities.map(this.render_collapsible)}
        </Collapsible>
      </Card>
    );
  }
}

class ResultBox extends Component {
  render() {
    console.log(this.props.results.length);
    if (this.props.results.length !== 0) {
      return (
        <div className="result-box">
          {this.props.states.map((state, i) => {
            let cities = this.props.results.filter(entry => entry.state === state);
            console.log('Now processing state: ' + state);
            console.log('Passing these cities...');
            console.log(cities);
            return (
              <Result state_name={state} cities={cities} index={i} key={i} />
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


export default ResultBox;