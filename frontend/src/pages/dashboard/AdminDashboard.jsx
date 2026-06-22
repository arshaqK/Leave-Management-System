import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

export default function AdminDashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/api/dashboard/admin')
            .then(res => setStats(res.data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div style={styles.loading}>Loading...</div>

    const statCards = [
        { label: 'Total Employees', value: stats?.totalEmployees ?? 0, icon: '👥', color: '#3b82f6' },
        { label: 'Active Employees', value: stats?.activeEmployees ?? 0, icon: '✅', color: '#22c55e' },
        { label: 'Pending Requests', value: stats?.pendingLeaves ?? 0, icon: '⏳', color: '#f59e0b' },
        { label: 'Approved This Month', value: stats?.approvedThisMonth ?? 0, icon: '📋', color: '#06b6d4' },
    ]

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Admin Dashboard</h1>
                    <p style={styles.subtitle}>Overview of your organization</p>
                </div>
                <div style={styles.headerActions}>
                    <button style={styles.btnPrimary} onClick={() => navigate('/employees/create')}>
                        + Add Employee
                    </button>
                    <button style={styles.btnGhost} onClick={() => navigate('/leaves/pending')}>
                        View Pending
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div style={styles.statsGrid}>
                {statCards.map(card => (
                    <div key={card.label} style={styles.statCard}>
                        <div style={styles.statLeft}>
                            <p style={styles.statLabel}>{card.label}</p>
                            <p style={styles.statValue}>{card.value}</p>
                        </div>
                        <div style={{ ...styles.statIconBox, background: `${card.color}22`, border: `1px solid ${card.color}44` }}>
                            <span style={styles.statIcon}>{card.icon}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Quick Actions</h2>
                <div style={styles.actionsGrid}>
                    {[
                        { label: 'Manage Employees', desc: 'View, edit or deactivate employees', icon: '👥', path: '/employees', color: '#3b82f6' },
                        { label: 'Leave Requests', desc: `${stats?.pendingLeaves ?? 0} pending approvals`, icon: '📋', path: '/leaves/pending', color: '#f59e0b' },
                        { label: 'Reports', desc: 'Leaves by department, month, usage', icon: '📊', path: '/reports', color: '#22c55e' },
                    ].map(action => (
                        <div key={action.label} style={styles.actionCard}
                            onClick={() => navigate(action.path)}>
                            <div style={{ ...styles.actionIcon, background: `${action.color}22` }}>
                                <span>{action.icon}</span>
                            </div>
                            <div>
                                <p style={styles.actionLabel}>{action.label}</p>
                                <p style={styles.actionDesc}>{action.desc}</p>
                            </div>
                            <span style={styles.actionArrow}>→</span>
                        </div>
                    ))}
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
    headerActions: { display: 'flex', gap: '0.75rem' },
    btnPrimary: {
        padding: '0.55rem 1.25rem', background: '#3b82f6', color: 'white',
        border: 'none', borderRadius: '8px', cursor: 'pointer',
        fontSize: '0.9rem', fontWeight: '500', fontFamily: 'Inter, sans-serif'
    },
    btnGhost: {
        padding: '0.55rem 1.25rem', background: 'transparent',
        color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', cursor: 'pointer',
        fontSize: '0.9rem', fontFamily: 'Inter, sans-serif'
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
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between'
    },
    statLeft: {},
    statLabel: {
        fontSize: '0.8rem', fontWeight: '500',
        color: '#64748b', textTransform: 'uppercase',
        letterSpacing: '0.05em', marginBottom: '0.5rem'
    },
    statValue: {
        fontSize: '2.2rem', fontWeight: '700', color: '#f1f5f9', lineHeight: 1
    },
    statIconBox: {
        width: '52px', height: '52px', borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    statIcon: { fontSize: '1.4rem' },
    section: { marginTop: '2rem' },
    sectionTitle: {
        fontSize: '1.1rem', fontWeight: '600',
        color: '#f1f5f9', marginBottom: '1rem'
    },
    actionsGrid: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    actionCard: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', padding: '1.25rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1.25rem',
        cursor: 'pointer', transition: 'all 0.2s'
    },
    actionIcon: {
        width: '44px', height: '44px', borderRadius: '10px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0
    },
    actionLabel: { fontSize: '0.95rem', fontWeight: '600', color: '#f1f5f9' },
    actionDesc: { fontSize: '0.82rem', color: '#64748b', marginTop: '0.15rem' },
    actionArrow: { marginLeft: 'auto', color: '#475569', fontSize: '1.1rem' }
}