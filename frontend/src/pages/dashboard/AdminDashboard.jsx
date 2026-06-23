import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

export default function AdminDashboard() {
    const [stats, setStats] = useState(null)
    const [auditLogs, setAuditLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([
            api.get('/api/dashboard/admin'),
            api.get('/api/audit')
        ])
            .then(([statsRes, auditRes]) => {
                setStats(statsRes.data)
                setAuditLogs(auditRes.data)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div style={styles.loading}>Loading...</div>

    const statCards = [
        { label: 'Total Employees', value: stats?.totalEmployees ?? 0 },
        { label: 'Active Employees', value: stats?.activeEmployees ?? 0 },
        { label: 'Pending Requests', value: stats?.pendingLeaves ?? 0 },
        { label: 'Approved This Month', value: stats?.approvedThisMonth ?? 0 },
    ]

    const actionColor = (action) => {
        const map = {
            CREATE: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e', border: 'rgba(34,197,94,0.3)' },
            UPDATE: { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
            DELETE: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'rgba(239,68,68,0.3)' },
        }
        return map[action] || map.UPDATE
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return '—'
        const d = new Date(dateStr)
        return d.toLocaleString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    }

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
                        <div>
                            <p style={styles.statLabel}>{card.label}</p>
                            <p style={styles.statValue}>{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.grid2}>
                {/* Quick Actions */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Quick Actions</h2>
                    <div style={styles.actionsGrid}>
                        {[
                            { label: 'Manage Employees', desc: 'View, edit or deactivate employees', path: '/employees', color: '#3b82f6' },
                            { label: 'Leave Requests', desc: `${stats?.pendingLeaves ?? 0} pending approvals`, path: '/leaves/pending', color: '#f59e0b' },
                            { label: 'Reports', desc: 'Leaves by department, month, usage', path: '/reports', color: '#22c55e' },
                        ].map(action => (
                            <div key={action.label} style={styles.actionCard}
                                onClick={() => navigate(action.path)}>
                                <div style={{ flex: 1 }}>
                                    <p style={styles.actionLabel}>{action.label}</p>
                                    <p style={styles.actionDesc}>{action.desc}</p>
                                </div>
                                <span style={styles.actionArrow}>→</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Summary */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Activity Summary</h2>
                    <div style={styles.summaryGrid}>
                        {[
                            { label: 'Employees Created', value: auditLogs.filter(l => l.entityName === 'Employee' && l.action === 'CREATE').length },
                            { label: 'Employees Updated', value: auditLogs.filter(l => l.entityName === 'Employee' && l.action === 'UPDATE').length },
                            { label: 'Leave Requests Handled', value: auditLogs.filter(l => l.entityName === 'LeaveRequest').length },
                        ].map(item => (
                            <div key={item.label} style={styles.summaryItem}>
                                <div>
                                    <p style={styles.summaryValue}>{item.value}</p>
                                    <p style={styles.summaryLabel}>{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Audit Log Table */}
            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>Audit Trail</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={styles.logCount}>{auditLogs.length} recent records</span>
                        <button style={styles.btnLink} onClick={() => navigate('/audit')}>
                            View all →
                        </button>
                    </div>
                </div>
                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thead}>
                                <th style={styles.th}>Action</th>
                                <th style={styles.th}>Entity</th>
                                <th style={styles.th}>Details</th>
                                <th style={styles.th}>Performed By</th>
                                <th style={styles.th}>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auditLogs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={styles.empty}>No audit logs yet</td>
                                </tr>
                            ) : auditLogs.map((log, i) => {
                                const ac = actionColor(log.action)
                                return (
                                    <tr key={i} style={styles.tr}>
                                        <td style={styles.td}>
                                            <span style={{
                                                display: 'inline-flex', alignItems: 'center',
                                                padding: '0.2rem 0.65rem', borderRadius: '999px',
                                                fontSize: '0.72rem', fontWeight: '600',
                                                background: ac.bg, color: ac.color, border: `1px solid ${ac.border}`
                                            }}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.entityBadge}>{log.entityName}</span>
                                        </td>
                                        <td style={{ ...styles.td, maxWidth: '280px' }}>
                                            <span style={styles.details}>{log.details}</span>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.performedBy}>
                                                <div style={styles.miniAvatar}>
                                                    {log.performedBy?.[0]?.toUpperCase()}
                                                </div>
                                                {log.performedBy}
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.timestamp}>{formatDate(log.dateCreated)}</span>
                                        </td>
                                    </tr>
                                )
                            })}
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
    btnLink: {
        background: 'none', border: 'none', color: '#3b82f6',
        cursor: 'pointer', fontSize: '0.88rem', fontFamily: 'Inter, sans-serif'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem', marginBottom: '1.5rem'
    },
    statCard: {
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', padding: '1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    },
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
    grid2: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '1.25rem', marginBottom: '1.5rem'
    },
    card: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', padding: '1.5rem',
        marginBottom: '1.5rem'
    },
    cardHeader: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '1.25rem'
    },
    cardTitle: {
        fontSize: '1rem', fontWeight: '600',
        color: '#f1f5f9', marginBottom: '1.25rem'
    },
    logCount: {
        fontSize: '0.78rem', color: '#475569',
        background: 'rgba(255,255,255,0.05)',
        padding: '0.2rem 0.6rem', borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.08)'
    },
    actionsGrid: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    actionCard: {
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '10px', padding: '1rem 1.25rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
        cursor: 'pointer', transition: 'all 0.2s'
    },
    actionIcon: {
        width: '40px', height: '40px', borderRadius: '10px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0
    },
    actionLabel: { fontSize: '0.92rem', fontWeight: '600', color: '#f1f5f9' },
    actionDesc: { fontSize: '0.8rem', color: '#64748b', marginTop: '0.1rem' },
    actionArrow: { color: '#475569', fontSize: '1rem' },
    summaryGrid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    summaryItem: {
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '0.75rem 1rem',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)'
    },
    summaryIcon: { fontSize: '1.5rem' },
    summaryValue: { fontSize: '1.4rem', fontWeight: '700', color: '#f1f5f9', lineHeight: 1 },
    summaryLabel: { fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' },
    tableWrapper: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse' },
    thead: { borderBottom: '1px solid rgba(255,255,255,0.08)' },
    th: {
        padding: '0.75rem 1rem', textAlign: 'left',
        fontSize: '0.72rem', fontWeight: '600',
        textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569'
    },
    tr: { borderBottom: '1px solid rgba(255,255,255,0.05)' },
    td: { padding: '0.85rem 1rem', fontSize: '0.87rem', color: '#94a3b8' },
    empty: { padding: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.9rem' },
    entityBadge: {
        background: 'rgba(139,92,246,0.15)', color: '#a78bfa',
        border: '1px solid rgba(139,92,246,0.3)',
        padding: '0.2rem 0.6rem', borderRadius: '999px',
        fontSize: '0.72rem', fontWeight: '600'
    },
    details: {
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
        fontSize: '0.85rem'
    },
    performedBy: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
    miniAvatar: {
        width: '24px', height: '24px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.7rem', fontWeight: '700', color: 'white', flexShrink: 0
    },
    timestamp: { fontSize: '0.8rem', color: '#475569', whiteSpace: 'nowrap' }
}