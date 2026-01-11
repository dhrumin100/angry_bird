
import { BarChart3, PieChart, Activity, Map, ArrowUp } from 'lucide-react'

const AnalyticsDashboard = () => {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1e293b' }}>System Analytics</h1>
                <p style={{ color: '#64748b' }}>Performance metrics and infrastructure insights</p>
            </div>

            {/* Mock Charts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                
                {/* 1. Resolution Efficiency */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontWeight: '600', color: '#334155' }}>Resolution Efficiency</h3>
                        <Activity size={20} color="#64748b" />
                    </div>
                    {/* Placeholder for Recharts - using visual mock for simplicity now */}
                    <div style={{ height: '250px', display: 'flex', alignItems: 'end', justifyContent: 'space-between', padding: '0 1rem' }}>
                        {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ 
                                    width: '32px', 
                                    height: `${h}%`, 
                                    background: i === 6 ? '#3b82f6' : '#e2e8f0', // Highlight today
                                    borderRadius: '6px' 
                                }}></div>
                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem', color: '#16a34a', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                       <ArrowUp size={14}/> 12% faster than last week
                    </div>
                </div>

                {/* 2. Issue Categories */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontWeight: '600', color: '#334155' }}>Issue Distribution</h3>
                        <PieChart size={20} color="#64748b" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', position: 'relative' }}>
                        {/* CSS Donut Chart */}
                        <div style={{ 
                            width: '180px', height: '180px', borderRadius: '50%', 
                            background: 'conic-gradient(#ef4444 0% 45%, #f59e0b 45% 70%, #3b82f6 70% 100%)',
                            position: 'relative',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                             <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                 <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>Total</span>
                                 <span style={{ fontSize: '0.9rem', color: '#64748b' }}>482 Reports</span>
                             </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div> Potholes (45%)
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div> Drainage (25%)
                        </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></div> Garbage (30%)
                        </div>
                    </div>
                </div>

                {/* 3. Ward Heatmap (Placeholder) */}
                 <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontWeight: '600', color: '#334155' }}>Ward Performance Heatmap</h3>
                        <Map size={20} color="#64748b" />
                    </div>
                    <div style={{ height: '100px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                        Advanced Geospatial Analytics (Tier 2 Feature)
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AnalyticsDashboard
