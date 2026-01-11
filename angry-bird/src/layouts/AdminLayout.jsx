import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import { 
    LayoutDashboard, 
    Truck, 
    BarChart3, 
    Settings, 
    LogOut, 
    Bell, 
    Search,
    Map
} from 'lucide-react'

const AdminLayout = () => {
    const { adminUser, logoutAdmin } = useAdmin()
    const location = useLocation()
    const navigate = useNavigate()

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Operations' },
        { path: '/admin/fleet', icon: Truck, label: 'Fleet & Dispatch' },
        { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' }
    ]

    const handleLogout = () => {
        logoutAdmin()
        navigate('/admin/login')
    }

    // Redirect if not logged in
    if (!adminUser) {
        // You would ideally handle this with a ProtectedRoute wrapper, 
        // but simple redirect works for the layout check too
        // navigate('/admin/login') // Do not call navigate in render
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
            {/* Sidebar */}
            <aside style={{ 
                width: '260px', 
                background: '#0f172a', 
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 50
            }}>
                <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ 
                        width: '36px', height: '36px', 
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        borderRadius: '8px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>K</span>
                    </div>
                    <div>
                        <div style={{ fontWeight: '700', letterSpacing: '0.5px' }}>KAVAACH</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Admin Console</div>
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '1.5rem 1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path
                            return (
                                <Link 
                                    key={item.path} 
                                    to={item.path}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        color: isActive ? 'white' : '#94a3b8',
                                        background: isActive ? '#3b82f6' : 'transparent',
                                        textDecoration: 'none',
                                        fontWeight: isActive ? '600' : '400',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </div>
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                            {adminUser?.name?.charAt(0) || 'A'}
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adminUser?.name || 'Admin'}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{adminUser?.role || 'Super Admin'}</div>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem',
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            justifyContent: 'center'
                        }}
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Top Header */}
                <header style={{ 
                    height: '64px', 
                    background: 'white', 
                    borderBottom: '1px solid #e2e8f0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '0 2rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 40
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
                        <Search size={20} />
                        <input 
                            type="text" 
                            placeholder="Search reports, drivers, or locations..." 
                            style={{ 
                                border: 'none', 
                                outline: 'none', 
                                fontSize: '0.95rem', 
                                width: '300px',
                                color: '#1e293b'
                            }} 
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b', background: '#f8fafc', padding: '0.4rem 0.8rem', borderRadius: '20px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                            System Operational
                        </div>
                        <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                            <Bell size={20} />
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
