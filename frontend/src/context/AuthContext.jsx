import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (stored) setUser(JSON.parse(stored))
        setLoading(false)
    }, [])

    const login = async (username, password) => {
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)

        const loginRes = await api.post('/login/authenticate', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            maxRedirects: 0,
            validateStatus: (status) => status === 302 || status === 200
        })

        // If redirected to failure URL, credentials are wrong or account disabled
        if (loginRes.headers?.location?.includes('error')) {
            throw { response: { status: 401 } }
        }

        const res = await api.get('/api/me')

        // Double check employee status
        if (res.data.status === 'Inactive') {
            await api.get('/logoff')
            throw { response: { status: 403 } }
        }

        setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
    }

    const logout = async () => {
        await api.get('/logoff')
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)