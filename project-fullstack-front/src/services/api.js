import axios from "axios";

export const api = axios.create({
  baseURL: "https://project-fullstack-thiagomagnani-api.onrender.com",
});
