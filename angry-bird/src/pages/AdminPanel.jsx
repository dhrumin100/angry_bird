import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
    CheckCircle,
    XCircle,
    Clock,
    Filter,
    MapPin,
    Calendar,
    User,
    ChevronDown,
    ChevronUp
} from 'lucide-react'

function AdminPanel() {
    const { submissions, updateSubmissionStatus } = useAuth()
    const [filter, setFilter] = useState('All')
    const [expandedId, setExpandedId] = useState(null)

    const filteredSubmissions = submissions?.filter(s => {
        if (filter === 'All') return true
        return s.status === filter
    }) || []

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id)
    }

    const handleStatusChange = (id, newStatus) => {
        updateSubmissionStatus(id, newStatus)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Resolved': return 'text-success'
            case 'Rejected': return 'text-danger' // Assuming you have this or red
            case 'Under Review': return 'text-warning'
            default: return 'text-primary'
        }
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--color-bg-light)', paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-dark)' }}>Admin Dashboard</h1>
                        <p style={{ color: 'var(--color-text-medium)' }}>Manage reported issues and track resolution</p>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                        {['All', 'Pending', 'Under Review', 'Resolved', 'Rejected'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`btn ${filter === status ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    {filteredSubmissions.length > 0 ? (
                        filteredSubmissions.map((report) => (
                            <div key={report.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                                <div 
                                    style={{ 
                                        padding: 'var(--space-lg)', 
                                        display: 'grid', 
                                        gridTemplateColumns: 'minmax(80px, 100px) 1fr auto', 
                                        gap: 'var(--space-lg)',
                                        alignItems: 'start',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => toggleExpand(report.id)}
                                >
                                    {/* Image */}
                                    <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#f1f5f9' }}>
                                        {report.image ? (
                                            <img src={report.image} alt="Report" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>No Img</div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xs)' }}>
                                            <span style={{ 
                                                fontSize: '0.75rem', fontWeight: '600', padding: '0.15rem 0.5rem', borderRadius: '4px',
                                                background: report.severity === 'High' ? '#fee2e2' : report.severity === 'Medium' ? '#ffedd5' : '#dcfce7',
                                                color: report.severity === 'High' ? '#dc2626' : report.severity === 'Medium' ? '#d97706' : '#16a34a'
                                            }}>
                                                {report.severity} Severity
                                            </span>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-light)', border: '1px solid var(--color-border)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                                                {report.issueType}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-xs)' }}>
                                            {report.subCategory || 'Road Issue'}
                                        </h3>
                                        <div style={{ display: 'flex', gap: 'var(--space-lg)', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14}/> {report.location?.address?.slice(0, 40) || 'No location'}...</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14}/> {report.userId}</span>
                                        </div>
                                    </div>

                                    {/* Status & Action */}
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--space-xs)', marginBottom: 'var(--space-sm)' }}>
                                            <span className={getStatusColor(report.status)} style={{ fontWeight: '600' }}>{report.status}</span>
                                            {expandedId === report.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                                            {new Date(report.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedId === report.id && (
                                    <div style={{ 
                                        padding: 'var(--space-lg)', 
                                        borderTop: '1px solid var(--color-border)', 
                                        background: '#fafafa',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 300px',
                                        gap: 'var(--space-lg)'
                                    }}>
                                        <div>
                                            <h4 style={{ marginBottom: 'var(--space-xs)', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Full Description</h4>
                                            <p style={{ color: 'var(--color-text-dark)', marginBottom: 'var(--space-lg)', lineHeight: '1.6' }}>
                                                {report.description || 'No description provided.'}
                                            </p>
                                            
                                            <h4 style={{ marginBottom: 'var(--space-xs)', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Location Details</h4>
                                            <p style={{ color: 'var(--color-text-dark)', marginBottom: 'var(--space-sm)' }}>
                                                {report.location?.address || 'N/A'}
                                            </p>
                                            <div style={{ display: 'flex', gap: 'var(--space-md)', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>
                                                <span>Lat: {report.location?.lat}</span>
                                                <span>Lng: {report.location?.lng}</span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Update Status</h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleStatusChange(report.id, 'Resolved'); }}
                                                    className="btn"
                                                    style={{ background: '#dcfce7', color: '#16a34a', border: 'none', justifyContent: 'center' }}
                                                >
                                                    <CheckCircle size={16} /> Resolve
                                                </button>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleStatusChange(report.id, 'Rejected'); }}
                                                    className="btn"
                                                    style={{ background: '#fee2e2', color: '#dc2626', border: 'none', justifyContent: 'center' }}
                                                >
                                                    <XCircle size={16} /> Reject
                                                </button>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleStatusChange(report.id, 'Under Review'); }}
                                                    className="btn"
                                                    style={{ background: '#ffedd5', color: '#d97706', border: 'none', justifyContent: 'center' }}
                                                >
                                                    <Clock size={16} /> Review
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-light)' }}>
                            No reports found with status "{filter}"
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default AdminPanel
