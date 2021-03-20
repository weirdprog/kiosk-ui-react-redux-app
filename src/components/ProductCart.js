import React, { Component } from 'react'
import { searchProducts } from '../lib/kiosk'
import ColorPicker from './ColorPicker'
import SizePicker from './SizePicker'

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
          <div className="card">
            <div className="card-image">
              <img src={product.images ? product.images[0].url : ''} alt="missing" height="100px" />
            </div>

            <div className="card-content">

              <p>{product.description}</p>

              <ColorPicker />
              <SizePicker />

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
          <div className="row">
            <div className="col s9">
              <div className="card-panel grey darken-2 white-text">Fan Wear</div>
              <div className="card-panel grey lighten-2">Stafford Soccer Fan Wear Items</div>
              <div className="box">
                {itemList}
              </div>
            </div>
            <div className="col s3">
              <div className="card">
                <div className="card-content">
                  <span className="card-title grey">Order Summary</span>
                  <div className="row">
                    <div className="col s9">Registration</div>
                    <div className="col s3">$85.00</div>
                  </div>
                  <div className="row">
                    <div className="col s9">Fan Wear Items</div>
                    <div className="col s3">$0.00</div>
                  </div>
                  <div className="row">
                    <div className="col s9">Cart Subtotal</div>
                    <div className="col s3">$85.00</div>
                  </div>
                </div>
                <div class="card-action">
                  <a class="waves-effect waves-light btn blue">View Cart</a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      );
    }
  }
}

export default ProductCart;