import React,{useEffect,useState} from "react";

import MealsSummary from "./MealsSummry";
import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [];

const AvailableMeals =(props) =>{
  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState();

  useEffect(() =>{
    const fetchMeals = async ()=>{
      setIsLoading(false);
      const response = await  fetch("https://food-order-app-91160-default-rtdb.firebaseio.com/meals.json") ; 
      if(!response.ok)
      {
        throw new Error("Something went wrong");
      } 
      const responseData = await response.json();
      const loadedMeals = [];
      console.log(responseData);
      for(const key in responseData)
      {
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
        });
      }
      setMeals(loadedMeals);

    }
       fetchMeals().then().catch((error=>{
        setIsLoading(false);
        setHttpError(error.message);

       }));
     
    
  },[]);
  if(httpError)
  {
    return (
      <section>
        <p className={classes.MealsError}>{httpError}</p>
      </section>
    )
  }
    
    const mealList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
    return (
        <section className={classes.meals}>
           <Card>
                <ul>
                {mealList}
            </ul>
       
           </Card>
          </section>
    )
};

export default AvailableMeals;