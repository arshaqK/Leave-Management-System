import { useState, useEffect } from 'react'
import api from '../../api/axios'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function Reports() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/api/reports')
            .then(res => setData(res.data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div style={styles.loading}>Loading reports...</div>

    const maxDept = Math.max(...(data?.leavesByDepartment?.map(r => r.count) || [1]))
    const maxMonth = Math.max(...(data?.leavesByMonth?.map(r => r.count) || [1]))

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Reports</h1>
                    <p style={styles.subtitle}>Leave analytics and insights</p>
                </div>
            </div>

            <div style={styles.grid2}>
                {/* Leaves by Department */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>📊 Leaves by Department</h2>
                    <div style={styles.chartArea}>
                        {data?.leavesByDepartment?.length === 0 ? (
                            <p style={styles.noData}>No data available</p>
                        ) : data?.leavesByDepartment?.map((row, i) => (
                            <div key={i} style={styles.barRow}>
                                <span style={styles.barLabel}>{row.department}</span>
                                <div style={styles.barTrack}>
                                    <div style={{
                                        ...styles.barFill,
                                        width: `${(row.count / maxDept) * 100}%`,
                                        background: `hsl(${210 + i * 30}, 70%, 60%)`
                                    }} />
                                </div>
                                <span style={styles.barValue}>{row.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leaves by Month */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>📅 Leaves by Month</h2>
                    <div style={styles.chartArea}>
                        {data?.leavesByMonth?.length === 0 ? (
                            <p style={styles.noData}>No data available</p>
                        ) : data?.leavesByMonth?.map((row, i) => (
                            <div key={i} style={styles.barRow}>
                                <span style={styles.barLabel}>{MONTHS[(row.month || 1) - 1]}</span>
                                <div style={styles.barTrack}>
                                    <div style={{
                                        ...styles.barFill,
                                        width: `${(row.count / maxMonth) * 100}%`,
                                        background: '#3b82f6'
                                    }} />
                                </div>
                                <span style={styles.barValue}>{row.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Employees */}
            <div style={styles.card}>
                <h2 style={styles.cardTitle}>🏆 Top Employees by Leave Usage</h2>
                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thead}>
                                <th style={styles.th}>#</th>
                                <th style={styles.th}>Employee</th>
                                <th style={styles.th}>Department</th>
                                <th style={styles.th}>Total Leaves</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.topEmployees?.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={styles.empty}>No data available</td>
                                </tr>
                            ) : data?.topEmployees?.map((row, i) => (
                                <tr key={i} style={styles.tr}>
                                    <td style={styles.td}>
                                        <span style={{
                                            ...styles.rank,
                                            background: i === 0 ? 'rgba(245,158,11,0.2)' :
                                                i === 1 ? 'rgba(148,163,184,0.2)' :
                                                    i === 2 ? 'rgba(180,120,60,0.2)' : 'rgba(255,255,255,0.05)',
                                            color: i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : i === 2 ? '#b47c3c' : '#475569'
                                        }}>
                                            {i + 1}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.nameCell}>
                                            <div style={styles.avatar}>
                                                {row.fullName?.[0]?.toUpperCase()}
                                            </div>
                                            <span style={styles.name}>{row.fullName}</span>
                                        </div>
                                    </td>
                                    <td style={styles.td}>{row.department}</td>
                                    <td style={styles.td}>
                                        <span style={styles.countBadge}>{row.count} leaves</span>
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
    header: { marginBottom: '1.5rem' },
    title: { fontSize: '1.6rem', fontWeight: '700', color: '#f1f5f9' },
    subtitle: { fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' },
    grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' },
    card: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', padding: '1.5rem', marginBottom: '1.25rem'
    },
    cardTitle: { fontSize: '1rem', fontWeight: '600', color: '#f1f5f9', marginBottom: '1.5rem' },
    chartArea: { display: 'flex', flexDirection: 'column', gap: '0.85rem' },
    barRow: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    barLabel: { fontSize: '0.82rem', color: '#94a3b8', width: '100px', flexShrink: 0, textAlign: 'right' },
    barTrack: { flex: 1, height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' },
    barFill: { height: '100%', borderRadius: '4px', transition: 'width 0.5s ease' },
    barValue: { fontSize: '0.82rem', color: '#64748b', width: '30px', textAlign: 'right' },
    noData: { color: '#475569', fontSize: '0.9rem', textAlign: 'center', padding: '1rem 0' },
    tableWrapper: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse' },
    thead: { borderBottom: '1px solid rgba(255,255,255,0.08)' },
    th: {
        padding: '0.75rem 1rem', textAlign: 'left',
        fontSize: '0.75rem', fontWeight: '600',
        textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569'
    },
    tr: { borderBottom: '1px solid rgba(255,255,255,0.05)' },
    td: { padding: '0.85rem 1rem', fontSize: '0.88rem', color: '#94a3b8' },
    empty: { padding: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.9rem' },
    rank: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', fontSize: '0.82rem', fontWeight: '700' },
    nameCell: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    avatar: {
        width: '32px', height: '32px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.8rem', fontWeight: '700', color: 'white', flexShrink: 0
    },
    name: { color: '#f1f5f9', fontWeight: '500' },
    countBadge: {
        background: 'rgba(59,130,246,0.15)', color: '#3b82f6',
        border: '1px solid rgba(59,130,246,0.3)',
        padding: '0.2rem 0.65rem', borderRadius: '999px',
        fontSize: '0.78rem', fontWeight: '600'
    }
}