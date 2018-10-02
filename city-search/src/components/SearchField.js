import React, { Component } from 'react';

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: ''
    };
  }

  updateTarget = () => {
    let newTarget = document.getElementById('target-city').value;
    this.props.changeHandler(newTarget);
  }

  render() {
    return (
      <div className="search-field">
        <b>City name: </b>
        <input type="text" id="target-city" placeholder="Try New York" onChange={this.updateTarget} />
      </div>
    );
  }
}

export default SearchField;