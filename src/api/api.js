import * as axios from "axios";

const ajax = axios.create({
  withCredentials: true,
  baseURL: "https://jsonplaceholder.typicode.com/"
})

export default ajax;