import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import {
    User,
    Mail,
    Calendar,
    Award,
    Edit3,
    Save,
    X,
    Shield,
    TrendingUp,
    MapPin,
    Phone,
    Clock,
    CheckCircle,
    FileText,
    Settings,
    Bell,
    Eye,
    Lock,
    Trash2,
    Download,
    Star,
    Trophy,
    Target,
    Flame
} from 'lucide-react'

// Mock activity data
const MOCK_ACTIVITY = [
    { type: 'report', text: 'Submitted report #KVH-2025-0412', subtext: 'Pothole, High severity', time: '2 hours ago', icon: '📸' },
    { type: 'resolved', text: 'Report #KVH-2025-0401 marked as Resolved', subtext: 'MG Road, Mumbai', time: 'Yesterday, 5:00 PM', icon: '✅' },
    { type: 'badge', text: 'Earned badge "🔥 10 Reports Streak"', subtext: 'Keep up the great work!', time: 'Yesterday, 3:45 PM', icon: '🏆' },
    { type: 'report', text: 'Submitted report #KVH-2025-0398', subtext: 'Road Damage, Medium severity', time: '2 days ago', icon: '📸' },
    { type: 'points', text: 'Earned +50 XP for verified report', subtext: 'Civic Score: 1,247', time: '3 days ago', icon: '⭐' },
    { type: 'report', text: 'Submitted report #KVH-2025-0385', subtext: 'Waterlogging, Low severity', time: '5 days ago', icon: '📸' },
]

// Mock achievements
const ALL_BADGES = [
    { id: 'first_report', name: 'First Report', icon: '🌟', description: 'Submit your first civic issue', earned: true, earnedDate: 'Jan 5, 2025' },
    { id: '10_reports', name: '10 Reports', icon: '🔥', description: 'Submit 10 civic reports', earned: true, earnedDate: 'Jan 9, 2025' },
    { id: 'local_hero', name: 'Local Hero', icon: '📍', description: 'Report issues in 5+ different areas', earned: true, earnedDate: 'Jan 10, 2025' },
    { id: '50_reports', name: '50 Reports', icon: '💪', description: 'Submit 50 civic reports', earned: false, progress: 23/50 },
    { id: 'speed_reporter', name: 'Speed Reporter', icon: '⚡', description: 'Report 5 issues in a single day', earned: false, progress: 2/5 },
    { id: 'top_10', name: 'Top 10%', icon: '🏆', description: 'Reach the top 10% of contributors', earned: false, progress: 0.85 },
    { id: '100_reports', name: 'Century', icon: '💯', description: 'Submit 100 civic reports', earned: false, progress: 23/100 },
    { id: 'city_guardian', name: 'City Guardian', icon: '🌍', description: 'Contribute to 1% of city issues', earned: false, progress: 0.8 },
    { id: 'streak_30', name: '30-Day Streak', icon: '🔥', description: 'Report daily for 30 days', earned: false, progress: 12/30 },
]

// Levels
const LEVELS = [
    { name: 'Bronze', min: 0, max: 500, color: '#CD7F32' },
    { name: 'Silver', min: 501, max: 2000, color: '#C0C0C0' },
    { name: 'Gold', min: 2001, max: 5000, color: '#FFD700' },
    { name: 'Platinum', min: 5001, max: 10000, color: '#a8a8a8' },
    { name: 'Diamond', min: 10001, max: Infinity, color: '#00d4ff' },
]

function Profile() {
    const { user, updateUser, submissions } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [editedName, setEditedName] = useState(user?.name || '')
    const [activeTab, setActiveTab] = useState('overview') // overview, activity, achievements, settings

    // Settings state
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsUpdates: false,
        weeklyDigest: true,
        rankAlerts: true,
        showOnLeaderboard: true,
        allowFeatured: true
    })

    const handleSave = async () => {
        try {
            // Call API to update user
            const response = await import('../services/api').then(module => module.default.put('/auth/profile', {
                name: editedName.trim(),
                // Assuming email, phone, city are not editable from this specific form,
                // or would require separate state variables if they were.
                // For now, only name is updated based on the current component's state.
            }));
            
            if (response.data) {
                // Update local context/state if needed
                updateUser({ name: editedName.trim() }); // Update context with new name
                alert('Profile updated successfully!');
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    }

    const getLevelInfo = (xp) => {
        const currentLevel = LEVELS.find(l => xp >= l.min && xp <= l.max) || LEVELS[0]
        const nextLevel = LEVELS[LEVELS.indexOf(currentLevel) + 1]
        const progress = nextLevel 
            ? ((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
            : 100
        return { current: currentLevel, next: nextLevel, progress }
    }

    const userXp = user?.karmaPoints || 1247
    const levelInfo = getLevelInfo(userXp)

    // Stats calculation
    const stats = {
        total: submissions?.length || 23,
        resolved: submissions?.filter(s => s.status === 'Resolved').length || 18,
        pending: submissions?.filter(s => s.status !== 'Resolved').length || 5,
        rank: 42,
        percentile: 5
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <User size={16} /> },
        { id: 'activity', label: 'Activity', icon: <Clock size={16} /> },
        { id: 'achievements', label: 'Achievements', icon: <Award size={16} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
    ]

    return (
        <main style={{ minHeight: '100vh', background: 'var(--color-bg-gradient)', paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)', alignItems: 'start' }}>
                    {/* Left Sidebar - Profile Card */}
                    <div className="card" style={{ padding: 'var(--space-xl)', position: 'sticky', top: 'var(--space-xl)' }}>
                        {/* Avatar */}
                        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                            <div style={{ 
                                width: '100px', 
                                height: '100px', 
                                borderRadius: '50%', 
                                background: `linear-gradient(135deg, var(--color-primary) 0%, #004E89 100%)`,
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                margin: '0 auto var(--space-md)',
                                fontSize: '2rem',
                                fontWeight: '700',
                                color: 'white',
                                boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)'
                            }}>
                                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                            </div>

                            {isEditing ? (
                                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', justifyContent: 'center' }}>
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        className="input"
                                        style={{ padding: 'var(--space-sm)', fontSize: '1rem', width: '150px' }}
                                    />
                                    <button onClick={handleSave} style={{ padding: '6px', background: '#059669', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                                        <Save size={16} color="white" />
                                    </button>
                                    <button onClick={() => setIsEditing(false)} style={{ padding: '6px', background: '#dc2626', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                                        <X size={16} color="white" />
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-sm)' }}>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-text-dark)' }}>{user?.name || 'User'}</h2>
                                    <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-light)', padding: '4px' }}>
                                        <Edit3 size={14} />
                                    </button>
                                </div>
                            )}

                            {/* Level Badge */}
                            <div style={{ 
                                display: 'inline-block', 
                                marginTop: 'var(--space-sm)',
                                padding: '4px 12px', 
                                background: `linear-gradient(135deg, ${levelInfo.current.color} 0%, ${levelInfo.current.color}99 100%)`, 
                                borderRadius: 'var(--radius-full)',
                                color: 'white',
                                fontWeight: '600',
                                fontSize: '0.8rem'
                            }}>
                                {levelInfo.current.name} Level
                            </div>
                        </div>

                        {/* User Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', color: 'var(--color-text-medium)' }}>
                                <Mail size={16} />
                                <span>{user?.email || 'user@example.com'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', color: 'var(--color-text-medium)' }}>
                                <Phone size={16} />
                                <span>{user?.phone || '+91 98765 43210'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', color: 'var(--color-text-medium)' }}>
                                <MapPin size={16} />
                                <span>{user?.city || 'Mumbai, Maharashtra'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', color: 'var(--color-text-medium)' }}>
                                <Calendar size={16} />
                                <span>Joined {user?.joinedDate || 'Jan 2025'}</span>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div style={{ marginTop: 'var(--space-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            <Link to="/detect" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Start New Report
                            </Link>
                            <Link to="/leaderboard" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                                View Leaderboard
                            </Link>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div>
                        {/* Tab Navigation */}
                        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 'var(--space-md)', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-xs)',
                                        padding: 'var(--space-sm) var(--space-md)',
                                        background: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                                        color: activeTab === tab.id ? 'white' : 'var(--color-text-medium)',
                                        border: 'none',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'overview' && (
                            <div>
                                {/* Stats at a Glance */}
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: 'var(--space-lg)', color: 'var(--color-text-dark)' }}>
                                    Your Stats at a Glance
                                </h3>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                                    <div className="card" style={{ padding: 'var(--space-lg)', background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                            <Star size={24} style={{ color: 'var(--color-primary)' }} />
                                            <div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Civic Score</div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>{userXp.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card" style={{ padding: 'var(--space-lg)', background: 'linear-gradient(135deg, rgba(0, 78, 137, 0.1) 0%, rgba(0, 78, 137, 0.05) 100%)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                            <Trophy size={24} style={{ color: '#004E89' }} />
                                            <div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>City Rank</div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#004E89' }}>#{stats.rank}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card" style={{ padding: 'var(--space-lg)', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                            <FileText size={24} style={{ color: '#059669' }} />
                                            <div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Total Reports</div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>{stats.total}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card" style={{ padding: 'var(--space-lg)', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                            <Target size={24} style={{ color: '#8b5cf6' }} />
                                            <div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>City Impact</div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#8b5cf6' }}>0.8%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Level Progression */}
                                <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: 'var(--space-lg)', color: 'var(--color-text-dark)' }}>Level Progression</h4>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
                                        {LEVELS.map((level, idx) => (
                                            <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
                                                <div style={{ 
                                                    width: '32px', 
                                                    height: '32px', 
                                                    borderRadius: '50%', 
                                                    background: userXp >= level.min ? level.color : 'rgba(0,0,0,0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    margin: '0 auto var(--space-xs)',
                                                    fontSize: '0.8rem'
                                                }}>
                                                    {userXp >= level.min ? '✓' : ''}
                                                </div>
                                                <div style={{ fontSize: '0.7rem', fontWeight: '600', color: userXp >= level.min ? level.color : 'var(--color-text-light)' }}>
                                                    {level.name}
                                                </div>
                                                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-light)' }}>
                                                    {level.min.toLocaleString()}+
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden', position: 'relative' }}>
                                        <div style={{ 
                                            width: `${Math.min(levelInfo.progress, 100)}%`, 
                                            height: '100%', 
                                            background: `linear-gradient(90deg, ${levelInfo.current.color} 0%, var(--color-primary) 100%)`, 
                                            borderRadius: 'var(--radius-full)',
                                            transition: 'width 0.5s ease'
                                        }} />
                                    </div>

                                    {levelInfo.next && (
                                        <p style={{ textAlign: 'center', marginTop: 'var(--space-md)', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>
                                            <strong>{levelInfo.next.min - userXp}</strong> points to reach {levelInfo.next.name} Level
                                        </p>
                                    )}
                                </div>

                                {/* Reports Breakdown */}
                                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: 'var(--space-lg)', color: 'var(--color-text-dark)' }}>Reports Breakdown</h4>
                                    
                                    <div style={{ display: 'flex', gap: 'var(--space-xl)', alignItems: 'center' }}>
                                        {/* Donut Chart Placeholder */}
                                        <div style={{ 
                                            width: '120px', 
                                            height: '120px', 
                                            borderRadius: '50%', 
                                            background: `conic-gradient(#059669 0% ${(stats.resolved/stats.total)*100}%, #f59e0b ${(stats.resolved/stats.total)*100}% 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative'
                                        }}>
                                            <div style={{ 
                                                width: '80px', 
                                                height: '80px', 
                                                borderRadius: '50%', 
                                                background: 'white', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center',
                                                flexDirection: 'column'
                                            }}>
                                                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text-dark)' }}>{stats.total}</div>
                                                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-light)' }}>Total</div>
                                            </div>
                                        </div>

                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#059669' }} />
                                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>
                                                    <strong>{stats.resolved}</strong> Resolved ({Math.round((stats.resolved/stats.total)*100)}%)
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>
                                                    <strong>{stats.pending}</strong> In Progress ({Math.round((stats.pending/stats.total)*100)}%)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'activity' && (
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: 'var(--space-lg)', color: 'var(--color-text-dark)' }}>
                                    Activity History
                                </h3>

                                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                                    <div style={{ position: 'relative' }}>
                                        {/* Timeline line */}
                                        <div style={{ position: 'absolute', left: '20px', top: '10px', bottom: '10px', width: '2px', background: 'rgba(0,0,0,0.1)' }} />

                                        {MOCK_ACTIVITY.map((activity, index) => (
                                            <div key={index} style={{ display: 'flex', gap: 'var(--space-lg)', marginBottom: index < MOCK_ACTIVITY.length - 1 ? 'var(--space-xl)' : 0, position: 'relative' }}>
                                                <div style={{ 
                                                    width: '40px', 
                                                    height: '40px', 
                                                    borderRadius: '50%', 
                                                    background: 'white', 
                                                    border: '2px solid rgba(0,0,0,0.1)',
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center',
                                                    fontSize: '1.25rem',
                                                    flexShrink: 0,
                                                    zIndex: 1
                                                }}>
                                                    {activity.icon}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: '500', color: 'var(--color-text-dark)', marginBottom: '2px' }}>{activity.text}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '4px' }}>{activity.subtext}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{activity.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button 
                                        onClick={() => alert('Loading more activity... (More history coming soon!)')}
                                        style={{ 
                                            marginTop: 'var(--space-xl)', 
                                            width: '100%', 
                                            padding: 'var(--space-md)', 
                                            background: 'var(--color-bg-medium)', 
                                            border: 'none', 
                                            borderRadius: 'var(--radius-md)', 
                                            cursor: 'pointer',
                                            fontWeight: '500',
                                            color: 'var(--color-text-medium)',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        Load More
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'achievements' && (
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: 'var(--space-lg)', color: 'var(--color-text-dark)' }}>
                                    Your Achievements
                                </h3>

                                {/* Earned Badges */}
                                <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-lg)' }}>
                                    <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        <CheckCircle size={18} style={{ color: '#059669' }} />
                                        Earned Badges ({ALL_BADGES.filter(b => b.earned).length})
                                    </h4>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-md)' }}>
                                        {ALL_BADGES.filter(b => b.earned).map((badge, index) => (
                                            <div key={index} style={{ 
                                                padding: 'var(--space-lg)', 
                                                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.08) 0%, rgba(255, 107, 53, 0.02) 100%)', 
                                                borderRadius: 'var(--radius-md)',
                                                border: '1px solid rgba(255, 107, 53, 0.2)',
                                                textAlign: 'center'
                                            }}>
                                                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-sm)' }}>{badge.icon}</div>
                                                <div style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: '4px' }}>{badge.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-sm)' }}>{badge.description}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: '600' }}>{badge.earnedDate}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Locked Badges */}
                                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                                    <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        <Lock size={18} style={{ color: 'var(--color-text-light)' }} />
                                        Locked Badges ({ALL_BADGES.filter(b => !b.earned).length})
                                    </h4>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-md)' }}>
                                        {ALL_BADGES.filter(b => !b.earned).map((badge, index) => (
                                            <div key={index} style={{ 
                                                padding: 'var(--space-lg)', 
                                                background: 'var(--color-bg-medium)', 
                                                borderRadius: 'var(--radius-md)',
                                                textAlign: 'center',
                                                opacity: 0.7
                                            }}>
                                                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-sm)', filter: 'grayscale(100%)' }}>{badge.icon}</div>
                                                <div style={{ fontWeight: '600', color: 'var(--color-text-medium)', marginBottom: '4px' }}>{badge.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-sm)' }}>{badge.description}</div>
                                                {/* Progress bar */}
                                                <div style={{ height: '4px', background: 'rgba(0,0,0,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                                                    <div style={{ width: `${badge.progress * 100}%`, height: '100%', background: 'var(--color-primary)' }} />
                                                </div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-light)', marginTop: '4px' }}>{Math.round(badge.progress * 100)}% complete</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: 'var(--space-lg)', color: 'var(--color-text-dark)' }}>
                                    Settings
                                </h3>

                                {/* Notification Preferences */}
                                <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-lg)' }}>
                                    <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        <Bell size={18} />
                                        Notification Preferences
                                    </h4>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                        {[
                                            { key: 'emailNotifications', label: 'Email notifications when reports are resolved' },
                                            { key: 'smsUpdates', label: 'SMS updates for high-priority issues' },
                                            { key: 'weeklyDigest', label: 'Weekly summary of your activity' },
                                            { key: 'rankAlerts', label: 'Leaderboard rank change alerts' },
                                        ].map((item) => (
                                            <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-sm) 0' }}>
                                                <span style={{ color: 'var(--color-text-medium)' }}>{item.label}</span>
                                                <button 
                                                    onClick={() => setSettings(s => ({ ...s, [item.key]: !s[item.key] }))}
                                                    style={{ 
                                                        width: '44px', 
                                                        height: '24px', 
                                                        borderRadius: 'var(--radius-full)',
                                                        background: settings[item.key] ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        position: 'relative',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <div style={{ 
                                                        width: '18px', 
                                                        height: '18px', 
                                                        borderRadius: '50%', 
                                                        background: 'white',
                                                        position: 'absolute',
                                                        top: '3px',
                                                        left: settings[item.key] ? '22px' : '4px',
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                    }} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Privacy Settings */}
                                <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-lg)' }}>
                                    <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        <Eye size={18} />
                                        Privacy Settings
                                    </h4>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                        {[
                                            { key: 'showOnLeaderboard', label: 'Show my name on public leaderboard' },
                                            { key: 'allowFeatured', label: 'Allow my reports to be featured in impact stats' },
                                        ].map((item) => (
                                            <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-sm) 0' }}>
                                                <span style={{ color: 'var(--color-text-medium)' }}>{item.label}</span>
                                                <button 
                                                    onClick={() => setSettings(s => ({ ...s, [item.key]: !s[item.key] }))}
                                                    style={{ 
                                                        width: '44px', 
                                                        height: '24px', 
                                                        borderRadius: 'var(--radius-full)',
                                                        background: settings[item.key] ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        position: 'relative',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <div style={{ 
                                                        width: '18px', 
                                                        height: '18px', 
                                                        borderRadius: '50%', 
                                                        background: 'white',
                                                        position: 'absolute',
                                                        top: '3px',
                                                        left: settings[item.key] ? '22px' : '4px',
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                    }} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Account Management */}
                                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                                    <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        <Shield size={18} />
                                        Account Management
                                    </h4>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                        <button style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: 'var(--space-sm)', 
                                            padding: 'var(--space-md) var(--space-lg)', 
                                            background: 'var(--color-bg-medium)', 
                                            border: 'none',
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            color: 'var(--color-text-dark)',
                                            fontWeight: '500'
                                        }}>
                                            <Download size={18} />
                                            Download My Data (CSV/PDF)
                                        </button>
                                        <button style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: 'var(--space-sm)', 
                                            padding: 'var(--space-md) var(--space-lg)', 
                                            background: 'rgba(220, 38, 38, 0.1)', 
                                            border: '1px solid rgba(220, 38, 38, 0.3)',
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            color: '#dc2626',
                                            fontWeight: '500'
                                        }}>
                                            <Trash2 size={18} />
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Profile
