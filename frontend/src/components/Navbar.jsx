import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const isAdmin = user?.role === 'ROLE_ADMIN'
    const isActive = (path) => location.pathname.startsWith(path)

    return (
        <nav style={styles.nav}>
            <div style={styles.left}>
                <div style={styles.brand}>
                    <span style={styles.brandIcon}>📅</span>
                    <span style={styles.brandText}>LeaveMS</span>
                </div>
                <div style={styles.links}>
                    <Link to="/dashboard"
                        style={{ ...styles.link, ...(isActive('/dashboard') ? styles.activeLink : {}) }}>
                        Dashboard
                    </Link>
                    {isAdmin && <>
                        <Link to="/employees"
                            style={{ ...styles.link, ...(isActive('/employees') ? styles.activeLink : {}) }}>
                            Employees
                        </Link>
                        <Link to="/leaves/pending"
                            style={{ ...styles.link, ...(isActive('/leaves/pending') ? styles.activeLink : {}) }}>
                            Leave Requests
                        </Link>
                        <Link to="/reports"
                            style={{ ...styles.link, ...(isActive('/reports') ? styles.activeLink : {}) }}>
                            Reports
                        </Link>
                    </>}
                    {!isAdmin && <>
                        <Link to="/leaves"
                            style={{ ...styles.link, ...(isActive('/leaves') && !isActive('/leaves/apply') ? styles.activeLink : {}) }}>
                            My Leaves
                        </Link>
                        <Link to="/leaves/apply"
                            style={{ ...styles.link, ...(isActive('/leaves/apply') ? styles.activeLink : {}) }}>
                            Apply Leave
                        </Link>
                    </>}
                </div>
            </div>
            <div style={styles.right}>
                <div style={styles.userInfo}>
                    <div style={styles.avatar}>
                        {(user?.fullName || user?.username || '?')[0].toUpperCase()}
                    </div>
                    <div style={styles.userDetails}>
                        <span style={styles.userName}>{user?.fullName || user?.username}</span>
                        <span style={styles.userRole}>
                            {isAdmin ? 'Administrator' : 'Employee'}
                        </span>
                    </div>
                </div>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    Sign out
                </button>
            </div>
        </nav>
    )
}

const styles = {
    nav: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: '64px',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky', top: 0, zIndex: 100,
    },
    left: { display: 'flex', alignItems: 'center', gap: '2.5rem' },
    brand: { display: 'flex', alignItems: 'center', gap: '0.6rem' },
    brandIcon: { fontSize: '1.4rem' },
    brandText: {
        fontSize: '1.1rem', fontWeight: '700',
        color: '#f1f5f9', letterSpacing: '-0.02em'
    },
    links: { display: 'flex', gap: '0.25rem' },
    link: {
        padding: '0.4rem 0.85rem', borderRadius: '6px',
        color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500',
        transition: 'all 0.15s', textDecoration: 'none'
    },
    activeLink: {
        background: 'rgba(59,130,246,0.15)',
        color: '#3b82f6'
    },
    right: { display: 'flex', alignItems: 'center', gap: '1rem' },
    userInfo: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    avatar: {
        width: '34px', height: '34px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.85rem', fontWeight: '700', color: 'white'
    },
    userDetails: { display: 'flex', flexDirection: 'column' },
    userName: { fontSize: '0.88rem', fontWeight: '600', color: '#f1f5f9' },
    userRole: { fontSize: '0.75rem', color: '#64748b' },
    logoutBtn: {
        padding: '0.4rem 1rem',
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#94a3b8', borderRadius: '8px',
        cursor: 'pointer', fontSize: '0.85rem',
        fontFamily: 'Inter, sans-serif',
        transition: 'all 0.15s'
    }
}