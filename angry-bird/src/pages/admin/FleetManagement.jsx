import { useEffect, useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { Truck, MapPin, Search, Wrench, CheckCircle, Navigation } from 'lucide-react'

const FleetManagement = () => {
    const { fleet, fetchFleet, assignTruck } = useAdmin()
    const [selectedTruck, setSelectedTruck] = useState(null)
    
    useEffect(() => {
        fetchFleet()
    }, [])

    const getStatusColor = (status) => {
        switch(status) {
            case 'Available': return { bg: '#dcfce7', text: '#16a34a' }
            case 'En Route': return { bg: '#dbeafe', text: '#2563eb' }
            case 'On-Site': return { bg: '#ffedd5', text: '#d97706' }
            case 'Offline/Maintenance': return { bg: '#f1f5f9', text: '#64748b' }
            default: return { bg: '#f1f5f9', text: '#64748b' }
        }
    }

    return (
        <div>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1e293b' }}>Fleet Management</h1>
                    <p style={{ color: '#64748b' }}>Track active vehicles and manage dispatch assignments</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', borderRadius: '8px', border: 'none' }}>
                    + Add New Vehicle
                </button>
            </div>

            {/* Overview Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                    { label: 'Total Fleet', value: '15 Trucks' },
                    { label: 'Active Now', value: fleet.filter(t => t.status !== 'Offline/Maintenance').length || 12, color: '#22c55e' },
                    { label: 'En Route', value: fleet.filter(t => t.status === 'En Route').length || 4, color: '#3b82f6' },
                    { label: 'In Maintenance', value: fleet.filter(t => t.status === 'Offline/Maintenance').length || 2, color: '#ef4444' }
                ].map((stat, idx) => (
                    <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                        <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{stat.label}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: stat.color || '#1e293b' }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Fleet List */}
            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.85rem', color: '#64748b' }}>Truck ID</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#64748b' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#64748b' }}>Driver</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#64748b' }}>Location</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#64748b' }}>Fuel</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#64748b' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fleet.length > 0 ? fleet.map(truck => {
                            const statusStyle = getStatusColor(truck.status)
                            return (
                                <tr key={truck.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: '#334155' }}>{truck.truckId}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ 
                                            padding: '0.25rem 0.75rem', 
                                            background: statusStyle.bg, 
                                            color: statusStyle.text, 
                                            borderRadius: '20px', 
                                            fontSize: '0.75rem', 
                                            fontWeight: '600' 
                                        }}>
                                            {truck.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', color: '#64748b' }}>{truck.driverName}</td>
                                    <td style={{ padding: '1rem', color: '#64748b' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <MapPin size={14} /> {truck.currentLocation?.address || 'Unknown'}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ width: `${truck.fuelLevel || 80}%`, height: '100%', background: truck.fuelLevel < 20 ? '#ef4444' : '#22c55e' }}></div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            )
                        }) : (
                            // Mock Data fallback if fleet is empty
                             Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: '#334155' }}>Truck-0{i+1}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ 
                                            padding: '0.25rem 0.75rem', 
                                            background: i%2===0 ? '#dcfce7' : '#dbeafe', 
                                            color: i%2===0 ? '#16a34a' : '#2563eb', 
                                            borderRadius: '20px', 
                                            fontSize: '0.75rem', 
                                            fontWeight: '600' 
                                        }}>
                                            {i%2===0 ? 'Available' : 'En Route'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', color: '#64748b' }}>Ravi Kumar</td>
                                    <td style={{ padding: '1rem', color: '#64748b' }}>Andheri East, Mumbai</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ width: '75%', height: '100%', background: '#22c55e' }}></div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FleetManagement
