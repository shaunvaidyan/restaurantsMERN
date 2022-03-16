import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant.js";
import { Link } from "react-router-dom";



const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState(""); // items ppl will search
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {  // this is how to tell react that component needs to do something after rendering
    retrieveRestaurants();
    retrieveCuisines();
  })

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  
  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default RestaurantsList;