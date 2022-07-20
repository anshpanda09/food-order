import React from "react";
import MealsSummary  from "./MealsSummry";
import AvailableMeals from "./AvailableMeals";


const Meals =(props) =>{
    return (
        <React.Fragment>
        <MealsSummary></MealsSummary>
        <AvailableMeals />
        </React.Fragment>
    )
}
export default Meals;