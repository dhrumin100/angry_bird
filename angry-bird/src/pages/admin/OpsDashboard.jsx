import { useEffect, useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { Bell, RefreshCw, CheckCircle, Truck, MapPin, AlertCircle, Clock } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import ReportDetailModal from '../../components/admin/ReportDetailModal'
import api from '../../services/api'
import 'leaflet/dist/leaflet.css'

// Fix for Leaflet icons
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const OpsDashboard = () => {
    const { stats, fetchDashboardStats, fleet, fetchFleet, fetchQueue, assignTruck } = useAdmin()
    const [queue, setQueue] = useState([])
    const [selectedReport, setSelectedReport] = useState(null)
    
    const refreshData = () => {
        fetchDashboardStats()
        fetchFleet()
        fetchQueue().then(data => setQueue(data))
    }

    useEffect(() => {
        fetchQueue()
        
        // Auto-refresh every 10 seconds to keep admin view live
        const intervalId = setInterval(() => {
            fetchQueue()
        }, 10000)

        return () => clearInterval(intervalId)
    }, [])

    const handleReportClick = (report) => {
        setSelectedReport(report)
    }

    const handleUpdateStatus = async (id, updateData) => {
        try {
            await api.put(`/submissions/${id}/status`, updateData)
            refreshData() // Refresh list to remove if resolved or update status
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    const KPICard = ({ label, value, icon: Icon, color, trend }) => (
        <div style={{ 
            background: 'white', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>{label}</div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginTop: '0.25rem' }}>{value}</div>
                </div>
                <div style={{ 
                    padding: '0.75rem', 
                    background: `${color}15`, 
                    borderRadius: '12px',
                    color: color
                }}>
                    <Icon size={24} />
                </div>
            </div>
            {trend && (
                <div style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: '500' }}>
                    {trend} vs yesterday
                </div>
            )}
        </div>
    )

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-800">Operations Control</h1>
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200 animate-pulse">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        LIVE
                    </span>
                </div>
                {/* The original p tag content was here, assuming it should be a sibling to the title block */}
                <p style={{ color: '#64748b' }}>Real-time overview of city infrastructure and fleet</p>
            </div>
            
            {/* KPI Grid */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <KPICard 
                    label="Pending Reports" 
                    value={stats?.pending?.count || 47} 
                    icon={Bell} 
                    color="#f59e0b"
                    trend={stats?.pending?.trend || "+12%"}
                />
                <KPICard 
                    label="In Progress" 
                    value={stats?.inProgress?.count || 23} 
                    icon={RefreshCw} 
                    color="#3b82f6"
                    trend={null}
                />
                 <KPICard 
                    label="Resolved Today" 
                    value={stats?.resolvedToday?.count || 156} 
                    icon={CheckCircle} 
                    color="#22c55e"
                    trend="+8%"
                />
                 <KPICard 
                    label="Active Fleet" 
                    value={stats?.fleetStatus?.active || '12/15'} 
                    icon={Truck} 
                    color="#6366f1"
                    trend={null}
                />
            </div>

            {/* Split View: Live Map & Queue */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '1.5rem', height: '600px' }}>
                {/* Map Section */}
                <div style={{ 
                    background: 'white', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <h3 style={{ fontWeight: '600', color: '#1e293b' }}>Live Dispatch Map</h3>
                         <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Mumbai Central</div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <MapContainer center={[19.0760, 72.8777]} zoom={11} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {/* Real Queue Markers */}
                            {queue.map(report => (
                                report.location && report.location.lat && (
                                    <Marker 
                                        key={report._id} 
                                        position={[report.location.lat, report.location.lng]}>
                                        <Popup>
                                            <strong>{report.reportId}</strong><br />
                                            {report.severity} Severity<br />
                                            {report.issueType}
                                        </Popup>
                                    </Marker>
                                )
                            ))}
                        </MapContainer>
                    </div>
                </div>

                {/* Queue Section */}
                <div style={{ 
                    background: 'white', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                     <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <h3 style={{ fontWeight: '600', color: '#1e293b' }}>Priority Queue</h3>
                         <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: '#ffe4e6', color: '#e11d48', borderRadius: '20px', fontWeight: '600' }}>
                            {queue.filter(r => r.severity === 'High').length} Critical
                         </span>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
                        {queue.length > 0 ? queue.map((report) => (
                            <div key={report._id} 
                            onClick={() => handleReportClick(report)}
                            style={{ 
                                padding: '1rem 1.5rem', 
                                borderBottom: '1px solid #f1f5f9',
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'start',
                                cursor: 'pointer',
                                transition: 'background 0.2s',
                                background: selectedReport?._id === report._id ? '#f0f9ff' : 'transparent'
                            }}
                            onMouseEnter={(e) => { if (selectedReport?._id !== report._id) e.currentTarget.style.background = '#f8fafc' }}
                            onMouseLeave={(e) => { if (selectedReport?._id !== report._id) e.currentTarget.style.background = 'white' }}
                            >
                                <div style={{ 
                                    padding: '0.5rem', 
                                    background: report.severity==='High' ? '#fee2e2' : '#ffedd5', 
                                    borderRadius: '8px',
                                    color: report.severity==='High' ? '#dc2626' : '#d97706'
                                }}>
                                    <AlertCircle size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <div style={{ fontWeight: '600', color: '#334155' }}>{report.reportId || 'N/A'}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                            {new Date(report.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                        {report.location?.address ? report.location.address.slice(0, 30) + '...' : 'No Address'}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.5rem', background: '#e2e8f0', color: '#475569', borderRadius: '4px' }}>
                                            {report.issueType}
                                        </span>
                                        <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.5rem', background: '#e2e8f0', color: '#475569', borderRadius: '4px' }}>
                                            {report.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No pending reports</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedReport && (
                <ReportDetailModal 
                    report={selectedReport} 
                    onClose={() => setSelectedReport(null)} 
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </div>
    )
}

export default OpsDashboard
