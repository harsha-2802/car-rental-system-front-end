import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,   // ✅ use environment variable
  withCredentials: true                   // ✅ allow cookies if you use login tokens
})

export default API

