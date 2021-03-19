import Item1 from '../../images/kiosk-ui/product1.png'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING,SET_ITEMS } from '../actions/action-types/cart-actions'


const initState = {
  /*
  items: [
      {id:1, title:'Mens Perfect Tri Fit Crew Tee', description:'Mens Perfect Tri Fit Crew Tee', price:10, img:Item1},
      {id:2, title:'Mens Perfect Tri Fit Crew Tee', description:'Mens Perfect Tri Fit Crew Tee', price:10, img:Item2},
      {id:3, title:'Mens Perfect Tri Fit Crew Tee', description:'Mens Perfect Tri Fit Crew Tee', price:10, img:Item3},
      {id:4, title:'Ladies Perfect Tri Fit Crew Tee', description:'Ladies Perfect Tri Fit Crew Tee', price:20, img:Item4},
  ],
  */
  items: [],
  addedItems:[],
  total: 0
}

const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
        let addedItem = state.items.find(item=> item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item= state.addedItems.find(item=> action.id === item.id)
        if(existed_item)
        {
          addedItem.quantity += 1 
            return{
              ...state,
                total: state.total + addedItem.price 
                }
      }
        else{
          addedItem.quantity = 1;
          //calculating the total
          let newTotal = state.total + addedItem.price 
          
          return{
              ...state,
              addedItems: [...state.addedItems, addedItem],
              total : newTotal
          }
          
      }
    }

    if (action.type === REMOVE_ITEM){
      let itemToRemove= state.addedItems.find(item=> action.id === item.id)
      let new_items = state.addedItems.filter(item=> action.id !== item.id)
      
      //calculating the total
      let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
      console.log(itemToRemove)
      return{
        ...state,
        addedItems: new_items,
        total: newTotal
      }
    }

    if (action.type === SET_ITEMS) {
      let new_items = [];
      console.log("Action items:\n%s", JSON.stringify(action.items));
      for (let i=0; i<action.items.length; i++) {
        new_items.push({
          id:action.items[i].id,
          title: action.items[i].description,
          description: action.items[i].description,
          price: action.items[i].physical_products[0].price,
          img: Item1
        })
      }
    
      return{
        ...state,
        items: new_items
      }
    }

    
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
      return{
          ...state,
          total: state.total + 6
      }
    }

    if(action.type=== 'SUB_SHIPPING'){
      return{
        ...state,
        total: state.total - 6
      }
    }
    
  else{
      return state
    }
    
}

export default cartReducer
