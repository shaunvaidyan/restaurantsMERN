import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant.js";
import { Link } from "react-router-dom";

const AddReview = props => {
  let initialReviewState = ""
  let editing = false; // keeps track of whether this is new or editing review -- default is adding review

  if (props.location.state && props.location.state.currentReview){
    editing = true;
    initialReviewState = props.location.state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState);
}


export default AddReview;