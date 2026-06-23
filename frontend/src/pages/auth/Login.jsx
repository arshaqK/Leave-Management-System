import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const user = await login(username, password)
            if (user.role === 'ROLE_ADMIN') navigate('/dashboard/admin')
            else navigate('/dashboard/employee')
        } catch (err) {
            const status = err.response?.status
            if (status === 403) {
                setError('Your account has been deactivated. Please contact your administrator.')
            } else {
                setError('Invalid username or password.')
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div style={styles.container}>
            {/* Left Panel */}
            <div style={styles.leftPanel}>
                <div style={styles.leftContent}>
                    <div style={styles.logoArea}>
                        <span style={styles.logoIcon}>📅</span>
                        <span style={styles.logoText}>LeaveMS</span>
                    </div>
                    <h1 style={styles.heroTitle}>
                        Manage Leave<br />
                        <span style={styles.heroAccent}>Effortlessly</span>
                    </h1>
                    <p style={styles.heroSubtitle}>
                        A modern leave management system for teams. Apply, approve, and track leave requests in one place.
                    </p>
                    <div style={styles.featureList}>
                        {['Role-based access control', 'Real-time leave tracking', 'Email notifications', 'Detailed reports'].map(f => (
                            <div key={f} style={styles.featureItem}>
                                <span style={styles.featureDot}></span>
                                <span style={styles.featureText}>{f}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Geometric SVG illustration */}
                <svg style={styles.illustration} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                    {/* Background circles */}
                    <circle cx="250" cy="250" r="200" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1" />
                    <circle cx="250" cy="250" r="150" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
                    <circle cx="250" cy="250" r="100" fill="none" stroke="rgba(59,130,246,0.16)" strokeWidth="1" />

                    {/* Rotating outer ring dots */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                        const rad = (angle * Math.PI) / 180
                        const x = 250 + 200 * Math.cos(rad)
                        const y = 250 + 200 * Math.sin(rad)
                        return <circle key={i} cx={x} cy={y} r="3" fill="rgba(59,130,246,0.5)" />
                    })}

                    {/* Inner geometric shapes */}
                    <polygon points="250,80 310,180 190,180" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
                    <polygon points="250,420 310,320 190,320" fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" />
                    <rect x="170" y="170" width="160" height="160" rx="8"
                        fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5"
                        transform="rotate(45 250 250)" />

                    {/* Center calendar icon */}
                    <rect x="210" y="215" width="80" height="70" rx="8" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />
                    <rect x="210" y="215" width="80" height="20" rx="8" fill="rgba(59,130,246,0.3)" />
                    <rect x="210" y="228" width="80" height="7" fill="rgba(59,130,246,0.3)" />
                    {[0, 1, 2].map(col => [0, 1, 2].map(row => (
                        <rect key={`${col}-${row}`}
                            x={220 + col * 22} y={245 + row * 13}
                            width="12" height="8" rx="2"
                            fill={col === 0 && row === 0 ? 'rgba(59,130,246,0.8)' : 'rgba(255,255,255,0.15)'}
                        />
                    )))}

                    {/* Floating accent shapes */}
                    <circle cx="130" cy="150" r="20" fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" />
                    <circle cx="370" cy="350" r="15" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
                    <circle cx="380" cy="140" r="8" fill="rgba(59,130,246,0.4)" />
                    <circle cx="120" cy="360" r="6" fill="rgba(139,92,246,0.4)" />

                    {/* Connecting lines */}
                    <line x1="130" y1="150" x2="210" y2="215" stroke="rgba(59,130,246,0.15)" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="370" y1="350" x2="290" y2="285" stroke="rgba(139,92,246,0.15)" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="380" y1="140" x2="290" y2="215" stroke="rgba(59,130,246,0.15)" strokeWidth="1" strokeDasharray="4,4" />

                    {/* Small sparkles */}
                    {[[160, 280], [340, 200], [200, 380], [300, 120]].map(([x, y], i) => (
                        <g key={i}>
                            <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" />
                            <line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" />
                        </g>
                    ))}
                </svg>
            </div>

            {/* Right Panel */}
            <div style={styles.rightPanel}>
                <div style={styles.formCard}>
                    <div style={styles.formHeader}>
                        <h2 style={styles.formTitle}>Welcome back</h2>
                        <p style={styles.formSubtitle}>Sign in to your account</p>
                    </div>

                    {error && (
                        <div style={styles.errorAlert}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                autoFocus
                                style={styles.input}
                                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                style={styles.input}
                                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? 'Signing in...' : 'Sign in →'}
                        </button>
                    </form>

                    <p style={styles.hint}>
                        Default: <code style={styles.code}>admin / admin123</code>
                    </p>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0f172a',
    },
    leftPanel: {
        flex: 1,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem',
        position: 'relative',
        overflow: 'hidden',
        borderRight: '1px solid rgba(255,255,255,0.06)',
    },
    leftContent: {
        position: 'relative',
        zIndex: 2,
        maxWidth: '480px',
    },
    logoArea: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        marginBottom: '3rem',
    },
    logoIcon: { fontSize: '1.8rem' },
    logoText: {
        fontSize: '1.3rem',
        fontWeight: '700',
        color: '#f1f5f9',
        letterSpacing: '-0.02em',
    },
    heroTitle: {
        fontSize: '3rem',
        fontWeight: '800',
        color: '#f1f5f9',
        lineHeight: 1.15,
        marginBottom: '1.25rem',
        letterSpacing: '-0.03em',
    },
    heroAccent: {
        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
        fontSize: '1rem',
        color: '#64748b',
        lineHeight: 1.7,
        marginBottom: '2.5rem',
        maxWidth: '380px',
    },
    featureList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    featureItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    featureDot: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#3b82f6',
        flexShrink: 0,
    },
    featureText: {
        fontSize: '0.9rem',
        color: '#94a3b8',
    },
    illustration: {
        position: 'absolute',
        right: '-60px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '500px',
        height: '500px',
        opacity: 0.7,
        zIndex: 1,
    },
    rightPanel: {
        width: '480px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        flexShrink: 0,
    },
    formCard: {
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '2.5rem',
    },
    formHeader: {
        marginBottom: '2rem',
    },
    formTitle: {
        fontSize: '1.6rem',
        fontWeight: '700',
        color: '#f1f5f9',
        marginBottom: '0.4rem',
    },
    formSubtitle: {
        fontSize: '0.9rem',
        color: '#64748b',
    },
    errorAlert: {
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.3)',
        color: '#fca5a5',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        fontSize: '0.88rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    formGroup: {
        marginBottom: '1.25rem',
    },
    label: {
        display: 'block',
        fontSize: '0.8rem',
        fontWeight: '600',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '0.5rem',
    },
    input: {
        width: '100%',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        color: '#f1f5f9',
        fontSize: '0.95rem',
        fontFamily: 'Inter, sans-serif',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        outline: 'none',
    },
    submitBtn: {
        width: '100%',
        padding: '0.85rem',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        fontFamily: 'Inter, sans-serif',
        cursor: 'pointer',
        marginTop: '0.5rem',
        transition: 'opacity 0.2s',
        letterSpacing: '0.01em',
    },
    hint: {
        marginTop: '1.5rem',
        fontSize: '0.82rem',
        color: '#475569',
        textAlign: 'center',
    },
    code: {
        background: 'rgba(255,255,255,0.06)',
        padding: '0.15rem 0.4rem',
        borderRadius: '4px',
        fontFamily: 'monospace',
        color: '#94a3b8',
    },
}