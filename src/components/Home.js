import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'


 class Home extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

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
          this.setState({
            isLoaded: true,
            items: result.items
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
    
  handleClick = (id)=>{
      this.props.addToCart(id); 
  }

  render(){
      let itemList = this.props.items.map(item=>{
          return(
              <div className="card" key={item.id}>
                      <div className="card-image">
                          <img src={item.img} alt={item.title}/>
                          <span className="card-title">{item.title}</span>
                          <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>
                      </div>

                      <div className="card-content">
                          <p>{item.desc}</p>
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
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)