import axios from 'axios'

const api = axios.create({
    baseURL: 'http://172.19.174.148:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api