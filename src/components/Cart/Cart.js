import React from "react";
import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import { useContext ,useState} from "react";
import Checkout from "./Checkout";
import CartContext from '../../store/cart-context';

const Cart = (props) =>{
    const cartCtx = useContext(CartContext);
   const [isCheckout,setIsCheckout] = useState(false);
   const [isSubmitting,setIsSubmitting] = useState(false);
   const [didSubmit,setDidSubmit] = useState(false);


    const orderHandler = (event) =>{
        event.preventDefault();
        console.log(isCheckout);
          setIsCheckout(true);
          console.log(isCheckout);
    };
    const submitOrderHandler = async (userData)=>
    {
        setIsSubmitting(true);

         const response = await fetch('https://food-order-app-91160-default-rtdb.firebaseio.com/orders.json',{
             method:"POST",
             body:JSON.stringify({
                 user:userData,
                 orderedItems:cartCtx.items
             })
         });
         setIsSubmitting(false);
         setDidSubmit(true);
         cartCtx.clearCart();
         
    }
    
    
    const totalAmount = cartCtx.totalAmount.toFixed(2);
    const orderIsShown = cartCtx.items.length >0; 
   const cartItems =( <ul className={classes['cart-items']}>{cartCtx.items.map((item) =><li>{item.name}</li>)}   
    </ul> 
   );
    const modalAction = (<div className={classes.actions}>
        <button className={classes['button--alt']} onClick= {props.onClose}>Close</button>
    {orderIsShown && <  button className={classes.button} type="submit" onClick={orderHandler}>Order</button>}
    </div>);

    const cartModalContent = (<React.Fragment>
        {cartItems}
     <div className={classes.total}>
         <span>Total Amount</span>
         <span> {totalAmount}</span>
     </div>
     {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel = {props.onClose} />}
     {!isCheckout && modalAction}
    </React.Fragment>);

    const isSubmittingModalContent = <p>Placing Your Order</p>;
    const didSubmitModalContent = <React.Fragment>
        <p>Successfully Placed your order</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose} >Close</button>

        </div>
    </React.Fragment>

    return <Modal onClose = {props.onClose}>
     {!isSubmitting && !didSubmit &&  cartModalContent}
     {isSubmitting && isSubmittingModalContent}
     {didSubmit && didSubmitModalContent}
    </Modal>
}
export default Cart;