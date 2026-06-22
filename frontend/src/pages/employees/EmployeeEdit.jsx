import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/axios'

export default function EmployeeEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        fullName: '', email: '', department: '',
        joiningDate: '', status: 'Active'
    })

    useEffect(() => {
        api.get(`/api/employees/${id}`)
            .then(res => {
                const e = res.data
                setForm({
                    fullName: e.fullName || '',
                    email: e.email || '',
                    department: e.department || '',
                    joiningDate: e.joiningDate?.split('T')[0] || '',
                    status: e.status || 'Active'
                })
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [id])

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        setSaving(true)
        setError('')
        try {
            await api.put(`/api/employees/${id}`, form)
            navigate('/employees')
        } catch (err) {
            setError(err.response?.data?.error || 'Error updating employee')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div style={styles.loading}>Loading...</div>

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Edit Employee</h1>
                    <p style={styles.subtitle}>Update employee information</p>
                </div>
                <button style={styles.btnGhost} onClick={() => navigate('/employees')}>
                    ← Back
                </button>
            </div>

            <div style={styles.card}>
                {error && <div style={styles.errorAlert}>⚠️ {error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.grid2}>
                        {[
                            { label: 'Full Name', name: 'fullName' },
                            { label: 'Email', name: 'email', type: 'email' },
                            { label: 'Department', name: 'department' },
                            { label: 'Joining Date', name: 'joiningDate', type: 'date' },
                        ].map(field => (
                            <div key={field.name} style={styles.formGroup}>
                                <label style={styles.label}>{field.label}</label>
                                <input
                                    type={field.type || 'text'}
                                    name={field.name}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                    onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                                />
                            </div>
                        ))}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Status</label>
                            <select name="status" value={form.status}
                                onChange={handleChange} style={styles.input}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div style={styles.formActions}>
                        <button type="submit" disabled={saving} style={styles.btnPrimary}>
                            {saving ? 'Saving...' : 'Update Employee'}
                        </button>
                        <button type="button" style={styles.btnGhost}
                            onClick={() => navigate('/employees')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const styles = {
    page: { padding: '2rem', maxWidth: '900px', margin: '0 auto' },
    loading: { color: '#94a3b8', padding: '2rem', textAlign: 'center' },
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
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem'
    },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
    label: {
        fontSize: '0.8rem', fontWeight: '500', color: '#94a3b8',
        textTransform: 'uppercase', letterSpacing: '0.05em'
    },
    input: {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', padding: '0.7rem 1rem',
        color: '#f1f5f9', fontSize: '0.92rem',
        fontFamily: 'Inter, sans-serif', outline: 'none',
        transition: 'border-color 0.2s', width: '100%'
    },
    formActions: { display: 'flex', gap: '0.75rem', marginTop: '2rem' },
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