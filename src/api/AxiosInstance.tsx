import axios from "axios";

const Api = axios.create({
    baseURL: "http://10.0.2.2:8080"
});

export default Api;