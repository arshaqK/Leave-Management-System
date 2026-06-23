import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

export default function EmployeeDashboard() {
    const [stats, setStats] = useState(null)
    const [recentLeaves, setRecentLeaves] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([
            api.get('/api/dashboard/employee'),
            api.get('/api/leaves')
        ])
            .then(([statsRes, leavesRes]) => {
                setStats(statsRes.data)
                setRecentLeaves(leavesRes.data.slice(0, 5))
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div style={styles.loading}>Loading...</div>

    const statCards = [
        { label: 'Total Leaves', value: stats?.totalLeaves ?? 0 },
        { label: 'Pending', value: stats?.pendingLeaves ?? 0 },
        { label: 'Approved', value: stats?.approvedLeaves ?? 0 },
        { label: 'Rejected', value: stats?.rejectedLeaves ?? 0 },
    ]

    const statusBadge = (status) => {
        const map = {
            Approved: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e', border: 'rgba(34,197,94,0.3)' },
            Rejected: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'rgba(239,68,68,0.3)' },
            Pending: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
            Cancelled: { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
        }
        const s = map[status] || map.Pending
        return {
            display: 'inline-flex', alignItems: 'center',
            padding: '0.2rem 0.65rem', borderRadius: '999px',
            fontSize: '0.75rem', fontWeight: '600',
            background: s.bg, color: s.color,
            border: `1px solid ${s.border}`
        }
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Welcome back, {user?.fullName?.split(' ')[0]}</h1>
                    <p style={styles.subtitle}>Here's your leave summary</p>
                </div>
                <button style={styles.btnPrimary} onClick={() => navigate('/leaves/apply')}>
                    + Apply for Leave
                </button>
            </div>

            {/* Stat Cards */}
            <div style={styles.statsGrid}>
                {statCards.map(card => (
                    <div key={card.label} style={styles.statCard}>
                        <div style={styles.statLeft}>
                            <p style={styles.statLabel}>{card.label}</p>
                            <p style={styles.statValue}>{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Leaves */}
            <div style={styles.section}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Recent Leave Requests</h2>
                    <button style={styles.btnLink} onClick={() => navigate('/leaves')}>
                        View all →
                    </button>
                </div>
                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thead}>
                                <th style={styles.th}>Type</th>
                                <th style={styles.th}>From</th>
                                <th style={styles.th}>To</th>
                                <th style={styles.th}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentLeaves.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={styles.empty}>No leave requests yet</td>
                                </tr>
                            ) : recentLeaves.map(leave => (
                                <tr key={leave.id} style={styles.tr}>
                                    <td style={styles.td}>{leave.leaveType}</td>
                                    <td style={styles.td}>{leave.startDate}</td>
                                    <td style={styles.td}>{leave.endDate}</td>
                                    <td style={styles.td}>
                                        <span style={statusBadge(leave.status)}>{leave.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const styles = {
    page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    loading: { color: '#94a3b8', padding: '2rem', textAlign: 'center' },
    header: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '2rem',
        flexWrap: 'wrap', gap: '1rem'
    },
    title: { fontSize: '1.6rem', fontWeight: '700', color: '#f1f5f9' },
    subtitle: { fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' },
    btnPrimary: {
        padding: '0.55rem 1.25rem', background: '#3b82f6', color: 'white',
        border: 'none', borderRadius: '8px', cursor: 'pointer',
        fontSize: '0.9rem', fontWeight: '500', fontFamily: 'Inter, sans-serif'
    },
    btnLink: {
        background: 'none', border: 'none', color: '#3b82f6',
        cursor: 'pointer', fontSize: '0.88rem', fontFamily: 'Inter, sans-serif'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem', marginBottom: '2rem'
    },
    statCard: {
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', padding: '1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    },
    statLeft: {},
    statLabel: {
        fontSize: '0.8rem', fontWeight: '500', color: '#64748b',
        textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem'
    },
    statValue: { fontSize: '2.2rem', fontWeight: '700', color: '#f1f5f9', lineHeight: 1 },
    statIconBox: {
        width: '52px', height: '52px', borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    statIcon: { fontSize: '1.4rem' },
    section: { marginTop: '2rem' },
    sectionHeader: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '1rem'
    },
    sectionTitle: { fontSize: '1.1rem', fontWeight: '600', color: '#f1f5f9' },
    tableWrapper: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', overflow: 'hidden'
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    thead: { borderBottom: '1px solid rgba(255,255,255,0.08)' },
    th: {
        padding: '0.85rem 1rem', textAlign: 'left',
        fontSize: '0.75rem', fontWeight: '600',
        textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569'
    },
    tr: { borderBottom: '1px solid rgba(255,255,255,0.05)' },
    td: { padding: '0.9rem 1rem', fontSize: '0.9rem', color: '#94a3b8' },
    empty: { padding: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.9rem' }
}