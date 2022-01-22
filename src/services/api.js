import axios from "axios";

const axiosR = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosR;
