import { useState, useEffect } from 'react'
import api from '../../api/axios'

export default function LeavePending() {
    const [leaves, setLeaves] = useState([])
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(null) // { type: 'approve'|'reject', leave }
    const [remarks, setRemarks] = useState('')
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        api.get('/api/leaves')
            .then(res => setLeaves(res.data.filter(l => l.status === 'Pending')))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const handleAction = async () => {
        setProcessing(true)
        try {
            const endpoint = modal.type === 'approve'
                ? `/api/leaves/${modal.leave.id}/approve`
                : `/api/leaves/${modal.leave.id}/reject`
            await api.put(endpoint, { remarks })
            setLeaves(leaves.filter(l => l.id !== modal.leave.id))
            setModal(null)
            setRemarks('')
        } catch (err) {
            alert('Error processing request')
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Pending Leave Requests</h1>
                    <p style={styles.subtitle}>{leaves.length} awaiting approval</p>
                </div>
            </div>

            <div style={styles.tableWrapper}>
                {loading ? (
                    <div style={styles.empty}>Loading...</div>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thead}>
                                <th style={styles.th}>Employee</th>
                                <th style={styles.th}>Department</th>
                                <th style={styles.th}>Type</th>
                                <th style={styles.th}>From</th>
                                <th style={styles.th}>To</th>
                                <th style={styles.th}>Reason</th>
                                <th style={styles.th}>Applied On</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={styles.empty}>
                                        No pending requests
                                    </td>
                                </tr>
                            ) : leaves.map(leave => (
                                <tr key={leave.id} style={styles.tr}>
                                    <td style={styles.td}>
                                        <div style={styles.nameCell}>
                                            <div style={styles.avatar}>
                                                {leave.employee?.fullName?.[0]?.toUpperCase()}
                                            </div>
                                            <span style={styles.name}>{leave.employee?.fullName}</span>
                                        </div>
                                    </td>
                                    <td style={styles.td}>{leave.employee?.department}</td>
                                    <td style={styles.td}>
                                        <span style={styles.typeBadge}>{leave.leaveType}</span>
                                    </td>
                                    <td style={styles.td}>{leave.startDate?.split('T')[0]}</td>
                                    <td style={styles.td}>{leave.endDate?.split('T')[0]}</td>
                                    <td style={{ ...styles.td, maxWidth: '180px' }}>
                                        <span style={styles.reason}>{leave.reason}</span>
                                    </td>
                                    <td style={styles.td}>{leave.dateCreated?.split('T')[0]}</td>
                                    <td style={styles.td}>
                                        <div style={styles.actions}>
                                            <button style={styles.btnApprove}
                                                onClick={() => { setModal({ type: 'approve', leave }); setRemarks('') }}>
                                                Approve
                                            </button>
                                            <button style={styles.btnReject}
                                                onClick={() => { setModal({ type: 'reject', leave }); setRemarks('') }}>
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {modal && (
                <div style={styles.overlay}>
                    <div style={styles.modalCard}>
                        <h3 style={styles.modalTitle}>
                            {modal.type === 'approve' ? 'Approve Leave' : 'Reject Leave'}
                        </h3>
                        <p style={styles.modalDesc}>
                            {modal.type === 'approve' ? 'Approving' : 'Rejecting'} leave request for{' '}
                            <strong style={{ color: '#f1f5f9' }}>{modal.leave.employee?.fullName}</strong>
                        </p>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Remarks {modal.type === 'reject' && <span style={styles.required}>*</span>}
                            </label>
                            <textarea
                                value={remarks}
                                onChange={e => setRemarks(e.target.value)}
                                rows={4}
                                placeholder="Add remarks..."
                                required={modal.type === 'reject'}
                                style={styles.textarea}
                            />
                        </div>
                        <div style={styles.modalActions}>
                            <button
                                onClick={handleAction}
                                disabled={processing || (modal.type === 'reject' && !remarks.trim())}
                                style={modal.type === 'approve' ? styles.btnApprove : styles.btnReject}>
                                {processing ? 'Processing...' :
                                    modal.type === 'approve' ? 'Confirm Approve' : 'Confirm Reject'}
                            </button>
                            <button style={styles.btnGhost}
                                onClick={() => { setModal(null); setRemarks('') }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const styles = {
    page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { marginBottom: '1.5rem' },
    title: { fontSize: '1.6rem', fontWeight: '700', color: '#f1f5f9' },
    subtitle: { fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' },
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
    nameCell: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    avatar: {
        width: '32px', height: '32px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.8rem', fontWeight: '700', color: 'white', flexShrink: 0
    },
    name: { color: '#f1f5f9', fontWeight: '500' },
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
    actions: { display: 'flex', gap: '0.5rem' },
    btnApprove: {
        padding: '0.3rem 0.75rem',
        background: 'rgba(34,197,94,0.15)', color: '#22c55e',
        border: '1px solid rgba(34,197,94,0.3)',
        borderRadius: '6px', cursor: 'pointer',
        fontSize: '0.8rem', fontFamily: 'Inter, sans-serif'
    },
    btnReject: {
        padding: '0.3rem 0.75rem',
        background: 'rgba(239,68,68,0.15)', color: '#ef4444',
        border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '6px', cursor: 'pointer',
        fontSize: '0.8rem', fontFamily: 'Inter, sans-serif'
    },
    overlay: {
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 1000
    },
    modalCard: {
        background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '480px'
    },
    modalTitle: { fontSize: '1.2rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.5rem' },
    modalDesc: { fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' },
    formGroup: { marginBottom: '1.25rem' },
    label: {
        display: 'block', fontSize: '0.8rem', fontWeight: '500',
        color: '#94a3b8', textTransform: 'uppercase',
        letterSpacing: '0.05em', marginBottom: '0.5rem'
    },
    required: { color: '#ef4444' },
    textarea: {
        width: '100%', background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', padding: '0.7rem 1rem',
        color: '#f1f5f9', fontSize: '0.92rem',
        fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'vertical'
    },
    modalActions: { display: 'flex', gap: '0.75rem' },
    btnGhost: {
        padding: '0.65rem 1.25rem', background: 'transparent',
        color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', cursor: 'pointer',
        fontSize: '0.9rem', fontFamily: 'Inter, sans-serif'
    }
}