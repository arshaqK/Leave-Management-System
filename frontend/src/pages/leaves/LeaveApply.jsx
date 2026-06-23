import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

export default function LeaveApply() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        leaveType: '', startDate: '', endDate: '', reason: ''
    })

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        if (form.reason.length < 10) {
            setError('Reason must be at least 10 characters')
            return
        }
        if (new Date(form.endDate) < new Date(form.startDate)) {
            setError('End date cannot be before start date')
            return
        }
        setLoading(true)
        setError('')
        try {
            await api.post('/api/leaves', form)
            navigate('/leaves')
        } catch (err) {
            setError(err.response?.data?.error || 'Error submitting leave request')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Apply for Leave</h1>
                    <p style={styles.subtitle}>Submit a new leave request</p>
                </div>
                <button style={styles.btnGhost} onClick={() => navigate('/leaves')}>
                    ← Back
                </button>
            </div>

            <div style={styles.card}>
                {error && <div style={styles.errorAlert}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Leave Type</label>
                        <select name="leaveType" value={form.leaveType}
                            onChange={handleChange} required style={{ ...styles.input, background: '#1a365d', color: '#ffffff' }}>
                            <option value="" style={{ background: '#1a365d', color: '#ffffff' }}>— Select type —</option>
                            <option value="Annual" style={{ background: '#1a365d', color: '#ffffff' }}>Annual</option>
                            <option value="Sick" style={{ background: '#1a365d', color: '#ffffff' }}>Sick</option>
                            <option value="Casual" style={{ background: '#1a365d', color: '#ffffff' }}>Casual</option>
                        </select>
                    </div>

                    <div style={styles.grid2}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Start Date</label>
                            <input type="date" name="startDate" value={form.startDate}
                                onChange={handleChange} required style={styles.input}
                                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>End Date</label>
                            <input type="date" name="endDate" value={form.endDate}
                                onChange={handleChange} required style={styles.input}
                                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Reason <span style={styles.hint}>min 10 characters</span>
                        </label>
                        <textarea name="reason" value={form.reason}
                            onChange={handleChange} required rows={5}
                            placeholder="Please provide a reason for your leave request..."
                            style={{ ...styles.input, resize: 'vertical', minHeight: '120px' }}
                            onFocus={e => e.target.style.borderColor = '#3b82f6'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                        <span style={styles.charCount}>
                            {form.reason.length} characters
                            {form.reason.length < 10 && form.reason.length > 0 &&
                                <span style={styles.charError}> (need {10 - form.reason.length} more)</span>
                            }
                        </span>
                    </div>

                    <div style={styles.formActions}>
                        <button type="submit" disabled={loading} style={styles.btnPrimary}>
                            {loading ? 'Submitting...' : 'Submit Request'}
                        </button>
                        <button type="button" style={styles.btnGhost}
                            onClick={() => navigate('/leaves')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const styles = {
    page: { padding: '2rem', maxWidth: '700px', margin: '0 auto' },
    header: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '1.5rem'
    },
    title: { fontSize: '1.6rem', fontWeight: '700', color: '#f1f5f9' },
    subtitle: { fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' },
    card: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', padding: '2rem'
    },
    errorAlert: {
        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
        color: '#fca5a5', borderRadius: '8px', padding: '0.75rem 1rem',
        fontSize: '0.88rem', marginBottom: '1.5rem'
    },
    grid2: {
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem'
    },
    formGroup: { marginBottom: '1.25rem' },
    label: {
        display: 'block', fontSize: '0.8rem', fontWeight: '500',
        color: '#94a3b8', textTransform: 'uppercase',
        letterSpacing: '0.05em', marginBottom: '0.5rem'
    },
    hint: {
        textTransform: 'none', fontSize: '0.75rem',
        color: '#475569', marginLeft: '0.5rem'
    },
    input: {
        width: '100%', background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', padding: '0.7rem 1rem',
        color: '#f1f5f9', fontSize: '0.92rem',
        fontFamily: 'Inter, sans-serif', outline: 'none',
        transition: 'border-color 0.2s'
    },
    charCount: { fontSize: '0.78rem', color: '#475569', marginTop: '0.35rem', display: 'block' },
    charError: { color: '#ef4444' },
    formActions: { display: 'flex', gap: '0.75rem', marginTop: '1.5rem' },
    btnPrimary: {
        padding: '0.65rem 1.5rem', background: '#3b82f6', color: 'white',
        border: 'none', borderRadius: '8px', cursor: 'pointer',
        fontSize: '0.9rem', fontWeight: '500', fontFamily: 'Inter, sans-serif'
    },
    btnGhost: {
        padding: '0.65rem 1.25rem', background: 'transparent',
        color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', cursor: 'pointer',
        fontSize: '0.9rem', fontFamily: 'Inter, sans-serif'
    }
}