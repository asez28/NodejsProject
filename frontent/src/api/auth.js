import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const upgradeUserRole = (id) => axios.put(`/upgrade/${id}`);

export const verifyTokenRequest = () => axios.get('/verify')
