import React, { Component } from 'react'
// import M from 'materialize-css/dist/js/materialize.min.js'
import M from 'materialize-css';

class ColorPicker extends Component {

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
          <option value="" disabled>Color</option>
          <option value="1">Black</option>
          <option value="2">White</option>
          <option value="3">Gray</option>
        </select>     
      </div>
    );
  }
}

export default ColorPicker;

