import http from "../http-common.js";

class RestaurantDataService {
    // make functions that make API calls and return info from those calls. appends to baseurl from http-common.js
    getAll(page = 0){
        return http.get(`?page=${page}`);
    }

    get(id){
        return http.get(`/id/=${id}`);
    }

    find(query, by = "name", page = 0){
        return http.get(`?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return http.post("/review-new", data);
    }

    updateReview(data) {
        return http.put("/review-edit", data);
    }

    deleteReview(id) {
        return http.delete(`/review-delete?id=${id}`);
    }

    getCuisines(id) {
        return http.get(`/cuisines`);
    }
}

export default new RestaurantDataService();