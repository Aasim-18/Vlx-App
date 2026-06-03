import axios, { AxiosInstance } from 'axios'

const ApiClient: AxiosInstance = axios.create({

   baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})


export default ApiClient