import axios from "axios";

let baseUrl = "https://b-server-kzzf.onrender.com/api/orders";


export const addOrder = (newO,token) => {
    return axios.post(`${baseUrl}`,newO, {
        headers: {
          "x-access-token": token,
        },
      });
}
