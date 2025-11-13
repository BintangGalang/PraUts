import axios from "axios";

const token = "2|h2nOAiKY2a2eje9tEvOYNJPHpxfEP8Kjd7w2KCBTa2646ae3";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`, 
  },
});

export default apiClient;
