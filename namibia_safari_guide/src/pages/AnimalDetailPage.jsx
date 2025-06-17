import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const AnimalDetailPage = () => {
    const { id } = useParams();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [localNames, setLocalNames] = useState({});

    useEffect(() => {
        // Simuler un chargement d'API
        setTimeout(() => {
            setAnimal({
                id: id,
                name: 'African Elephant',
                scientificName: 'Loxodonta africana',
                image: 'https://images.unsplash.com/photo-1505148230895-d9a785a555fa?q=80',
                description: 'The African elephant is the largest land animal on Earth. These intelligent animals live in family groups led by a matriarch and can be found throughout Namibia\'s national parks. They are known for their large ears, long trunks, and impressive tusks.',
                habitat: 'Savannas, forests, deserts, and marshes. Commonly seen in Etosha National Park.',
                conservationStatus: 'Vulnerable',
                funFacts: [
                    'Elephants can communicate over long distances using infrasound',
                    'They have the longest pregnancy of any mammal - 22 months',
                    'An elephant\'s trunk has over 40,000 muscles',
                    'Elephants can recognize themselves in mirrors'
                ],
                parks: [
                    {
                        id: 1,
                        name: 'Etosha National Park',
                        bestTime: 'Year-round at waterholes'
                    },
                    {
                        id: 2,
                        name: 'Waterberg Plateau Park',
                        bestTime: 'Dry season (May-October)'
                    }
                ]
            });

            setLocalNames({
                oshiwambo: 'Ondjamba',
                nama: 'ǂGûb',
                herero: 'Ozongombe'
            });

            setLoading(false);
        }, 800);
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!animal) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold">Animal not found</h2>
                <p className="mt-4">The animal you're looking for doesn't exist in our database.</p>
                <Link to="/" className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg">
                    Back to Home
                </Link>
            </div>
        );
    }

    const favorite = isFavorite(animal.id);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link to="/" className="text-primary hover:underline">&larr; Back to Animals</Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-2/5">
                        <div className="h-96 md:h-full bg-gray-200 border-2 border-dashed rounded-xl w-full" />
                    </div>

                    <div className="md:w-3/5 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{animal.name}</h1>
                                <p className="text-xl italic text-gray-600 mt-1">{animal.scientificName}</p>
                            </div>

                            <button
                                onClick={() => favorite ? removeFavorite(animal.id) : addFavorite(animal)}
                                className={`p-2 rounded-full ${favorite ? 'text-red-500' : 'text-gray-400'}`}
                                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-bold text-primary mb-2">Description</h2>
                            <p className="text-gray-700">{animal.description}</p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-xl font-bold text-primary mb-2">Habitat</h2>
                                <p className="text-gray-700">{animal.habitat}</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-primary mb-2">Conservation Status</h2>
                                <p className="text-gray-700">{animal.conservationStatus}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-bold text-primary mb-2">Local Names</h2>
                            <div className="bg-secondary rounded-lg p-4">
                                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <li>
                                        <span className="font-semibold">Oshiwambo:</span> {localNames.oshiwambo}
                                    </li>
                                    <li>
                                        <span className="font-semibold">Nama/Damara:</span> {localNames.nama}
                                    </li>
                                    <li>
                                        <span className="font-semibold">Herero:</span> {localNames.herero}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t">
                    <h2 className="text-2xl font-bold text-primary mb-4">Fun Facts</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {animal.funFacts.map((fact, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-accent mr-2">•</span>
                                <span>{fact}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-6 border-t">
                    <h2 className="text-2xl font-bold text-primary mb-4">Where to See</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {animal.parks.map(park => (
                            <div key={park.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold">{park.name}</h3>
                                    <p className="text-gray-600 mt-1">Best viewing: {park.bestTime}</p>
                                    <button className="mt-3 text-primary hover:underline">
                                        View Park Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalDetailPage;