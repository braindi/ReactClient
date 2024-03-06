import axios from 'axios';

// let baseUrl = "https://r-server-s5x2.onrender.com/api/bags";
let baseUrl = "https://b-server-kzzf.onrender.com/api/bags";


export const getBags = (page, perPage) => {
  //פרמטרים לא חובה....
  return axios.get(`${baseUrl}?page=${page}&perPage=${perPage}`)
}

// export const getNumPages = () => {
//     return axios.get(`${baseUrl}/num/page`);
// }


export const getNumOfAllPages = () => {
  //אפשרות לשלוח כמה בעמוד
  return axios.get(`${baseUrl}/num/pages`);
}


export const newBag = (bag, token) => {
  return axios.post(baseUrl, bag, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const delBag = (bag, token) => {
  return axios.delete(`${baseUrl}/${bag}`, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const editBag = (idBag, data, token) => {
  return axios.put(`${baseUrl}/${idBag}`, data, {
    headers: {
      "x-access-token": token,
    },
  })
}
