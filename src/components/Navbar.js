import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css';

class Navbar extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return(
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li><Link to="/admin">Products</Link></li>
          <li><a href="#!">Orders</a></li>
          <li className="divider"></li>
          <li><a href="#!">Users</a></li>
        </ul>
        <nav className="nav-wrapper blue">
          <div className="container">
            <Link to="/" className="brand-logo">Kiosk UI</Link>
            
            <ul className="right">
              <li><Link to="/">Shop</Link></li>
              <li><Link to="/cart">Redux Cart</Link></li>
              <li><Link to="/products">Product Cart</Link></li>
              <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Admin<i className="material-icons right">arrow_drop_down</i></a></li>
            </ul>
          </div>
        </nav>  
      </div>
    )
  }
}

export default Navbar;