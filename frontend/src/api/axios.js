import axios from 'axios'

const api = axios.create({
    baseURL: 'http://172.19.174.148:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.response.use(
    (response) => {
        if (response.request?.responseURL && response.request.responseURL.includes('/auth/login')) {
            localStorage.removeItem('user')
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login'
            }
            return Promise.reject(new Error('Unauthorized - Redirected to login'))
        }
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api