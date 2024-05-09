import axios from "axios";

// Set axios defaults
axios.defaults.baseURL = "https://snaps-2a8aec1abfbd.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// Instances for request and response handling
export const axiosReq = axios.create();
export const axiosRes = axios.create();
