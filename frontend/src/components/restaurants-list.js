import React, {useState,useEffect} from 'react';
import RestaurantDataService from '../services/restaurant.js';
import { Link } from 'react-router-dom';

const RestaurantsList=(props)=> {
  const [restaurants,setRestaurants]=useState([]);
  const [searchName,setSearchName]=useState("");
  const [searchZip,setSearchZip]=useState("");
  const [searchCuisine, setSearchCuisine]=useState("");
  const [cuisines,setCuisines]=useState(["All Cuisines"]);

  useEffect(()=>{
    retrieveRestaurants();
    retrieveCuisines();
  },[]);

  const retrieveRestaurants=()=>{
    RestaurantDataService.getAll()
      .then(response=>{
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e=>console.log(e));
  };

  const retrieveCuisines=()=>{
    RestaurantDataService.getCuisines()
      .then(response=>{
        console.log(response.data);
        setCuisines(['All Cuisines'].concat(response.data));
      }).catch(e=>console.log(e));
  }

  return (
    <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1" key={restaurant.restaurant_id}>
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
                  <a rel="noreferrer" target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>
  )
}

export default RestaurantsList;
