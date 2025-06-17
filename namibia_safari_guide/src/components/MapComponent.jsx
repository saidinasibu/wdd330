import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Correction pour les icônes manquantes
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = ({ position, zoom, parks }) => {
    // Position par défaut (Windhoek)
    const defaultPosition = [-22.5609, 17.0658];

    return (
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <MapContainer
                center={position || defaultPosition}
                zoom={zoom || 6}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {parks && parks.map(park => (
                    <Marker
                        key={park.id}
                        position={[park.location.lat, park.location.lng]}
                    >
                        <Popup>
                            <div className="font-bold text-primary">{park.name}</div>
                            <p className="text-sm">{park.description.substring(0, 100)}...</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;