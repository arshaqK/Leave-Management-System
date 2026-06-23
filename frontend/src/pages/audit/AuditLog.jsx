import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

export default function AuditLogPage() {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState({ action: '', entity: '', search: '' })
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/api/audit/all')
            .then(res => setLogs(res.data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const filtered = logs.filter(log => {
        const matchAction = !filter.action || log.action === filter.action
        const matchEntity = !filter.entity || log.entityName === filter.entity
        const matchSearch = !filter.search ||
            log.performedBy?.toLowerCase().includes(filter.search.toLowerCase()) ||
            log.details?.toLowerCase().includes(filter.search.toLowerCase())
        return matchAction && matchEntity && matchSearch
    })

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
        return new Date(dateStr).toLocaleString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Audit Trail</h1>
                    <p style={styles.subtitle}>{filtered.length} of {logs.length} records</p>
                </div>
                <button style={styles.btnGhost} onClick={() => navigate('/dashboard/admin')}>
                    ← Back to Dashboard
                </button>
            </div>

            {/* Filters */}
            <div style={styles.filters}>
                <input
                    type="text"
                    placeholder="Search by user or details..."
                    value={filter.search}
                    onChange={e => setFilter({ ...filter, search: e.target.value })}
                    style={styles.searchInput}
                />
                <select
                    value={filter.action}
                    onChange={e => setFilter({ ...filter, action: e.target.value })}
                    style={styles.select}>
                    <option value="">All Actions</option>
                    <option value="CREATE">CREATE</option>
                    <option value="UPDATE">UPDATE</option>
                    <option value="DELETE">DELETE</option>
                </select>
                <select
                    value={filter.entity}
                    onChange={e => setFilter({ ...filter, entity: e.target.value })}
                    style={styles.select}>
                    <option value="">All Entities</option>
                    <option value="Employee">Employee</option>
                    <option value="LeaveRequest">LeaveRequest</option>
                </select>
            </div>

            <div style={styles.tableWrapper}>
                {loading ? (
                    <div style={styles.empty}>Loading...</div>
                ) : (
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
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={styles.empty}>No records found</td>
                                </tr>
                            ) : filtered.map((log, i) => {
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
                                        <td style={{ ...styles.td, maxWidth: '300px' }}>
                                            {log.details}
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
                )}
            </div>
        </div>
    )
}

const styles = {
    page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    loading: { color: '#94a3b8', padding: '2rem', textAlign: 'center' },
    header: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '1.5rem',
        flexWrap: 'wrap', gap: '1rem'
    },
    title: { fontSize: '1.6rem', fontWeight: '700', color: '#f1f5f9' },
    subtitle: { fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' },
    btnGhost: {
        padding: '0.55rem 1.25rem', background: 'transparent',
        color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', cursor: 'pointer',
        fontSize: '0.9rem', fontFamily: 'Inter, sans-serif'
    },
    filters: {
        display: 'flex', gap: '0.75rem', marginBottom: '1.25rem',
        flexWrap: 'wrap'
    },
    searchInput: {
        flex: 1, minWidth: '200px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', padding: '0.65rem 1rem',
        color: '#f1f5f9', fontSize: '0.9rem',
        fontFamily: 'Inter, sans-serif', outline: 'none'
    },
    select: {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', padding: '0.65rem 1rem',
        color: '#f1f5f9', fontSize: '0.9rem',
        fontFamily: 'Inter, sans-serif', outline: 'none'
    },
    tableWrapper: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', overflow: 'hidden'
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    thead: { borderBottom: '1px solid rgba(255,255,255,0.08)' },
    th: {
        padding: '0.85rem 1rem', textAlign: 'left',
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
    performedBy: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
    miniAvatar: {
        width: '24px', height: '24px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.7rem', fontWeight: '700', color: 'white', flexShrink: 0
    },
    timestamp: { fontSize: '0.8rem', color: '#475569', whiteSpace: 'nowrap' }
}