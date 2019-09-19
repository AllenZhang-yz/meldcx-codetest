import axios from "axios";

const instance = axios.create({
  baseURL: "http://35.201.2.209:8000"
});

export default instance;
