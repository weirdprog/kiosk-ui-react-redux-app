import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCart, setItems } from './actions/cartActions'


 class Home extends Component {

  componentDidMount() {
    const url = '/products/search';
    const postBody = {
      per_page: 5
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
          this.props.setItems(result);
        }
      )
  }
    
  handleClick = (id) => {
    this.props.addToCart(id); 
  }

  render() {
    let itemList = this.props.items.map(item=>{
      return(
        <div className="card" key={item.id}>
          <div className="card-image">
            <img src={item.img} alt="Missing Image" />
            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>
          </div>

          <div className="card-content">
            <p>{item.description}</p>
            <p><b>Price: {item.price}$</b></p>
          </div>
        </div>
      )
    })

    return(
      <div className="container">
        <h3 className="center">Our items</h3>
        <div className="box">
            {itemList}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        setItems: (items)=>{dispatch(setItems(items))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)