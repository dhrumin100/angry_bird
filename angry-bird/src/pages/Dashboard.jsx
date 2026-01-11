import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
    Camera,
    FileText,
    BarChart3,
    ArrowRight,
    Clock,
    CheckCircle,
    Loader2,
    Award,
    Shield,
    Trophy,
    Star,
    Target,
    Users
} from 'lucide-react'

// Mock achievements data
const AVAILABLE_BADGES = [
    { id: 'first_report', name: 'First Report', icon: '🌟', description: 'Submit your first issue', earned: true },
    { id: '10_reports', name: '10 Reports', icon: '🔥', description: 'Submit 10 reports', earned: true },
    { id: 'local_hero', name: 'Local Hero', icon: '📍', description: 'Report in 5+ areas', earned: true },
    { id: '50_reports', name: '50 Reports', icon: '💪', description: 'Submit 50 reports', earned: false },
    { id: 'top_10', name: 'Top 10%', icon: '🏆', description: 'Reach top 10% rank', earned: false },
    { id: 'city_guardian', name: 'City Guardian', icon: '🌍', description: '1% city contribution', earned: false },
]

function Dashboard() {
    const { user, submissions } = useAuth()
    const navigate = useNavigate()

    // Calculate stats from submissions
    const stats = {
        total: submissions?.length || 0,
        pending: submissions?.filter(s => s.status === 'Pending' || s.status === 'Under Review').length || 0,
        resolved: submissions?.filter(s => s.status === 'Resolved').length || 0,
        xp: user?.karmaPoints || 1247
    }

    // Calculate level and progress
    const getLevelInfo = (xp) => {
        if (xp >= 10000) return { level: 'Diamond', next: null, progress: 100, color: '#00d4ff' }
        if (xp >= 5001) return { level: 'Platinum', next: 'Diamond', progress: ((xp - 5001) / 4999) * 100, pointsToNext: 10000 - xp, color: '#a8a8a8' }
        if (xp >= 2001) return { level: 'Gold', next: 'Platinum', progress: ((xp - 2001) / 3000) * 100, pointsToNext: 5001 - xp, color: '#FFD700' }
        if (xp >= 501) return { level: 'Silver', next: 'Gold', progress: ((xp - 501) / 1500) * 100, pointsToNext: 2001 - xp, color: '#C0C0C0' }
        return { level: 'Bronze', next: 'Silver', progress: (xp / 500) * 100, pointsToNext: 501 - xp, color: '#CD7F32' }
    }

    const levelInfo = getLevelInfo(stats.xp)

    // Get recent submissions (last 3)
    const recentSubmissions = submissions?.slice(0, 3) || []

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Resolved':
                return <CheckCircle size={14} style={{ color: '#059669' }} />
            case 'Under Review':
                return <Loader2 size={14} style={{ color: '#d97706' }} />
            default:
                return <Clock size={14} style={{ color: 'var(--color-primary)' }} />
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Resolved':
                return '#059669'
            case 'Under Review':
                return '#d97706'
            default:
                return 'var(--color-primary)'
        }
    }

    return (
        <main style={{ minHeight: '100vh', background: 'var(--color-bg-gradient)', paddingTop: '5rem', paddingBottom: '2rem' }}>
            <div className="container">
                {/* Welcome Header with Main CTA */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '1.5rem' 
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: '0.25rem' }}>
                            Welcome, {user?.name?.split(' ')[0] || 'User'} 👋
                        </h1>
                        <p style={{ color: 'var(--color-text-medium)', fontSize: '0.9rem' }}>
                            You've reported {stats.total} issues • Keep making {user?.city || 'your city'} safer!
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate('/detect')}
                        style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.625rem 1.25rem', 
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px', 
                            fontWeight: '600', 
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <Camera size={18} />
                        Report Issue
                    </button>
                </div>

                {/* Admin Panel Link - Only for admins */}
                {user?.role === 'admin' && (
                    <div style={{ marginBottom: '1rem' }}>
                        <Link to="/admin" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(124, 58, 237, 0.1)',
                            color: '#7c3aed',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            textDecoration: 'none'
                        }}>
                            <Shield size={16} />
                            Access Admin Panel
                        </Link>
                    </div>
                )}

                {/* Stats Grid - Compact */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {/* Civic Score */}
                    <div className="card" style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--color-primary) 0%, #E55A28 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Star size={20} color="white" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Civic Score</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)' }}>{stats.xp.toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: '600', color: levelInfo.color }}>{levelInfo.level}</span>
                                {levelInfo.next && <span style={{ fontSize: '0.7rem', color: 'var(--color-text-light)' }}>{levelInfo.pointsToNext} to {levelInfo.next}</span>}
                            </div>
                            <div style={{ height: '4px', background: 'rgba(0,0,0,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: `${levelInfo.progress}%`, height: '100%', background: `linear-gradient(90deg, ${levelInfo.color} 0%, var(--color-primary) 100%)`, borderRadius: '2px' }} />
                            </div>
                        </div>
                    </div>

                    {/* City Rank */}
                    <div className="card" style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'linear-gradient(135deg, #004E89 0%, #003366 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Trophy size={20} color="white" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>City Rank</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#004E89' }}>#42</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-medium)' }}>
                            <span style={{ color: '#059669', fontWeight: '600' }}>Top 5%</span> in {user?.city || 'Mumbai'}
                        </div>
                    </div>

                    {/* Total Reports */}
                    <div className="card" style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FileText size={20} color="white" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Total Reports</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text-dark)' }}>{stats.total}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                            <span><strong style={{ color: '#059669' }}>{stats.resolved}</strong> Resolved</span>
                            <span><strong style={{ color: '#d97706' }}>{stats.pending}</strong> Pending</span>
                        </div>
                    </div>

                    {/* City Impact */}
                    <div className="card" style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Target size={20} color="white" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>City Impact</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#8b5cf6' }}>0.8%</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-medium)' }}>
                            Helped ~<strong>2,400</strong> commuters daily
                        </div>
                    </div>
                </div>

                {/* Two Column Layout - Activity & Achievements */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    {/* Recent Activity */}
                    <div className="card" style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={16} style={{ color: 'var(--color-primary)' }} />
                                Recent Activity
                            </h3>
                            {stats.total > 0 && (
                                <Link to="/my-reports" style={{ color: 'var(--color-primary)', fontWeight: '500', fontSize: '0.8rem', textDecoration: 'none' }}>
                                    View All
                                </Link>
                            )}
                        </div>

                        {recentSubmissions.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {recentSubmissions.map((submission, index) => (
                                    <div 
                                        key={index}
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'space-between',
                                            padding: '0.625rem',
                                            background: 'var(--color-bg-medium)',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {getStatusIcon(submission.status)}
                                            <div>
                                                <div style={{ fontWeight: '500', color: 'var(--color-text-dark)', fontSize: '0.85rem' }}>
                                                    {submission.issueType || 'Road Issue'}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                                                    {submission.location?.address?.slice(0, 25) || 'Location'}...
                                                </div>
                                            </div>
                                        </div>
                                        <span style={{ 
                                            fontSize: '0.7rem', 
                                            fontWeight: '600', 
                                            padding: '0.2rem 0.5rem', 
                                            borderRadius: '4px',
                                            background: `${getStatusColor(submission.status)}15`,
                                            color: getStatusColor(submission.status)
                                        }}>
                                            {submission.status || 'Pending'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--color-text-light)' }}>
                                <BarChart3 size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                                <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>No reports yet</p>
                                <button onClick={() => navigate('/detect')} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
                                    Start Analysis
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Achievements */}
                    <div className="card" style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Award size={16} style={{ color: 'var(--color-primary)' }} />
                                Achievements
                            </h3>
                            <Link to="/profile" style={{ color: 'var(--color-primary)', fontWeight: '500', fontSize: '0.8rem', textDecoration: 'none' }}>
                                View All
                            </Link>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                            {AVAILABLE_BADGES.map((badge, index) => (
                                <div 
                                    key={index}
                                    style={{ 
                                        textAlign: 'center',
                                        padding: '0.625rem',
                                        background: badge.earned ? 'rgba(255, 107, 53, 0.08)' : 'var(--color-bg-medium)',
                                        borderRadius: '8px',
                                        opacity: badge.earned ? 1 : 0.5
                                    }}
                                    title={badge.description}
                                >
                                    <div style={{ fontSize: '1.25rem', marginBottom: '2px', filter: badge.earned ? 'none' : 'grayscale(100%)' }}>
                                        {badge.earned ? badge.icon : '🔒'}
                                    </div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: '600', color: 'var(--color-text-dark)' }}>
                                        {badge.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions - Simplified to just 2 cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    {/* Track My Reports */}
                    <div 
                        className="card"
                        onClick={() => navigate('/my-reports')}
                        style={{ 
                            padding: '1.25rem', 
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            border: '2px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#10b981'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ 
                                width: '44px', 
                                height: '44px', 
                                borderRadius: '10px', 
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center'
                            }}>
                                <BarChart3 size={22} color="white" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: '0.25rem' }}>
                                    Track My Reports
                                </h3>
                                <p style={{ color: 'var(--color-text-medium)', fontSize: '0.8rem' }}>
                                    View status of {stats.total} submitted reports
                                </p>
                            </div>
                            <ArrowRight size={18} style={{ color: '#10b981' }} />
                        </div>
                    </div>

                    {/* View Leaderboard */}
                    <div 
                        className="card"
                        onClick={() => navigate('/leaderboard')}
                        style={{ 
                            padding: '1.25rem', 
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            border: '2px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#004E89'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ 
                                width: '44px', 
                                height: '44px', 
                                borderRadius: '10px', 
                                background: 'linear-gradient(135deg, #004E89 0%, #003366 100%)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center'
                            }}>
                                <Users size={22} color="white" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: '0.25rem' }}>
                                    Civic Leaderboard
                                </h3>
                                <p style={{ color: 'var(--color-text-medium)', fontSize: '0.8rem' }}>
                                    Compare your rank with other contributors
                                </p>
                            </div>
                            <ArrowRight size={18} style={{ color: '#004E89' }} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard
