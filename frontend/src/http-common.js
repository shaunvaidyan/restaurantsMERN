import axios from "axios";

export default axios.create({
    baseURL: "https://nycgrub.vaidyan.me/api/v1/restaurants",
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true
});