import React, { useEffect, useState } from 'react';
import RestaurantDataService from '../services/restaurant';
import { Link, useParams } from 'react-router-dom';

export default function Restaurant({user}) {

  const initialRestaurantState={
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  }
  let {id}=useParams();
  const [restaurant,setRestaurant]=useState(initialRestaurantState);

  useEffect(()=>{
    console.log(id);
    getRestaurant(id);
  },[id]);

  const getRestaurant=(id)=>{
    RestaurantDataService.get(id)
      .then(res=>{
        setRestaurant(res.data);
        console.log(res.data)
      })
      .catch(e=>{
        console.log(e)
      });
  };

  const deleteReview = (reviewId, index) => {
    
    RestaurantDataService.deleteReview(reviewId,user.id)
      .then(response => {
        setRestaurant((prevState) => {
          console.log('Deel')
          console.log(prevState)
          console.log(index)
          //prevState.reviews.splice(index, 1);
          let reviewsCopy=prevState.reviews.slice(0);
          reviewsCopy.splice(index,1)
          console.log(reviewsCopy)
          return({
            ...prevState,
            reviews: reviewsCopy
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div>
      {
        restaurant ? (
          <div>
            <h5>{restaurant.name}</h5>
            <p>
              <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
              <strong>Addres: </strong>{restaurant.building} {restaurant.address.street} {restaurant.address.zipcode}
            </p>
            <Link to={`/restaurants/${id}/review`} className="btn btn-primary">
              Add Review
            </Link>
            <h4>Reviews</h4>
            <div className='row'>
              {restaurant.reviews.length>0 ? (
                restaurant.reviews.map((review,index)=>{
                  return (
                    <div className='col-lg-4 pb-1' key={index}>
                      <div className='card'>
                        <div className='card-body'>
                          <p className='card-text'>
                            {review.text}<br/>
                            <strong>User: </strong>{review.name}<br/>
                            <strong>Date: </strong>{review.date}
                          </p>
                          {user && (user.id === review.user_id) &&
                            <div className='row'>
                              <button onClick={()=>{deleteReview(review._id,index)}} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                Delete
                              </button>
                              <Link to={`/restaurants/${id}/review`}
                                state={
                                  {currentReview:review,}
                                }
                               className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  );
                })
              ):(
                <div className="col-sm-4">
                  <p>No reviews yet.</p>
                </div>
              )}
            </div>
          </div>
        ):(
          <div>
            <br/>
            <p>No restaurant selected.</p>
          </div>
        )
      }

    </div>
  )
}
