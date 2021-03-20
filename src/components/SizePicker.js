import React, { Component } from 'react'
// import M from 'materialize-css/dist/js/materialize.min.js'
import M from 'materialize-css';

class SizePicker extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div className="input-field col s12">
        <select ref="dropdown" defaultValue="">
          <option value="" disabled>Size</option>
          <option value="xs">XS</option>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
          <option value="xl">XL</option>
        </select>     
      </div>
    );
  }
}

export default SizePicker;

