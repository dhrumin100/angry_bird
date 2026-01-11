import { X, MapPin, Calendar, User, Truck, CheckCircle, AlertTriangle, UserCheck, Package, Camera, Clock } from 'lucide-react'
import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

const ReportDetailModal = ({ report, onClose, onUpdateStatus }) => {
    const { fleet, assignTruck } = useAdmin()
    
    // Core Status
    const [status, setStatus] = useState(report.status)
    const [notes, setNotes] = useState('')
    
    // Dispatch Fields
    const [selectedTruck, setSelectedTruck] = useState(report.assigned_truck?._id || '')
    const [teamLead, setTeamLead] = useState(report.assigned_team_lead || '')
    const [priority, setPriority] = useState(report.severity || 'Medium')
    
    // Resolution Verification
    const [afterPhoto, setAfterPhoto] = useState('')
    const [materials, setMaterials] = useState({
        asphalt: '',
        labor_hours: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    if (!report) return null

    const handleSave = async () => {
        setIsSubmitting(true)

        // 1. If truck changed, fleet assignment (optional, for fleet availability logic)
        if (selectedTruck && selectedTruck !== report.assigned_truck?._id) {
             await assignTruck({
                truckId: selectedTruck,
                reportId: report._id,
                priority: priority
             })
        }
        
        // 2. Prepare full update payload
        const updateData = {
            status,
            notes,
            assigned_truck: selectedTruck || undefined,
            assigned_team_lead: teamLead,
            priority: priority,
            materials_used: (status === 'Resolved') ? materials : undefined,
            after_photo: (status === 'Resolved') ? afterPhoto : undefined
        }

        // 3. Update Report
        await onUpdateStatus(report._id, updateData)
        
        setIsSubmitting(false)
        onClose()
    }

    const availableTrucks = fleet.filter(t => t.status === 'Available' || t._id === report.assigned_truck?._id)
    
    // Mock Team Leads (In real app, fetch from AdminContext)
    const teamLeads = ['Ravi Kumar (Team A)', 'Priya Singh (Team B)', 'Amit Patel (Team C)', 'Unassigned']

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)'
        }}>
            <div style={{
                background: 'white', width: '950px', maxHeight: '90vh',
                borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
                {/* Header */}
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>Report Control Center</h2>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontFamily: 'monospace' }}>#{report.reportId || report._id}</span>
                    </div>
                    <button onClick={onClose} style={{ background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'flex' }}>
                        <X size={20} color="#64748b" />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: '40% 60%' }}>
                    
                    {/* Left Column: Visuals & AI */}
                    <div style={{ padding: '1.5rem', borderRight: '1px solid #e2e8f0', background: 'white' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                             <label style={{display: 'block', fontSize:'0.75rem', fontWeight:'600', color:'#64748b', marginBottom:'0.5rem'}}>REPORTED ISSUE</label>
                            <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#f1f5f9', border: '1px solid #e2e8f0', height: '250px' }}>
                                {report.image ? (
                                    <img src={report.image} alt="Report Issue" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No Image</div>
                                )}
                            </div>
                        </div>

                        <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#0369a1', fontWeight: '600' }}>
                                <AlertTriangle size={18} /> AI Analysis
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b' }}>Detected:</span>
                                    <span style={{ fontWeight: '600', color: '#0c4a6e' }}>{report.issueType}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b' }}>Location:</span>
                                    <span style={{ fontWeight: '500', color: '#0c4a6e', textAlign:'right', maxWidth:'60%' }}>{report.location?.address?.slice(0,30)}...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actions */}
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#ffffff' }}>
                        
                        {/* Status & Priority */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#64748b', marginBottom: '0.4rem' }}>
                                    CURRENT STATUS
                                </label>
                                <select 
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight:'500' }}
                                >
                                    <option value="New">New</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#64748b', marginBottom: '0.4rem' }}>
                                    PRIORITY LEVEL
                                </label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                     {['Low', 'Medium', 'High'].map(p => (
                                         <button 
                                            key={p}
                                            onClick={() => setPriority(p)}
                                            style={{ 
                                                flex: 1,
                                                padding: '0.6rem 0.2rem', 
                                                borderRadius: '6px', 
                                                border: `1px solid ${priority === p ? (p==='High'?'#ef4444':p==='Medium'?'#f59e0b':'#10b981') : '#e2e8f0'}`,
                                                background: priority === p ? (p==='High'?'#fee2e2':p==='Medium'?'#ffedd5':'#dcfce7') : 'white',
                                                color: priority === p ? (p==='High'?'#b91c1c':p==='Medium'?'#b45309':'#047857') : '#64748b',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}
                                         >
                                            {p}
                                         </button>
                                     ))}
                                </div>
                            </div>
                        </div>

                        {/* Dispatch Section */}
                        <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                           <h3 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Truck size={16} /> DISPATCH ASSIGNMENT
                           </h3>
                           
                           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.4rem' }}>Assign Vehicle</label>
                                    <select 
                                        value={selectedTruck} 
                                        onChange={(e) => setSelectedTruck(e.target.value)}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                    >
                                        <option value="">-- No Truck --</option>
                                        {availableTrucks.map(truck => (
                                            <option key={truck._id} value={truck._id}>{truck.truckId} ({truck.status})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.4rem' }}>Team Leader</label>
                                    <select 
                                        value={teamLead} 
                                        onChange={(e) => setTeamLead(e.target.value)}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                    >
                                        <option value="">-- Select Lead --</option>
                                        {teamLeads.map(lead => (
                                            <option key={lead} value={lead}>{lead}</option>
                                        ))}
                                    </select>
                                </div>
                           </div>
                           
                           <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.4rem' }}>Instructions / Notes</label>
                                <textarea 
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows="2"
                                    placeholder="e.g. Heavy traffic area, coordinate with police..."
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize:'0.9rem' }}
                                />
                           </div>
                        </div>

                        {/* Resolution Flow (Only if Resolved) */}
                        {status === 'Resolved' && (
                            <div style={{ padding: '1.25rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                                <h3 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <CheckCircle size={16} /> RESOLUTION VERIFICATION
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#166534', marginBottom: '0.4rem' }}>Materials Used (Asphalt kg)</label>
                                        <input 
                                            type="number" 
                                            placeholder="e.g. 50"
                                            value={materials.asphalt}
                                            onChange={e => setMaterials({...materials, asphalt: e.target.value})}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #86efac' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#166534', marginBottom: '0.4rem' }}>Labor Count (Hours)</label>
                                        <input 
                                             type="number" 
                                             placeholder="e.g. 4"
                                             value={materials.labor_hours}
                                             onChange={e => setMaterials({...materials, labor_hours: e.target.value})}
                                             style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #86efac' }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#166534', marginBottom: '0.4rem' }}>Proof of Fix (Photo URL)</label>
                                    <div style={{display:'flex', gap:'0.5rem'}}>
                                        <input 
                                            type="text" 
                                            placeholder="Paste image URL..."
                                            value={afterPhoto}
                                            onChange={e => setAfterPhoto(e.target.value)}
                                            style={{ flex:1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #86efac' }}
                                        />
                                        <button style={{background:'#22c55e', color:'white', border:'none', padding:'0.5rem', borderRadius:'6px'}}><Camera size={16}/></button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={handleSave}
                            disabled={isSubmitting}
                            style={{ 
                                marginTop: 'auto',
                                padding: '1rem', 
                                background: 'linear-gradient(to right, #2563eb, #3b82f6)', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '8px', 
                                fontWeight: '700', 
                                fontSize: '1rem',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                            }}
                        >
                            {isSubmitting ? 'Processing...' : <> <CheckCircle size={20} /> Update & Save Changes </>}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportDetailModal
