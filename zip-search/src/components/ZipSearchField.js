import React, { Component } from 'react';

class ZipSearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: ''
    };
  }

  updateTarget = () => {
    let newTarget = document.getElementById('target-zip').value;
    this.props.changeHandler(newTarget);
  }

  render() {
    return (
      <div className="zip-search-field">
        <b>Zip Code: </b>
        <input type="text" id="target-zip" placeholder="Try 10016" onChange={this.updateTarget} />
      </div>
    );
  }
}

export default ZipSearchField;