import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

export default function EmployeeList() {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/api/employees')
            .then(res => setEmployees(res.data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const handleDeactivate = async (id) => {
        if (!window.confirm('Deactivate this employee?')) return
        try {
            await api.delete(`/api/employees/${id}`)
            setEmployees(employees.map(e =>
                e.id === id ? { ...e, status: 'Inactive' } : e
            ))
        } catch (err) {
            alert('Error deactivating employee')
        }
    }

    const filtered = employees.filter(e =>
        e.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        e.department?.toLowerCase().includes(search.toLowerCase()) ||
        e.employeeId?.toLowerCase().includes(search.toLowerCase())
    )

    const statusBadge = (status) => ({
        display: 'inline-flex', alignItems: 'center',
        padding: '0.2rem 0.65rem', borderRadius: '999px',
        fontSize: '0.75rem', fontWeight: '600',
        background: status === 'Active' ? 'rgba(34,197,94,0.15)' : 'rgba(100,116,139,0.15)',
        color: status === 'Active' ? '#22c55e' : '#94a3b8',
        border: `1px solid ${status === 'Active' ? 'rgba(34,197,94,0.3)' : 'rgba(100,116,139,0.3)'}`
    })

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Employees</h1>
                    <p style={styles.subtitle}>{employees.length} total employees</p>
                </div>
                <button style={styles.btnPrimary} onClick={() => navigate('/employees/create')}>
                    + Add Employee
                </button>
            </div>

            <div style={styles.toolbar}>
                <input
                    type="text"
                    placeholder="Search by name, department, ID..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.tableWrapper}>
                {loading ? (
                    <div style={styles.empty}>Loading...</div>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thead}>
                                <th style={styles.th}>Employee ID</th>
                                <th style={styles.th}>Full Name</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Department</th>
                                <th style={styles.th}>Joining Date</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={styles.empty}>No employees found</td>
                                </tr>
                            ) : filtered.map(emp => (
                                <tr key={emp.id} style={styles.tr}>
                                    <td style={styles.td}>
                                        <span style={styles.empId}>{emp.employeeId}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.nameCell}>
                                            <div style={styles.avatar}>
                                                {emp.fullName?.[0]?.toUpperCase()}
                                            </div>
                                            <span style={styles.name}>{emp.fullName}</span>
                                        </div>
                                    </td>
                                    <td style={styles.td}>{emp.email}</td>
                                    <td style={styles.td}>{emp.department}</td>
                                    <td style={styles.td}>{emp.joiningDate?.split('T')[0]}</td>
                                    <td style={styles.td}>
                                        <span style={statusBadge(emp.status)}>{emp.status}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.actions}>
                                            <button style={styles.btnEdit}
                                                onClick={() => navigate(`/employees/edit/${emp.id}`)}>
                                                Edit
                                            </button>
                                            {emp.status === 'Active' && (
                                                <button style={styles.btnDeactivate}
                                                    onClick={() => handleDeactivate(emp.id)}>
                                                    Deactivate
                                                </button>
                                            )}
                                        </div>
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
    toolbar: { marginBottom: '1rem' },
    searchInput: {
        width: '100%', maxWidth: '380px',
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
        fontSize: '0.75rem', fontWeight: '600',
        textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569'
    },
    tr: { borderBottom: '1px solid rgba(255,255,255,0.05)' },
    td: { padding: '0.9rem 1rem', fontSize: '0.88rem', color: '#94a3b8' },
    empty: { padding: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.9rem' },
    empId: {
        fontFamily: 'monospace', fontSize: '0.82rem',
        color: '#64748b', background: 'rgba(255,255,255,0.05)',
        padding: '0.2rem 0.5rem', borderRadius: '4px'
    },
    nameCell: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    avatar: {
        width: '32px', height: '32px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.8rem', fontWeight: '700', color: 'white', flexShrink: 0
    },
    name: { color: '#f1f5f9', fontWeight: '500' },
    actions: { display: 'flex', gap: '0.5rem' },
    btnEdit: {
        padding: '0.3rem 0.75rem',
        background: 'rgba(59,130,246,0.15)',
        color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)',
        borderRadius: '6px', cursor: 'pointer',
        fontSize: '0.8rem', fontFamily: 'Inter, sans-serif'
    },
    btnDeactivate: {
        padding: '0.3rem 0.75rem',
        background: 'rgba(239,68,68,0.15)',
        color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '6px', cursor: 'pointer',
        fontSize: '0.8rem', fontFamily: 'Inter, sans-serif'
    }
}