import axios from "axios";

let baseUrl = "https://b-server-kzzf.onrender.com/api/users";

// export const addOrder = (order, token) => {
//   return axios.post(baseUrl, order, {
//     headers: {
//       "x-access-token": token,
//     },
//   });
// };
//הרשמה
export const signUp = (user) => {
    return axios.post(`${baseUrl}`, user);

    // נתון שלישי זה headers

}

// export const addUser = (user) => {
//     return axios.post(`${baseUrl}user/`,user,{
//         headers: {
//                    "x-access-token": localStorage.getItem("currentToken")
//                }

//     });
// }


export const signIn = (user) => {
    return axios.post(`${baseUrl}/login/signIn`, user);

}