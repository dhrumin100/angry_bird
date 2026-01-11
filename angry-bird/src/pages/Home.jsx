import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
    ArrowRight,
    Sparkles,
    Camera,
    Cpu,
    MapPin,
    FileText,
    Shield,
    Zap,
    BarChart3,
    Upload,
    Brain,
    CheckCircle,
    AlertTriangle,
    Droplets,
    Construction,
    Users,
    Building2,
    Award,
    Truck,
    Globe,
    Wifi,
    Leaf,
    Network,
    Trophy,
    TrendingUp,
    Star
} from 'lucide-react'
import { useState, useEffect } from 'react'

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        let startTime
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime
            const progress = (currentTime - startTime) / duration
            if (progress < 1) {
                setCount(Math.floor(end * progress))
                requestAnimationFrame(animate)
            } else {
                setCount(end)
            }
        }
        requestAnimationFrame(animate)
    }, [end, duration])
    
    return <>{count.toLocaleString()}{suffix}</>
}

function Home() {
    const { user } = useAuth()

    const KAVAACH_LAYERS = [
        { 
            phase: 1, 
            title: 'Infrastructure Intelligence', 
            icon: <MapPin size={24} />, 
            description: 'Real-time road health mapping through citizen reports',
            status: 'current'
        },
        { 
            phase: 2, 
            title: 'Vehicle Modernization', 
            icon: <Truck size={24} />, 
            description: 'Clean, safe public transport fleet upgrades',
            status: 'upcoming'
        },
        { 
            phase: 3, 
            title: 'Digital Intelligence', 
            icon: <Wifi size={24} />, 
            description: 'AI-IoT connected fleet management',
            status: 'upcoming'
        },
        { 
            phase: 4, 
            title: 'Green Transition', 
            icon: <Leaf size={24} />, 
            description: 'Emission reduction and sustainability',
            status: 'upcoming'
        },
        { 
            phase: 5, 
            title: 'Citywide Intelligence', 
            icon: <Network size={24} />, 
            description: 'Unified urban mobility brain',
            status: 'upcoming'
        }
    ]

    const BADGES_PREVIEW = [
        { icon: '🌟', name: 'First Report', description: 'Submit your first issue' },
        { icon: '🔥', name: '10 Reports', description: 'Report 10 civic issues' },
        { icon: '📍', name: 'Local Hero', description: 'Report in 5+ areas' },
        { icon: '🏆', name: 'Top Contributor', description: 'Reach Top 10% rank' },
        { icon: '⚡', name: 'Speed Reporter', description: '5 reports in 1 day' },
        { icon: '🌍', name: 'City Guardian', description: '1% city contribution' }
    ]

    return (
        <main>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-bg-shape hero-bg-shape-1"></div>
                    <div className="hero-bg-shape hero-bg-shape-2"></div>
                    <div className="hero-bg-shape hero-bg-shape-3"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <div className="hero-badge">
                                <Shield size={16} />
                                <span>KAVAACH - Civic Infrastructure Platform</span>
                            </div>

                            <h1 className="hero-title">
                                Transforming India's Roads, <span className="gradient-text">One Report at a Time</span>
                            </h1>

                            <p className="hero-description">
                                Empowering citizens to fix civic issues with AI-powered intelligence and rapid response. 
                                Report potholes, track resolution, earn rewards — join the movement for safer roads.
                            </p>

                            <div className="hero-buttons">
                                {user ? (
                                    <Link to="/dashboard" className="btn btn-primary btn-lg">
                                        Go to Dashboard
                                        <ArrowRight size={20} />
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/signup" className="btn btn-primary btn-lg">
                                            Start Reporting Issues
                                            <ArrowRight size={20} />
                                        </Link>
                                        <a href="#vision" className="btn btn-secondary btn-lg">
                                            Learn Our Vision
                                        </a>
                                    </>
                                )}
                            </div>

                            <div style={{ marginTop: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', color: 'var(--color-text-medium)', fontSize: '0.9rem' }}>
                                <Users size={16} />
                                <span>Join <strong>10,000+</strong> citizens making their cities safer</span>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="hero-image-container">
                                <div className="hero-image">
                                    <div className="hero-image-placeholder">
                                        <Shield size={64} />
                                        <span>KAVAACH Platform</span>
                                    </div>
                                </div>
                            </div>

                            <div className="hero-floating-card hero-floating-card-1">
                                <div className="flex items-center gap-sm">
                                    <CheckCircle size={20} className="text-success" />
                                    <span style={{ fontWeight: 600 }}>Issue Detected</span>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                                    Confidence: 94%
                                </div>
                            </div>

                            <div className="hero-floating-card hero-floating-card-2">
                                <div className="flex items-center gap-sm">
                                    <Truck size={20} className="text-primary" />
                                    <span style={{ fontWeight: 600 }}>Fleet Dispatched</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Wave Divider */}
            <div style={{ 
                height: '100px', 
                background: 'var(--color-bg-light)',
                marginTop: '-50px',
                borderRadius: '100% 100% 0 0'
            }} />

            {/* Problem Section - India's Transit Crisis */}
            <section className="problems-section" style={{ padding: 'var(--space-2xl) 0 var(--space-3xl)', background: 'var(--color-bg-light)' }}>
                <div className="container">
                    <div className="features-header">
                        <h2>India's Transit Crisis</h2>
                        <p className="mt-md" style={{ color: 'var(--color-text-medium)' }}>
                            Critical infrastructure challenges demanding innovative solutions.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)', marginTop: 'var(--space-xl)' }}>
                        <div className="card" style={{ padding: 'var(--space-xl)', textAlign: 'center', border: '2px solid transparent', transition: 'all 0.3s ease' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-lg)', boxShadow: '0 8px 25px rgba(239, 68, 68, 0.25)' }}>
                                <Construction size={36} color="white" />
                            </div>
                            <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: '1.25rem' }}>🚧 Road Deterioration</h3>
                            <p style={{ color: 'var(--color-text-medium)', fontSize: '0.95rem' }}>
                                Poor road health causes <strong>3,000+ accidents monthly</strong>. Congestion costs ₹60,000 crore annually.
                            </p>
                        </div>

                        <div className="card" style={{ padding: 'var(--space-xl)', textAlign: 'center', border: '2px solid transparent', transition: 'all 0.3s ease' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-lg)', boxShadow: '0 8px 25px rgba(59, 130, 246, 0.25)' }}>
                                <BarChart3 size={36} color="white" />
                            </div>
                            <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: '1.25rem' }}>📊 Data Deficit</h3>
                            <p style={{ color: 'var(--color-text-medium)', fontSize: '0.95rem' }}>
                                Municipalities lack <strong>real-time infrastructure data</strong>. Slow response times frustrate citizens.
                            </p>
                        </div>

                        <div className="card" style={{ padding: 'var(--space-xl)', textAlign: 'center', border: '2px solid transparent', transition: 'all 0.3s ease' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-lg)', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.25)' }}>
                                <Globe size={36} color="white" />
                            </div>
                            <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: '1.25rem' }}>🌍 Environmental Impact</h3>
                            <p style={{ color: 'var(--color-text-medium)', fontSize: '0.95rem' }}>
                                Road damage <strong>increases vehicle emissions</strong>. Traffic delays worsen air quality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* KAVAACH Vision Section */}
            <section className="kavaach-vision" id="vision" style={{ padding: 'var(--space-3xl) 0', background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(0, 78, 137, 0.05) 100%)' }}>
                <div className="container">
                    <div className="features-header">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)', padding: 'var(--space-xs) var(--space-md)', background: 'rgba(255, 107, 53, 0.1)', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-md)' }}>
                            <Shield size={16} style={{ color: 'var(--color-primary)' }} />
                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-primary)' }}>The KAVAACH Framework</span>
                        </div>
                        <h2>5-Layer Urban Modernization Strategy</h2>
                        <p className="mt-md" style={{ color: 'var(--color-text-medium)', maxWidth: '700px', margin: '0 auto' }}>
                            <strong>KAVAACH</strong> - Kinaesthetic AI-Vision & Autonomous Connectivity Hub. 
                            A comprehensive approach to transforming India's urban mobility infrastructure.
                        </p>
                    </div>

                    <div style={{ marginTop: 'var(--space-2xl)', position: 'relative' }}>
                        {/* Timeline connector */}
                        <div style={{ 
                            position: 'absolute', 
                            left: '50%', 
                            top: '0', 
                            bottom: '0', 
                            width: '4px', 
                            background: 'linear-gradient(180deg, var(--color-primary) 0%, rgba(0, 78, 137, 0.2) 100%)',
                            transform: 'translateX(-50%)',
                            display: 'none'
                        }} className="timeline-line" />

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-xl)' }}>
                            {KAVAACH_LAYERS.map((layer, index) => (
                                <div 
                                    key={index}
                                    className="card"
                                    style={{ 
                                        padding: 'var(--space-2xl) var(--space-xl)', 
                                        textAlign: 'center',
                                        border: layer.status === 'current' ? '2px solid var(--color-primary)' : '2px solid transparent',
                                        background: layer.status === 'current' ? 'rgba(255, 107, 53, 0.05)' : 'white',
                                        position: 'relative',
                                        minHeight: '220px'
                                    }}
                                >
                                    {layer.status === 'current' && (
                                        <div style={{ 
                                            position: 'absolute', 
                                            top: '-12px', 
                                            left: '50%', 
                                            transform: 'translateX(-50%)',
                                            background: 'var(--color-primary)',
                                            color: 'white',
                                            padding: '4px 12px',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.7rem',
                                            fontWeight: '700',
                                            textTransform: 'uppercase'
                                        }}>
                                            Current Phase
                                        </div>
                                    )}
                                    <div style={{ 
                                        width: '64px', 
                                        height: '64px', 
                                        borderRadius: '50%', 
                                        background: layer.status === 'current' 
                                            ? 'linear-gradient(135deg, var(--color-primary) 0%, #004E89 100%)'
                                            : 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        margin: '0 auto var(--space-lg)',
                                        color: layer.status === 'current' ? 'white' : '#9ca3af',
                                        boxShadow: layer.status === 'current' ? '0 8px 25px rgba(255, 107, 53, 0.3)' : 'none'
                                    }}>
                                        {layer.icon}
                                    </div>
                                    <div style={{ 
                                        fontSize: '0.75rem', 
                                        fontWeight: '700', 
                                        color: layer.status === 'current' ? 'var(--color-primary)' : 'var(--color-text-light)',
                                        marginBottom: 'var(--space-xs)'
                                    }}>
                                        Layer {layer.phase}
                                    </div>
                                    <h4 style={{ 
                                        fontSize: '1.1rem', 
                                        marginBottom: 'var(--space-md)',
                                        color: layer.status === 'current' ? 'var(--color-text-dark)' : 'var(--color-text-medium)',
                                        fontWeight: '600'
                                    }}>
                                        {layer.title}
                                    </h4>
                                    <p style={{ 
                                        fontSize: '0.85rem', 
                                        color: 'var(--color-text-light)',
                                        lineHeight: '1.5'
                                    }}>
                                        {layer.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p style={{ textAlign: 'center', marginTop: 'var(--space-xl)', color: 'var(--color-text-medium)', fontSize: '0.95rem' }}>
                            🎯 <strong>Starting with potholes</strong>, scaling to comprehensive smart city infrastructure.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works" id="how-it-works" style={{ background: 'var(--color-bg-dark, #1a1a2e)', color: 'white' }}>
                <div className="container">
                    <div className="features-header" style={{ color: 'white' }}>
                        <h2 style={{ color: 'white' }}>Four Simple Steps to Safer Roads</h2>
                        <p className="mt-md" style={{ color: 'rgba(255,255,255,0.7)' }}>
                            Report an issue in under 60 seconds, resolution in 24-48 hours.
                        </p>
                    </div>

                    <div className="steps-container">
                        <div className="card step-card" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <div className="step-number" style={{ background: 'var(--color-primary)' }}>1</div>
                            <div className="step-icon" style={{ color: 'white' }}>
                                <Camera size={36} />
                            </div>
                            <h4 className="step-title" style={{ color: 'white' }}>📸 Report</h4>
                            <p className="step-description" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                Upload a photo of the road issue from your phone.
                            </p>
                        </div>

                        <div className="card step-card" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <div className="step-number" style={{ background: 'var(--color-primary)' }}>2</div>
                            <div className="step-icon" style={{ color: 'white' }}>
                                <Cpu size={36} />
                            </div>
                            <h4 className="step-title" style={{ color: 'white' }}>🤖 AI Analysis</h4>
                            <p className="step-description" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                Our YOLOv8 model analyzes severity, location, and urgency instantly.
                            </p>
                        </div>

                        <div className="card step-card" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <div className="step-number" style={{ background: 'var(--color-primary)' }}>3</div>
                            <div className="step-icon" style={{ color: 'white' }}>
                                <Truck size={36} />
                            </div>
                            <h4 className="step-title" style={{ color: 'white' }}>🚛 Dispatch</h4>
                            <p className="step-description" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                Our fleet receives the report and mobilizes repair teams.
                            </p>
                        </div>

                        <div className="card step-card" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <div className="step-number" style={{ background: 'var(--color-primary)' }}>4</div>
                            <div className="step-icon" style={{ color: 'white' }}>
                                <CheckCircle size={36} />
                            </div>
                            <h4 className="step-title" style={{ color: 'white' }}>✅ Resolution</h4>
                            <p className="step-description" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                Issue resolved within 24-48 hours, you get notified.
                            </p>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
                        <Link to={user ? "/detect" : "/signup"} className="btn btn-primary btn-lg">
                            Try It Now
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Impact Dashboard */}
            <section className="stats" style={{ background: 'white' }}>
                <div className="container">
                    <div className="features-header">
                        <h2>Our Impact So Far</h2>
                        <p className="mt-md" style={{ color: 'var(--color-text-medium)' }}>
                            Real-time metrics from citizen contributions across India.
                        </p>
                    </div>

                    <div className="stats-grid" style={{ marginTop: 'var(--space-xl)' }}>
                        <div className="stat-item" style={{ background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)' }}>🔧 Issues Resolved</div>
                            <div className="stat-value" style={{ color: 'var(--color-primary)' }}>
                                <AnimatedCounter end={12456} />
                            </div>
                        </div>
                        <div className="stat-item" style={{ background: 'linear-gradient(135deg, rgba(0, 78, 137, 0.1) 0%, rgba(0, 78, 137, 0.05) 100%)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)' }}>🏙️ Cities Covered</div>
                            <div className="stat-value" style={{ color: '#004E89' }}>
                                <AnimatedCounter end={8} />
                            </div>
                        </div>
                        <div className="stat-item" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)' }}>⭐ Citizen Satisfaction</div>
                            <div className="stat-value" style={{ color: '#059669' }}>
                                <AnimatedCounter end={94} suffix="%" />
                            </div>
                        </div>
                        <div className="stat-item" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)' }}>🌱 CO₂ Saved</div>
                            <div className="stat-value" style={{ color: '#8b5cf6' }}>
                                <AnimatedCounter end={2.3} suffix=" tons" />
                            </div>
                        </div>
                    </div>

                    <p style={{ textAlign: 'center', marginTop: 'var(--space-lg)', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                        📊 Updated in real-time based on platform activity
                    </p>
                </div>
            </section>

            {/* Gamification Teaser */}
            <section style={{ padding: 'var(--space-3xl) 0', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
                <div className="container">
                    <div className="features-header" style={{ color: 'white' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)', padding: 'var(--space-xs) var(--space-md)', background: 'rgba(255, 107, 53, 0.2)', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-md)' }}>
                            <Trophy size={16} style={{ color: 'var(--color-primary)' }} />
                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-primary)' }}>Gamification</span>
                        </div>
                        <h2 style={{ color: 'white' }}>Become a Civic Champion</h2>
                        <p className="mt-md" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto' }}>
                            Every report earns you points. Climb the leaderboard, unlock badges, and see your real impact on your city's infrastructure.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-lg)', marginTop: 'var(--space-2xl)', maxWidth: '1000px', margin: 'var(--space-2xl) auto 0' }}>
                        {BADGES_PREVIEW.map((badge, index) => (
                            <div 
                                key={index}
                                style={{ 
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: 'var(--space-xl)',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    transition: 'all 0.3s ease',
                                    minHeight: '160px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)'
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                                }}
                            >
                                <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-md)' }}>{badge.icon}</div>
                                <div style={{ fontWeight: '600', color: 'white', fontSize: '1rem', marginBottom: 'var(--space-xs)' }}>{badge.name}</div>
                                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>{badge.description}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
                        <Link to={user ? "/leaderboard" : "/signup"} className="btn btn-primary btn-lg">
                            Join the Movement
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section className="features" id="features">
                <div className="container">
                    <div className="features-header">
                        <h2>Why KAVAACH?</h2>
                        <p className="mt-md">
                            Private sector speed meets civic responsibility.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="card feature-card animate-fadeInUp">
                            <div className="feature-icon">
                                <Brain size={32} />
                            </div>
                            <h3 className="feature-title">Smart Detection</h3>
                            <p className="feature-description">
                                Fine-tuned YOLOv8 model trained on thousands of road images for precise identification.
                            </p>
                        </div>

                        <div className="card feature-card animate-fadeInUp delay-100">
                            <div className="feature-icon">
                                <Shield size={32} />
                            </div>
                            <h3 className="feature-title">Privacy First</h3>
                            <p className="feature-description">
                                Your data stays secure. We only use location for reporting, never for tracking.
                            </p>
                        </div>

                        <div className="card feature-card animate-fadeInUp delay-200">
                            <div className="feature-icon">
                                <Users size={32} />
                            </div>
                            <h3 className="feature-title">Community Driven</h3>
                            <p className="feature-description">
                                Join citizens making roads safer. Every report contributes to better infrastructure.
                            </p>
                        </div>

                        <div className="card feature-card animate-fadeInUp delay-300">
                            <div className="feature-icon">
                                <Zap size={32} />
                            </div>
                            <h3 className="feature-title">Instant Results</h3>
                            <p className="feature-description">
                                Get analysis in under 2 seconds. No waiting, no complex forms.
                            </p>
                        </div>

                        <div className="card feature-card animate-fadeInUp delay-400">
                            <div className="feature-icon">
                                <Truck size={32} />
                            </div>
                            <h3 className="feature-title">Rapid Response</h3>
                            <p className="feature-description">
                                Our dispatch fleet ensures issues are resolved in 24-48 hours, not weeks.
                            </p>
                        </div>

                        <div className="card feature-card animate-fadeInUp delay-500">
                            <div className="feature-icon">
                                <Award size={32} />
                            </div>
                            <h3 className="feature-title">Gamified Impact</h3>
                            <p className="feature-description">
                                Earn XP and badges for contributions. Track your civic impact on your dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2 className="cta-title">Ready to Make an Impact?</h2>
                        <p className="cta-description">
                            Join the KAVAACH movement for safer roads. Start detecting issues in your neighborhood today.
                        </p>
                        {user ? (
                            <Link to="/dashboard" className="btn btn-lg cta-button">
                                Open Dashboard
                                <ArrowRight size={20} />
                            </Link>
                        ) : (
                            <Link to="/signup" className="btn btn-lg cta-button">
                                Create Free Account
                                <ArrowRight size={20} />
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
