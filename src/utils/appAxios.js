import axios from "axios";

export const appAxios = axios.create({
   baseURL: "http://localhost:3000",
  // baseURL: "https://my-json-server.typicode.com/Enes-ets34/qa-app-json-server",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json"
  }
});
