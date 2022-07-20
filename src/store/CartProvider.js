import CartContext from './cart-context';
import { useReducer } from 'react';
const defaultCartState = {
    items:[],
    totalAmount:0
};
const cartReducer =(state,action) =>
{
    if(action.type === 'ADD_ITEM')
    {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.amount*action.item.price;
        return ({items:updatedItems,totalAmount:updatedTotalAmount});
    }
    if(action.type==='CLEAR')
    {
        return defaultCartState;
    }
    return defaultCartState; 
}  

const CartProvider = props => {
   const [cartState,dispatchCartAction] =  useReducer(cartReducer,defaultCartState);
    const addItemToCartHandler = (item) =>{
           dispatchCartAction({ type:'ADD_ITEM',item:item});
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type:'REMOVE' ,id:id});
    };
    const clearCartHandler =()=>{
        dispatchCartAction({type:'CLEAR'});
    }
    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem:removeItemFromCartHandler,
        clearCart:clearCartHandler
    };
    return (

        <CartContext.Provider value = {cartContext}>
            {props.children}
            
        </CartContext.Provider>
    )

    
}
export default CartProvider;