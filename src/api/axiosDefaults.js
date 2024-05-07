import axios from "axios";

axios.defaults.baseURL = "https://snaps-2a8aec1abfbd.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
