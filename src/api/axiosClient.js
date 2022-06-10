import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // const token = localStorage.getItem("hbl-token");
    // if (token) {
    //   const { accessToken } = JSON.parse(token);
    //   config.headers.Authorization = "Bearer " + accessToken;
    // }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxIiwibWVtYmVySWQiOiI0MyIsImV4cCI6MTY4NjIyMDAzNiwiaXNzIjoiVmlldG5hbSBNeSBDbHViIiwiYXVkIjoiVmlldG5hbSBNeSBDbHViIn0.ybljj7SdXIMyseUuK3hwIdhvq30B1u6INGdykbIHv-U";
    config.headers.Authorization = "Bearer " + token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
