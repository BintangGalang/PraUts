import axios from "axios";

const token = "1|BhBaZjHJvgPjZR4C9YmuLqHgATTR1Eg1q3YlHaMNda0b4f9f";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`, 
  },
});

export default apiClient;
