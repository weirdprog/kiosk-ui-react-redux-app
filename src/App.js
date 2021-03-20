import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cart from './components/Cart'
import ProductCart from './components/ProductCart'
import AdminProducts from './components/admin/Products'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Home }/>
            <Route path="/cart" component={Cart} />
            <Route path="/products" component={ProductCart} />
            <Route path="/admin" component={AdminProducts} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
