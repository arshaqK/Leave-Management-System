import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

export default function LeaveList() {
    const [leaves, setLeaves] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/api/leaves')
            .then(res => setLeaves(res.data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const handleCancel = async (id) => {
        if (!window.confirm('Cancel this leave request?')) return
        try {
            await api.put(`/api/leaves/${id}/cancel`)
            setLeaves(leaves.map(l =>
                l.id === id ? { ...l, status: 'Cancelled' } : l
            ))
        } catch (err) {
            alert('Error cancelling leave')
        }
    }

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
            background: s.bg, color: s.color, border: `1px solid ${s.border}`
        }
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>My Leave History</h1>
                    <p style={styles.subtitle}>{leaves.length} total requests</p>
                </div>
                <button style={styles.btnPrimary} onClick={() => navigate('/leaves/apply')}>
                    + Apply for Leave
                </button>
            </div>

            <div style={styles.tableWrapper}>
                {loading ? (
                    <div style={styles.empty}>Loading...</div>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thead}>
                                <th style={styles.th}>Type</th>
                                <th style={styles.th}>From</th>
                                <th style={styles.th}>To</th>
                                <th style={styles.th}>Reason</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Remarks</th>
                                <th style={styles.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={styles.empty}>No leave requests found</td>
                                </tr>
                            ) : leaves.map(leave => (
                                <tr key={leave.id} style={styles.tr}>
                                    <td style={styles.td}>
                                        <span style={styles.typeBadge}>{leave.leaveType}</span>
                                    </td>
                                    <td style={styles.td}>{leave.startDate?.split('T')[0]}</td>
                                    <td style={styles.td}>{leave.endDate?.split('T')[0]}</td>
                                    <td style={{ ...styles.td, maxWidth: '200px' }}>
                                        <span style={styles.reason}>{leave.reason}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={statusBadge(leave.status)}>{leave.status}</span>
                                    </td>
                                    <td style={styles.td}>{leave.remarks || '—'}</td>
                                    <td style={styles.td}>
                                        {leave.status === 'Pending' && (
                                            <button style={styles.btnCancel}
                                                onClick={() => handleCancel(leave.id)}>
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

const styles = {
    page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '1.5rem',
        flexWrap: 'wrap', gap: '1rem'
    },
    title: { fontSize: '1.6rem', fontWeight: '700', color: '#f1f5f9' },
    subtitle: { fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' },
    btnPrimary: {
        padding: '0.55rem 1.25rem', background: '#3b82f6', color: 'white',
        border: 'none', borderRadius: '8px', cursor: 'pointer',
        fontSize: '0.9rem', fontWeight: '500', fontFamily: 'Inter, sans-serif'
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
        fontSize: '0.75rem', fontWeight: '600',
        textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569'
    },
    tr: { borderBottom: '1px solid rgba(255,255,255,0.05)' },
    td: { padding: '0.9rem 1rem', fontSize: '0.88rem', color: '#94a3b8' },
    empty: { padding: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.9rem' },
    typeBadge: {
        background: 'rgba(59,130,246,0.15)', color: '#3b82f6',
        border: '1px solid rgba(59,130,246,0.3)',
        padding: '0.2rem 0.65rem', borderRadius: '999px',
        fontSize: '0.75rem', fontWeight: '600'
    },
    reason: {
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden'
    },
    btnCancel: {
        padding: '0.3rem 0.75rem',
        background: 'rgba(239,68,68,0.15)', color: '#ef4444',
        border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '6px', cursor: 'pointer',
        fontSize: '0.8rem', fontFamily: 'Inter, sans-serif'
    }
}