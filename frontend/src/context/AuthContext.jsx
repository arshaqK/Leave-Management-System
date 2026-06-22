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

        await api.post('/login/authenticate', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })

        const res = await api.get('/api/me')
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