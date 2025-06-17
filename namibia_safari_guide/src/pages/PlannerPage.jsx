import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';

const PlannerPage = () => {
    const [startPoint, setStartPoint] = useState('');
    const [destination, setDestination] = useState('');
    const [travelDate, setTravelDate] = useState('');
    const [travelers, setTravelers] = useState(1);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);

    const parks = [
        { id: 'etosha', name: 'Etosha National Park', location: [-18.925, 16.335] },
        { id: 'namib', name: 'Namib-Naukluft Park', location: [-24.590, 15.971] },
        { id: 'skeleton', name: 'Skeleton Coast Park', location: [-19.233, 12.717] },
        { id: 'waterberg', name: 'Waterberg Plateau Park', location: [-20.458, 17.290] }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulation de calcul de distance
        setDistance('480 km');
        setDuration('6 hours');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">Safari Trip Planner</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-6 text-primary">Plan Your Trip</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="startPoint">
                                    Starting Point
                                </label>
                                <select
                                    id="startPoint"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={startPoint}
                                    onChange={(e) => setStartPoint(e.target.value)}
                                    required
                                >
                                    <option value="">Select starting point</option>
                                    <option value="windhoek">Windhoek</option>
                                    <option value="swakopmund">Swakopmund</option>
                                    {parks.map(park => (
                                        <option key={park.id} value={park.id}>
                                            {park.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="destination">
                                    Destination
                                </label>
                                <select
                                    id="destination"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    required
                                >
                                    <option value="">Select destination</option>
                                    {parks.map(park => (
                                        <option key={park.id} value={park.id}>
                                            {park.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="travelDate">
                                        Travel Date
                                    </label>
                                    <input
                                        type="date"
                                        id="travelDate"
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={travelDate}
                                        onChange={(e) => setTravelDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="travelers">
                                        Travelers
                                    </label>
                                    <input
                                        type="number"
                                        id="travelers"
                                        min="1"
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={travelers}
                                        onChange={(e) => setTravelers(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-bold"
                            >
                                Plan My Safari
                            </button>
                        </form>

                        {distance && duration && (
                            <div className="mt-6 p-4 bg-secondary rounded-lg">
                                <h3 className="text-lg font-bold mb-2 text-primary">Route Information</h3>
                                <p><span className="font-semibold">Distance:</span> {distance}</p>
                                <p><span className="font-semibold">Estimated Duration:</span> {duration}</p>
                                <p><span className="font-semibold">Best Season:</span> Dry season (May - October)</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-6 text-primary">Your Safari Map</h2>
                        <MapComponent
                            parks={parks}
                            position={destination ? parks.find(p => p.id === destination)?.location : undefined}
                            zoom={destination ? 8 : 6}
                        />

                        <div className="mt-8">
                            <h3 className="text-xl font-bold mb-4 text-primary">Wildlife Checklist</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Elephant', 'Lion', 'Giraffe', 'Cheetah', 'Rhino', 'Zebra', 'Oryx', 'Hyena'].map(animal => (
                                    <div key={animal} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={animal.toLowerCase()}
                                            className="mr-2 h-5 w-5 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor={animal.toLowerCase()} className="text-gray-700">
                                            {animal}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlannerPage;