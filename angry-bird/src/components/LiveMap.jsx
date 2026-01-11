import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState, useEffect } from 'react'

const LiveMap = () => {
    const [userLocation, setUserLocation] = useState(null)
    const [others, setOthers] = useState([])

    useEffect(() => {
        // Mock getting current location (default to a central city location if geolocation fails/not used)
        // Using a fixed location for demo purposes to ensure map looks good
        const center = [28.6139, 77.2090] // New Delhi
        setUserLocation(center)

        // Generate mock "other users"
        const mockUsers = []
        for (let i = 0; i < 5; i++) {
            mockUsers.push({
                id: i,
                lat: 28.6139 + (Math.random() - 0.5) * 0.05,
                lng: 77.2090 + (Math.random() - 0.5) * 0.05,
                name: `Citizen ${Math.floor(Math.random() * 1000)}`
            })
        }
        setOthers(mockUsers)
    }, [])

    if (!userLocation) return <div>Loading Map...</div>

    return (
        <div style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <MapContainer center={userLocation} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Current User */}
                <Marker position={userLocation}>
                    <Popup>
                        You are here <br /> Live Tracking Active
                    </Popup>
                </Marker>

                {/* Other Users */}
                {others.map(user => (
                    <Marker key={user.id} position={[user.lat, user.lng]}>
                        <Popup>
                            {user.name} <br /> Active Now
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default LiveMap
