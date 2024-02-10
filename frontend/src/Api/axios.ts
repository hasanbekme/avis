import axios from "axios"

const BASE_URL = "http://172.20.101.91:8000/api/v1/"

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
})