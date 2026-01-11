import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
    Clock,
    CheckCircle,
    Loader2,
    MapPin,
    AlertTriangle,
    ArrowLeft,
    Eye,
    Filter,
    Calendar
} from 'lucide-react'

function MyReports() {
    const { submissions, user } = useAuth()
    
    // Filter reports for the current user
    const userReports = submissions?.filter(s => s.userId === user?.id) || []


    const getStatusIcon = (status) => {
        switch (status) {
            case 'Resolved':
                return <CheckCircle size={18} className="text-success" />
            case 'Under Review':
                return <Loader2 size={18} className="text-warning" />
            default:
                return <Clock size={18} className="text-primary" />
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Resolved':
                return { bg: 'rgba(16, 185, 129, 0.15)', text: '#059669' }
            case 'Under Review':
                return { bg: 'rgba(245, 158, 11, 0.15)', text: '#d97706' }
            default:
                return { bg: 'rgba(255, 107, 53, 0.15)', text: 'var(--color-primary-dark)' }
        }
    }

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'High':
                return { bg: 'rgba(239, 68, 68, 0.15)', text: '#dc2626' }
            case 'Medium':
                return { bg: 'rgba(245, 158, 11, 0.15)', text: '#d97706' }
            default:
                return { bg: 'rgba(34, 197, 94, 0.15)', text: '#16a34a' }
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--color-bg-gradient)', paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
            <div className="container">
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                    <div>
                        <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-text-medium)', textDecoration: 'none', marginBottom: 'var(--space-sm)' }}>
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </Link>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-dark)' }}>
                            My Reports
                        </h1>
                        <p style={{ color: 'var(--color-text-medium)', marginTop: 'var(--space-xs)' }}>
                            Track the status of all your submitted reports
                        </p>
                    </div>
                    <Link to="/detect" className="btn btn-primary">
                        + New Report
                    </Link>
                </div>

                {/* Stats Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                    <div className="card" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-dark)' }}>
                            {userReports.length || 0}

                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Total Reports</div>
                    </div>
                    <div className="card" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#d97706' }}>
                            {userReports.filter(s => s.status === 'Pending' || s.status === 'Under Review').length || 0}

                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>In Progress</div>
                    </div>
                    <div className="card" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#059669' }}>
                            {userReports.filter(s => s.status === 'Resolved').length || 0}

                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Resolved</div>
                    </div>
                </div>

                {/* Reports List */}
                {userReports && userReports.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {userReports.map((report, index) => {

                            const statusColors = getStatusColor(report.status)
                            const severityColors = getSeverityColor(report.severity)
                            
                            return (
                                <div 
                                    key={index}
                                    className="card"
                                    style={{ 
                                        padding: 'var(--space-lg)',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr auto',
                                        gap: 'var(--space-lg)',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div>
                                        {/* Report Header */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)', flexWrap: 'wrap' }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-dark)', margin: 0 }}>
                                                {report.issueType || 'Road Issue'}
                                            </h3>
                                            <span style={{ 
                                                fontSize: '0.75rem', 
                                                fontWeight: '600', 
                                                padding: '0.25rem 0.75rem', 
                                                borderRadius: 'var(--radius-full)',
                                                background: severityColors.bg,
                                                color: severityColors.text
                                            }}>
                                                {report.severity || 'Medium'} Severity
                                            </span>
                                            <span style={{ 
                                                fontSize: '0.75rem', 
                                                fontWeight: '600', 
                                                padding: '0.25rem 0.75rem', 
                                                borderRadius: 'var(--radius-full)',
                                                background: statusColors.bg,
                                                color: statusColors.text,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem'
                                            }}>
                                                {getStatusIcon(report.status)}
                                                {report.status || 'Pending'}
                                            </span>
                                        </div>

                                        {/* Report Details */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-text-medium)', fontSize: '0.9rem' }}>
                                                <MapPin size={14} />
                                                {report.location?.address || 'Location not specified'}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                                                <Calendar size={14} />
                                                Reported on {formatDate(report.timestamp)}
                                            </div>
                                            {report.description && (
                                                <p style={{ color: 'var(--color-text-medium)', fontSize: '0.9rem', marginTop: 'var(--space-xs)' }}>
                                                    "{report.description.slice(0, 100)}{report.description.length > 100 ? '...' : ''}"
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Report Image Thumbnail */}
                                    {report.image && (
                                        <div style={{ 
                                            width: '100px', 
                                            height: '100px', 
                                            borderRadius: 'var(--radius-md)',
                                            overflow: 'hidden',
                                            flexShrink: 0
                                        }}>
                                            <img 
                                                src={report.image} 
                                                alt="Report" 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
                        <AlertTriangle size={48} style={{ color: 'var(--color-text-light)', marginBottom: 'var(--space-md)' }} />
                        <h3 style={{ color: 'var(--color-text-dark)', marginBottom: 'var(--space-sm)' }}>No Reports Yet</h3>
                        <p style={{ color: 'var(--color-text-medium)', marginBottom: 'var(--space-lg)' }}>
                            Start by analyzing a road image to create your first report.
                        </p>
                        <Link to="/detect" className="btn btn-primary">
                            Analyze Road Image
                        </Link>
                    </div>
                )}
            </div>
        </main>
    )
}

export default MyReports
