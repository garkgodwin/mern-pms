import axios from "axios";
const baseUrl = "http://localhost:5000/api/v1";

export default axios.create({
  baseURL: baseUrl,
});
