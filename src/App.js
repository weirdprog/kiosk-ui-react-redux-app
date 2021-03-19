import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cart from './components/Cart'
import Admin from './components/Admin'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        
        <Navbar/>
          <Switch>
            <Route exact path="/" component={Home }/>
            <Route path="/cart" component={Cart} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
