import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant.js";
import { Link } from "react-router-dom";



const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState(""); // items ppl will search
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {  // react hook | this is how to tell react that component needs to do something after rendering
    retrieveCuisines();
  })
  useEffect(() => {  // pass in empty array to stop retrieveRestaurants from constantly overwriting changes
    retrieveRestaurants();
  }, [])
  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(response => {
        //console.log(response.data);
        setRestaurants(response.data.restaurants);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  
  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        //console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
    e.preventDefault();
  };

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    //console.log(searchZip);
    setSearchZip(searchZip);
    e.preventDefault();
  };

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    console.log(searchCuisine);
    setSearchCuisine(searchCuisine);
    e.preventDefault();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by) // line 13 ../services/restaurant.js
      .then(response => {
        //console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };
  // called when button is clicked //
  const findByName = () => {
    find(searchName, "name") 
  };

  const findByZip = () => {
    find(searchZip, "zipcode")
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">

          <select onChange={onChangeSearchCuisine}>
             {cuisines.map(cuisine => {
               return (
                 <option value={cuisine}> {cuisine.substr(0, 20)} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>

        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                  <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Reviews
                  </Link>
                  <a target="_blank" rel="noopener noreferrer" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default RestaurantsList;

