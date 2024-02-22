import axios from "axios";

export const api = axios.create({
  baseURL: window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://project-fullstack-thiagomagnani-api.onrender.com'
});
