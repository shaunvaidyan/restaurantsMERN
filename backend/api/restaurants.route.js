import express from "express"
import RestaurantsController from "./restaurants.controller.js"
import ReviewsController from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(RestaurantsController.apiGetRestaurants) // gets list of all restaurants
router.route("/id/:id").get(RestaurantsController.apiGetRestaurantsById) // gets list of specifc restaurant w/ specific id + reviews
router.route("/cuisines").get(RestaurantsController.apiGetRestaurantsCuisines) // populates dropdown cuisine menu

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview)

export default router