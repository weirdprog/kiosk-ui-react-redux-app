import React, { Component } from 'react'

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
    const url = '/products/search';
    const postBody = {
      per_page: 50
    };
    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    };

    fetch(url, requestMetadata)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Product search result:\n%s", JSON.stringify(result));
          this.setState({
            isLoaded: true,
            products: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  deleteProduct = (id) => {

    console.log("Deleting product id: %s", id);

    const url = '/products/' + id;
    const requestMetadata = {
      method: 'DELETE',
    };

    fetch(url, requestMetadata)
      .then(
        (res) => {
          if (res.status === 204) {
            const products = this.state.products.filter(p => p.id !== id)
            this.setState({products})
            console.log("Product has been deleted successfully"); 
          }
        });
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
              <span to="/" className="btn-floating halfway-fab waves-effect waves-light blue" onClick={()=>{this.deleteProduct(product.id)}}><i className="material-icons">remove</i></span>
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