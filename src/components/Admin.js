import React, { Component } from 'react'
import { deleteProduct, searchProducts } from './lib/kiosk'

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      products: []
    };
  }

  componentDidMount() {
    searchProducts()
      .then(
        (products) => {
          this.setState({
            isLoaded: true,
            products: products
          });
        });
  }

  handleClick = (id) => {
    deleteProduct(id)
      .then(
        (status) => {
          if (status === 204) {
            const products = this.state.products.filter(p => p.id !== id)
            this.setState({products})
            console.log("Product has been deleted successfully"); 
          }
        }
      )
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
              <img src={product.images ? product.images[0].url : ''} alt="Missing Image" />
              <span to="/" className="btn-floating halfway-fab waves-effect waves-light blue" onClick={()=>{this.handleClick(product.id)}}><i className="material-icons">remove</i></span>
            </div>

            <div className="card-content">
              <p>{product.description}</p>
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

export default Admin;