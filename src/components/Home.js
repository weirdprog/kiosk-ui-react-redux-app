import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCart, setItems } from './actions/cartActions'
import { searchProducts } from '../lib/kiosk'


 class Home extends Component {

  componentDidMount() {
    searchProducts(5)
      .then(
        (result) => {
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
            <img src={item.img} alt="missing" />
            <span to="/" className="btn-floating halfway-fab waves-effect waves-light blue" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)