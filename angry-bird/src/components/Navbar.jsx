import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Shield, User, LogOut, ChevronDown, Trophy, FileText, BarChart3 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.profile-dropdown-container')) {
                setIsProfileOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    const isActive = (path) => location.pathname === path

    const handleLogout = () => {
        logout()
        setIsProfileOpen(false)
        navigate('/')
    }

    // Get user initials for avatar
    const getInitials = (name) => {
        if (!name) return 'U'
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <div className="navbar-logo-icon">
                        <Shield size={18} />
                    </div>
                    <span>KAVAACH</span>
                </Link>

                <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                    <li>
                        <Link
                            to="/"
                            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    {user && (
                        <>
                            <li>
                                <Link
                                    to="/dashboard"
                                    className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/my-reports"
                                    className={`navbar-link ${isActive('/my-reports') ? 'active' : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    My Reports
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/leaderboard"
                                    className={`navbar-link ${isActive('/leaderboard') ? 'active' : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Leaderboard
                                </Link>
                            </li>
                        </>
                    )}
                    
                    {!user ? (
                        /* Logged Out State */
                        <>
                            <li>
                                <Link
                                    to="/login"
                                    className={`navbar-link ${isActive('/login') ? 'active' : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/signup"
                                    className="btn btn-primary"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    ) : (
                        /* Logged In State - Profile Dropdown */
                        <li className="profile-dropdown-container" style={{ position: 'relative' }}>
                            <button
                                className="profile-trigger"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsProfileOpen(!isProfileOpen)
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: 'var(--radius-full)',
                                    border: '2px solid var(--color-accent-cream)',
                                    background: 'rgba(255,255,255,0.9)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {/* Avatar */}
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '600',
                                    fontSize: '0.75rem'
                                }}>
                                    {getInitials(user.name)}
                                </div>
                                <span style={{ fontWeight: '500', color: 'var(--color-text-dark)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {user.name?.split(' ')[0] || 'User'}
                                </span>
                                <ChevronDown size={16} style={{ 
                                    color: 'var(--color-text-light)',
                                    transition: 'transform 0.2s',
                                    transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0)'
                                }} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="profile-dropdown animate-fadeIn" style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 8px)',
                                    right: 0,
                                    width: '220px',
                                    background: 'white',
                                    borderRadius: 'var(--radius-lg)',
                                    boxShadow: 'var(--shadow-lg)',
                                    border: '1px solid var(--color-accent-cream)',
                                    overflow: 'hidden',
                                    zIndex: 1000
                                }}>
                                    {/* User Info */}
                                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-accent-cream)' }}>
                                        <p style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: '0.25rem' }}>{user.name}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{user.id}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                            <span style={{ 
                                                fontSize: '0.7rem', 
                                                fontWeight: '600', 
                                                padding: '0.25rem 0.5rem', 
                                                borderRadius: 'var(--radius-full)', 
                                                background: 'rgba(201, 169, 98, 0.15)', 
                                                color: 'var(--color-primary-dark)' 
                                            }}>
                                                {user.karmaPoints || 0} XP
                                            </span>
                                            <span style={{ 
                                                fontSize: '0.7rem', 
                                                fontWeight: '600', 
                                                padding: '0.25rem 0.5rem', 
                                                borderRadius: 'var(--radius-full)', 
                                                background: 'rgba(16, 185, 129, 0.15)', 
                                                color: '#059669' 
                                            }}>
                                                Level {user.level || 1}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div style={{ padding: '0.5rem' }}>
                                        {/* Admin Panel - Only visible for admin users */}
                                        {user.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setIsProfileOpen(false)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: 'var(--radius-md)',
                                                    color: '#7c3aed',
                                                    textDecoration: 'none',
                                                    transition: 'background 0.2s',
                                                    fontWeight: '600',
                                                    background: 'rgba(124, 58, 237, 0.08)'
                                                }}
                                                onMouseEnter={(e) => e.target.style.background = 'rgba(124, 58, 237, 0.15)'}
                                                onMouseLeave={(e) => e.target.style.background = 'rgba(124, 58, 237, 0.08)'}
                                            >
                                                🛡️ Admin Panel
                                            </Link>
                                        )}
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsProfileOpen(false)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                padding: '0.75rem 1rem',
                                                borderRadius: 'var(--radius-md)',
                                                color: 'var(--color-text-dark)',
                                                textDecoration: 'none',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = 'var(--color-bg-medium)'}
                                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                        >
                                            <User size={18} />
                                            My Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                padding: '0.75rem 1rem',
                                                borderRadius: 'var(--radius-md)',
                                                color: '#dc2626',
                                                background: 'none',
                                                border: 'none',
                                                width: '100%',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                fontSize: '1rem',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
                                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    )}
                </ul>

                <button
                    className="navbar-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    )
}

export default Navbar
