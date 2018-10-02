import React, { Component } from 'react';

class Result extends Component {
  render() {
    return (
      <div className="card">
        <h2 className="card-header">{this.props.zip}</h2>
      </div>
    );
  }
}

class ResultBox extends Component {
  render() {
    console.log(this.props.results.length);
    if (this.props.results.length !== 0) {
      return (
        <div className="result-box">
          {this.props.results.map((zip, i) => {
            return (
              <Result zip={zip} index={i} key={i} />
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