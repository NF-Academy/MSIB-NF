import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  // baseURL: "https://akmal-bc.karyakreasi.id/api",
});

export default API;
