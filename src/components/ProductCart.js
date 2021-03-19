import React, { Component } from 'react'
import { searchProducts } from '../lib/kiosk'

class ProductCart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      products: [],
      quantity: 0,
      cart: [],
    };
  }

  componentDidMount() {
    searchProducts(50)
      .then(
        (products) => {
          this.setState({
            isLoaded: true,
            products: products
          });
        });
  }

  handleQuantityChange(productId, event) {
    let newCart = [...this.state.cart];
    let existingProduct = newCart.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity = event.target.value;
    }
    else {
      newCart.push({id: productId, quantity: parseInt(event.target.value)});
    }
    this.setState({cart: newCart});
  }

  addQuantity(productId) {
    let newCart = [...this.state.cart];
    let existingProduct = newCart.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }
    else {
      newCart.push({id: productId, quantity: 1});
    }
    this.setState({cart: newCart});
  }

  subQuantity(productId) {
    let newCart = [...this.state.cart];
    let existingProduct = newCart.find(item => item.id === productId);
    if (existingProduct) {
      // remove from the cart by filtering all item ids not equal to product id
      if (existingProduct.quantity === 1) {
        newCart = newCart.find(item => item.id !== productId);  
      }
      else {
        existingProduct.quantity -= 1;
      }
    }
    this.setState({cart: newCart});
  }

  render() {
    const { error, isLoaded, products } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let itemList = products.map(product=>{
        return(
          <div className="card" key={product.id}>
            <div className="card-image">
              <img src={product.images ? product.images[0].url : ''} alt="missing" />
            </div>

            <div className="card-content">
              <p>{product.description}</p>
              <p>
                
                <input 
                  type="text" 
                  placeholder="Enter quantity" 
                  value={this.state.cart.filter(item => item.id === product.id).map(cartItem => (
                    cartItem ? cartItem.quantity : 0
                  ))}
                  onChange={(e) => this.handleQuantityChange(product.id, e)} />
                <a className="btn-floating btn-small waves-effect waves-light blue" onClick={() => this.addQuantity(product.id)}>
                  <i className="material-icons">add</i>
                </a>
                &nbsp;
                <a className="btn-floating btn-small waves-effect waves-light blue" onClick={() => this.subQuantity(product.id)}>
                  <i className="material-icons">remove</i>
                </a>
              </p>
            </div>
          </div>
        )
      })
      return (
        <div className="container">
          <h3 className="center">All Products</h3>
          <div className="box">
            {itemList}
          </div>
        </div>
      );
    }
  }
}

export default ProductCart;