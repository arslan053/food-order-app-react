import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

const config = {};
export default function Meals(){
  // const [loadedMeals, setLoadedMeals] = useState([])
  const {data: loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', config, [])
  
  if(isLoading){
    return <p>Fetching Data....</p>
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal}></MealItem>
      ))}
    </ul>
  )
}
