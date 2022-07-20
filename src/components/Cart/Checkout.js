import React,{useRef,useState} from "react";

const isEmpty = (value)=> value.trim()==="";
const isFiveChars = (value) => value.trim().length==6;

const Checkout=(props) =>{
    const [formInputValidity,setFormInputValidity] = useState({
        name:false,
        street:false,
        city:false,
        postalCode:false
    });
    const nameInputRef = useRef("");
    const streetInputRef = useRef("");
    const postalInputRef = useRef("");
    const cityInputRef = useRef("");

    const confirmHandler = (event)=>
    {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsvalid = isFiveChars(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);
        
        setFormInputValidity({
            name:enteredCityIsValid,
            street:enteredStreetIsValid,
            city:enteredCityIsValid,
            postalCode:enteredPostalIsvalid
        });

        const formIsValid = enteredPostalIsvalid && enteredStreetIsValid && enteredNameIsValid && enteredCityIsValid;
        if(!formIsValid)
        {
            return;
        }
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            postalCode:enteredPostal,
            city:enteredCity
        });
          

    }
    return (
        <form onSubmit={confirmHandler}>
            <div>
            <label htmlFor="name" >Your Name</label>
            <input ref={nameInputRef} type="text" id="name"></input>
            {!formInputValidity.name && <p> Enter a valid name</p>}
        </div>

        <div>
            <label htmlFor="street" >Your Address</label>
            <input type="text" ref={streetInputRef} id="street"></input>
            {!formInputValidity.street && <p> Enter a valid Address</p>}
        </div>
        <div>
            <label htmlFor="postal" >Pin Code</label>
            <input type="text" id="postal" ref={postalInputRef}></input>
            {!formInputValidity.postalCode && <p> Enter a valid pin Code</p>}
        </div>
        <div>
            <label htmlFor="city" >City</label>
            <input type="text" id="city" ref={cityInputRef}></input>
            {!formInputValidity.city && <p> Enter a valid city</p>}
        </div>
        <button type="button" onClick = {props.onCancel}>Cancel </button>
        <button type='submit'>Confirm</button>

        
         
         
         
        </form>
    )
};

export default Checkout;