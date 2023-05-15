import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export function login(data) {
    return axios.post(`${apiUrl}login/`, data);
}


export function registerUser(data) {
    return axios.post(`${apiUrl}users/register/`, data);
}

export function recoverPassword(data) {
    return axios.post(`${apiUrl}users/forgot/password/`, data)
}

export function activateUser(data) {
/*     const token = window.localStorage.getItem('token');
    const headers = {
        'Content-Type': 'nomas',
        'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyMDg1MzU4LCJpYXQiOjE2ODE5OTg5NTgsImp0aSI6IjRhODYwZWEyNzZjYjQzOGFiNDNjYjExNTUyOTlkZjMxIiwidXNlcl9pZCI6MTMsImdyb3VwcyI6ImFkbWluIiwic3RhdHVzIjoiZGlzYWJsZWQifQ.st0Gr6ne7wlOvGloHkIPqP5pIxA2j0tVCG2LHHDZMf8FZyqN7ckSkEm0S6S5YCTR8ydqx7PKxwI-qdhuGcUKGg`  
    } */
    console.log(headers)
/*     return axios({ method: 'post', url: apiUrl + 'users/activation/', headers: { 'Authorization': 'Bearer ' + token }, data }) */
   /*  return axios.post(`${apiUrl}users/activation/`, data, { headers:headers}) */
} 

export function activateUsers(data) {
    return axios.patch(`${apiUrl}users/reset/password/`, data)
}