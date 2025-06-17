import React, { useState, useEffect } from 'react';
import { loadGoogleMaps, calculateDistance } from '../services/mapsService';

const DistanceCalculator = ({ parks }) => {
    const [fromPark, setFromPark] = useState('');
    const [toPark, setToPark] = useState('');
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (parks.length > 1) {
            setFromPark(parks[0].id);
            setToPark(parks[1].id);
        }
        loadGoogleMaps();
    }, [parks]);

    const handleCalculate = async () => {
        if (!fromPark || !toPark) return;

        setLoading(true);
        try {
            const origin = parks.find(p => p.id === fromPark);
            const destination = parks.find(p => p.id === toPark);

            const result = await calculateDistance(origin.location, destination.location);

            if (result) {
                setDistance(result.distance.text);
                setDuration(result.duration.text);
            }
        } catch (error) {
            console.error('Error calculating distance:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-primary mb-4">Calculate Distance Between Parks</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-1">From:</label>
                    <select
                        value={fromPark}
                        onChange={(e) => setFromPark(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        {parks.map(park => (
                            <option key={park.id} value={park.id}>
                                {park.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">To:</label>
                    <select
                        value={toPark}
                        onChange={(e) => setToPark(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        {parks.map(park => (
                            <option key={park.id} value={park.id}>
                                {park.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                onClick={handleCalculate}
                disabled={loading}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark disabled:opacity-50 w-full"
            >
                {loading ? 'Calculating...' : 'Calculate Distance'}
            </button>

            {distance && duration && (
                <div className="mt-4 p-4 bg-white rounded shadow">
                    <p className="font-medium"><span className="text-primary">Distance:</span> {distance}</p>
                    <p className="font-medium"><span className="text-primary">Duration:</span> {duration}</p>
                </div>
            )}
        </div>
    );
};

export default DistanceCalculator;