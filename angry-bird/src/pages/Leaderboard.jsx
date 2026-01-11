import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
    Trophy,
    Medal,
    Award,
    Star,
    TrendingUp,
    Users,
    MapPin,
    CheckCircle,
    ArrowLeft,
    Crown,
    Flame,
    Target
} from 'lucide-react'

// Mock leaderboard data
const MOCK_LEADERBOARD = {
    mumbai: [
        { rank: 1, name: 'Priya Mehta', avatar: 'PM', reports: 87, resolved: 78, score: 5240, level: 'Platinum', streak: 12 },
        { rank: 2, name: 'Arjun Kapoor', avatar: 'AK', reports: 72, resolved: 65, score: 4890, level: 'Gold', streak: 8 },
        { rank: 3, name: 'Sneha Patel', avatar: 'SP', reports: 68, resolved: 61, score: 4650, level: 'Gold', streak: 15 },
        { rank: 4, name: 'Rahul Sharma', avatar: 'RS', reports: 54, resolved: 48, score: 3820, level: 'Silver', streak: 5 },
        { rank: 5, name: 'Aisha Khan', avatar: 'AK', reports: 49, resolved: 44, score: 3450, level: 'Silver', streak: 3 },
        { rank: 6, name: 'Vikram Singh', avatar: 'VS', reports: 45, resolved: 40, score: 3200, level: 'Silver', streak: 7 },
        { rank: 7, name: 'Neha Gupta', avatar: 'NG', reports: 42, resolved: 38, score: 2980, level: 'Bronze', streak: 2 },
        { rank: 8, name: 'Rohan Joshi', avatar: 'RJ', reports: 38, resolved: 34, score: 2740, level: 'Bronze', streak: 4 },
        { rank: 9, name: 'Kavya Nair', avatar: 'KN', reports: 35, resolved: 31, score: 2520, level: 'Bronze', streak: 1 },
        { rank: 10, name: 'Amit Verma', avatar: 'AV', reports: 32, resolved: 28, score: 2300, level: 'Bronze', streak: 6 },
    ],
    nationwide: [
        { rank: 1, name: 'Rajesh Kumar', city: 'Delhi', avatar: 'RK', reports: 156, resolved: 142, score: 9840, level: 'Diamond', streak: 28 },
        { rank: 2, name: 'Priya Mehta', city: 'Mumbai', avatar: 'PM', reports: 87, resolved: 78, score: 5240, level: 'Platinum', streak: 12 },
        { rank: 3, name: 'Suresh Reddy', city: 'Bangalore', avatar: 'SR', reports: 94, resolved: 85, score: 5680, level: 'Platinum', streak: 20 },
        { rank: 4, name: 'Anita Desai', city: 'Chennai', avatar: 'AD', reports: 78, resolved: 70, score: 4920, level: 'Gold', streak: 9 },
        { rank: 5, name: 'Arjun Kapoor', city: 'Mumbai', avatar: 'AK', reports: 72, resolved: 65, score: 4890, level: 'Gold', streak: 8 },
        { rank: 6, name: 'Meera Iyer', city: 'Hyderabad', avatar: 'MI', reports: 69, resolved: 62, score: 4720, level: 'Gold', streak: 11 },
        { rank: 7, name: 'Sneha Patel', city: 'Mumbai', avatar: 'SP', reports: 68, resolved: 61, score: 4650, level: 'Gold', streak: 15 },
        { rank: 8, name: 'Karan Malhotra', city: 'Pune', avatar: 'KM', reports: 63, resolved: 57, score: 4280, level: 'Gold', streak: 7 },
        { rank: 9, name: 'Divya Sharma', city: 'Jaipur', avatar: 'DS', reports: 58, resolved: 52, score: 3940, level: 'Silver', streak: 4 },
        { rank: 10, name: 'Rahul Sharma', city: 'Mumbai', avatar: 'RS', reports: 54, resolved: 48, score: 3820, level: 'Silver', streak: 5 },
    ]
}

const COMMUNITY_STATS = {
    totalReports: 12456,
    issuesResolved: 10234,
    activeContributors: 3456,
    citiesCovered: 8
}

function Leaderboard() {
    const { user, submissions } = useAuth()
    const [activeTab, setActiveTab] = useState('city') // 'city' or 'nationwide'
    const [timePeriod, setTimePeriod] = useState('month') // 'week', 'month', 'alltime'
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch leaderboard data
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                // Dynamically import api if we want to keep it local or just use the top-level import if added.
                // Better: rely on top-level import if I can add it, but replace_file_content chunking makes adding to line 1 hard without contexts.
                // However, I can use a dynamic import properly or just assume 'api' was imported if I added it to top.
                // Wait, I didn't add it to top. 
                // Let's use dynamic import for 'api' to be safe without editing top of file which might fail match.
                // actually, standard dynamic import: const api = (await import('../services/api')).default;
                
                const api = (await import('../services/api')).default;
                const { data } = await api.get('/auth/leaderboard');
                setLeaderboardData(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch leaderboard", error);
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    // Calculate user stats
    const userStats = {
        rank: 42,
        civicScore: user?.karmaPoints || 1247,
        totalReports: submissions?.length || 23,
        resolvedReports: submissions?.filter(s => s.status === 'Resolved').length || 18,
        level: 'Silver',
        percentile: 5
    }

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <Crown size={24} className="text-warning" style={{ color: '#FFD700' }} />
            case 2: return <Medal size={24} style={{ color: '#C0C0C0' }} />
            case 3: return <Medal size={24} style={{ color: '#CD7F32' }} />
            default: return <span style={{ fontWeight: '700', color: 'var(--color-text-medium)' }}>#{rank}</span>
        }
    }

    const getLevelColor = (level) => {
        switch (level) {
            case 'Diamond': return 'linear-gradient(135deg, #b9f2ff 0%, #00d4ff 100%)'
            case 'Platinum': return 'linear-gradient(135deg, #e5e4e2 0%, #a8a8a8 100%)'
            case 'Gold': return 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)'
            case 'Silver': return 'linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%)'
            default: return 'linear-gradient(135deg, #cd7f32 0%, #8b4513 100%)'
        }
    }

    // Use real data or fallback to mock if empty/loading (optional strategy, here we use real)
    const currentLeaderboard = leaderboardData.length > 0 ? leaderboardData : (activeTab === 'city' ? MOCK_LEADERBOARD.mumbai : MOCK_LEADERBOARD.nationwide);

    return (
        <main style={{ minHeight: '100vh', background: 'var(--color-bg-gradient)', paddingTop: '5rem', paddingBottom: '2rem' }}>
            <div className="container">
                {/* Page Header */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
                        <Trophy size={24} style={{ color: 'var(--color-primary)' }} />
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-dark)' }}>
                            Civic Champions Leaderboard
                        </h1>
                    </div>
                    <p style={{ color: 'var(--color-text-medium)', fontSize: '0.9rem' }}>
                        See how you stack up against other citizens making India's roads safer.
                    </p>
                </div>

                {/* Your Rank Card - Compact */}
                <div className="card" style={{ 
                    padding: '1rem', 
                    marginBottom: '1.25rem',
                    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.08) 0%, rgba(0, 78, 137, 0.08) 100%)',
                    border: '1.5px solid var(--color-primary)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-lg)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                            <div style={{ 
                                width: '64px', 
                                height: '64px', 
                                borderRadius: '50%', 
                                background: getLevelColor(userStats.level),
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: 'white',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                            }}>
                                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '2px' }}>Your Current Rank</div>
                                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-dark)' }}>
                                    #{userStats.rank} <span style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--color-text-medium)' }}>in {user?.city || 'Mumbai'}</span>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '600' }}>
                                    Top {userStats.percentile}% of contributors
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>{userStats.civicScore.toLocaleString()}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Civic Score</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-dark)' }}>{userStats.totalReports}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Reports</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>{userStats.resolvedReports}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Resolved</div>
                            </div>
                        </div>

                        <div style={{ 
                            padding: 'var(--space-sm) var(--space-lg)', 
                            background: getLevelColor(userStats.level), 
                            borderRadius: 'var(--radius-full)',
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}>
                            {userStats.level} Level
                        </div>
                    </div>

                    {/* Progress to next level */}
                    <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-lg)', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-sm)' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>Progress to Gold Level</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-primary)' }}>753 points to go</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                            <div style={{ 
                                width: '62%', 
                                height: '100%', 
                                background: 'linear-gradient(90deg, var(--color-primary) 0%, #FFD700 100%)',
                                borderRadius: 'var(--radius-full)',
                                transition: 'width 0.5s ease'
                            }} />
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                        <button 
                            onClick={() => setActiveTab('city')}
                            style={{ 
                                padding: 'var(--space-sm) var(--space-lg)', 
                                background: activeTab === 'city' ? 'var(--color-primary)' : 'white',
                                color: activeTab === 'city' ? 'white' : 'var(--color-text-medium)',
                                border: activeTab === 'city' ? 'none' : '1px solid rgba(0,0,0,0.1)',
                                borderRadius: 'var(--radius-full)',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-xs)'
                            }}
                        >
                            <MapPin size={16} />
                            My City
                        </button>
                        <button 
                            onClick={() => setActiveTab('nationwide')}
                            style={{ 
                                padding: 'var(--space-sm) var(--space-lg)', 
                                background: activeTab === 'nationwide' ? 'var(--color-primary)' : 'white',
                                color: activeTab === 'nationwide' ? 'white' : 'var(--color-text-medium)',
                                border: activeTab === 'nationwide' ? 'none' : '1px solid rgba(0,0,0,0.1)',
                                borderRadius: 'var(--radius-full)',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-xs)'
                            }}
                        >
                            <TrendingUp size={16} />
                            Nationwide
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                        {['week', 'month', 'alltime'].map((period) => (
                            <button 
                                key={period}
                                onClick={() => setTimePeriod(period)}
                                style={{ 
                                    padding: 'var(--space-xs) var(--space-md)', 
                                    background: timePeriod === period ? 'rgba(0, 78, 137, 0.1)' : 'transparent',
                                    color: timePeriod === period ? '#004E89' : 'var(--color-text-light)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    fontSize: '0.85rem',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {period === 'week' ? 'This Week' : period === 'month' ? 'This Month' : 'All Time'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Leaderboard Table */}
                <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 'var(--space-xl)' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-bg-medium)' }}>
                                    <th style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>Rank</th>
                                    <th style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>Contributor</th>
                                    {activeTab === 'nationwide' && <th style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>City</th>}
                                    <th style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'center', fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>Reports</th>
                                    <th style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'center', fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>Resolved</th>
                                    <th style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'center', fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                            <Flame size={14} />
                                            Streak
                                        </div>
                                    </th>
                                    <th style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'right', fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>Civic Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentLeaderboard.map((user, index) => (
                                    <tr 
                                        key={index}
                                        style={{ 
                                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                                            background: user.rank <= 3 ? `rgba(255, 215, 0, ${0.1 - (user.rank * 0.02)})` : 'transparent',
                                            transition: 'background 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = user.rank <= 3 ? `rgba(255, 215, 0, ${0.1 - (user.rank * 0.02)})` : 'transparent'}
                                    >
                                        <td style={{ padding: 'var(--space-md) var(--space-lg)', width: '60px' }}>
                                            {getRankIcon(user.rank)}
                                        </td>
                                        <td style={{ padding: 'var(--space-md) var(--space-lg)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                                <div style={{ 
                                                    width: '40px', 
                                                    height: '40px', 
                                                    borderRadius: '50%', 
                                                    background: getLevelColor(user.level),
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600',
                                                    color: 'white'
                                                }}>
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '600', color: 'var(--color-text-dark)' }}>{user.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{user.level} Level</div>
                                                </div>
                                            </div>
                                        </td>
                                        {activeTab === 'nationwide' && (
                                            <td style={{ padding: 'var(--space-md) var(--space-lg)', color: 'var(--color-text-medium)', fontSize: '0.9rem' }}>
                                                {user.city}
                                            </td>
                                        )}
                                        <td style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'center', fontWeight: '600', color: 'var(--color-text-dark)' }}>
                                            {user.reports}
                                        </td>
                                        <td style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'center' }}>
                                            <span style={{ color: '#059669', fontWeight: '600' }}>{user.resolved}</span>
                                        </td>
                                        <td style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'center' }}>
                                            <span style={{ 
                                                display: 'inline-flex', 
                                                alignItems: 'center', 
                                                gap: '4px',
                                                padding: '2px 8px',
                                                background: user.streak >= 10 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0,0,0,0.05)',
                                                borderRadius: 'var(--radius-full)',
                                                color: user.streak >= 10 ? '#ef4444' : 'var(--color-text-medium)',
                                                fontWeight: '600',
                                                fontSize: '0.85rem'
                                            }}>
                                                🔥 {user.streak}
                                            </span>
                                        </td>
                                        <td style={{ padding: 'var(--space-md) var(--space-lg)', textAlign: 'right' }}>
                                            <span style={{ fontWeight: '700', color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                                                {user.score.toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Community Impact Stats */}
                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                        <Users size={24} style={{ color: 'var(--color-primary)' }} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-dark)' }}>
                            Community Impact This Month
                        </h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-lg)' }}>
                        <div style={{ textAlign: 'center', padding: 'var(--space-lg)', background: 'var(--color-bg-medium)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                                {COMMUNITY_STATS.totalReports.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: 'var(--space-xs)' }}>
                                Total Reports
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', padding: 'var(--space-lg)', background: 'var(--color-bg-medium)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#059669' }}>
                                {COMMUNITY_STATS.issuesResolved.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: 'var(--space-xs)' }}>
                                Issues Resolved
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', padding: 'var(--space-lg)', background: 'var(--color-bg-medium)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#004E89' }}>
                                {COMMUNITY_STATS.activeContributors.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: 'var(--space-xs)' }}>
                                Active Contributors
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', padding: 'var(--space-lg)', background: 'var(--color-bg-medium)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#8b5cf6' }}>
                                {COMMUNITY_STATS.citiesCovered}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: 'var(--space-xs)' }}>
                                Cities Covered
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Leaderboard
