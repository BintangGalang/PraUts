import axios from "axios";

const token = "1|tGnLRuXbuoIJEiwueSizA95YT1xtkKO07Oy7E6RK831fbc5d";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`, 
  },
});

export default apiClient;
