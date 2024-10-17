import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp.js";
import Error from "./UI/Error.jsx";

const config = {};
export default function Meals(){
  // const [loadedMeals, setLoadedMeals] = useState([])
  const {data: loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', config, [])
  
  if(isLoading){
    return <p className="center">Fetching Data....</p>
  }

  if(error){
    return <Error title='Failed to fetch meals' message={error} />
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal}></MealItem>
      ))}
    </ul>
  )
}
