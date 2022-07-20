import React, { createRef }  from "react";
import Input from "../../UI/Input";
import classes from './MealItem.module.css';
import { useRef ,useState} from "react";

const MealItemForm = (props) =>{
    const [amountIsValid,setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    const submitHandler = (event) =>{
        event.preventDefault();

        const enteredamount = amountInputRef.current.value;
        const enteredamountNumber = Number(enteredamount);
        //console.log((enteredamountNumber));
        if(enteredamount.trim().length === 0 || enteredamountNumber <1 || enteredamountNumber>5)
        {
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredamountNumber);

    };
     return <form className={classes.form} onSubmit={submitHandler}>
         <Input 
         ref = {amountInputRef}
         label="Amount"
         input={{
             id:'amount_'+props.id,
             type:'number',
             min:'1',
             max:'5',
             step:'1',
             defaultValue:'1'
         }}
         />
         <button >+ Add</button>
         {!amountIsValid && <p>Invalid Amount (1 to 5)</p>}
     </form>
}

export default MealItemForm;