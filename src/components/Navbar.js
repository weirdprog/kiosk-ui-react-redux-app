import React from 'react';
import { Link } from 'react-router-dom'
 const Navbar = ()=>{
    return(
      <nav className="nav-wrapper blue">
        <div className="container">
          <Link to="/" className="brand-logo">Kiosk UI</Link>
          
          <ul className="right">
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/cart">Redux Cart</Link></li>
            <li><Link to="/products">Product Cart</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>
      </nav>  
    )
}

export default Navbar;