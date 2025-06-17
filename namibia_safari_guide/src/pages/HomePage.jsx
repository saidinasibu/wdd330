import React, { useState, useEffect } from 'react';
import AnimalCard from '../components/AnimalCard';
import DistanceCalculator from '../components/DistanceCalculator';
import MapComponent from '../components/MapComponent';

const HomePage = () => {
    const [featuredAnimals, setFeaturedAnimals] = useState([]);
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simuler un chargement d'API
        setTimeout(() => {
            setFeaturedAnimals([
                {
                    id: 1,
                    name: 'African Elephant',
                    scientificName: 'Loxodonta africana',
                    image: 'https://images.unsplash.com/photo-1505148230895-d9a785a555fa?q=80',
                    description: 'The largest land animal on Earth'
                },
                {
                    id: 2,
                    name: 'Lion',
                    scientificName: 'Panthera leo',
                    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80',
                    description: 'The king of the savannah'
                },
                {
                    id: 3,
                    name: 'Giraffe',
                    scientificName: 'Giraffa camelopardalis',
                    image: 'https://images.unsplash.com/photo-1534188753412-3e9336736ed8?q=80',
                    description: 'The tallest land animal'
                },
                {
                    id: 4,
                    name: 'Cheetah',
                    scientificName: 'Acinonyx jubatus',
                    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80',
                    description: 'The fastest land animal'
                }
            ]);

            setParks([
                {
                    id: 1,
                    name: 'Etosha National Park',
                    location: { lat: -18.925, lng: 16.335 },
                    description: 'Home to over 100 mammal species and 340 bird species'
                },
                {
                    id: 2,
                    name: 'Namib-Naukluft Park',
                    location: { lat: -24.590, lng: 15.971 },
                    description: 'Features the world\'s oldest desert and highest sand dunes'
                },
                {
                    id: 3,
                    name: 'Skeleton Coast Park',
                    location: { lat: -19.233, lng: 12.717 },
                    description: 'Famous for shipwrecks and desert-adapted wildlife'
                }
            ]);

            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="mb-16">
                <div className="bg-gray-800 text-white rounded-xl p-8 md:p-12 mb-8 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), url(https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80)' }}>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Namibia's Wildlife</h1>
                    <p className="text-xl mb-6">Identify animals, learn their local names, and plan your safari adventure</p>
                    <button className="bg-accent text-tertiary px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors">
                        Start Exploring
                    </button>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary">Featured Animals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredAnimals.map(animal => (
                        <AnimalCard key={animal.id} animal={animal} />
                    ))}
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary">National Parks</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DistanceCalculator parks={parks} />
                    <MapComponent parks={parks} />
                </div>
            </section>

            <section className="bg-secondary rounded-xl p-8 mb-16">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <h2 className="text-3xl font-bold mb-4 text-primary">Local Language Names</h2>
                        <p className="text-lg mb-6">
                            Learn animal names in Oshiwambo, Nama, and other Namibian languages. Connect with the cultural heritage of Namibia.
                        </p>
                        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                            Explore Languages
                        </button>
                    </div>
                    <div className="md:w-1/2">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold">African Elephant</h3>
                                    <p className="text-gray-600">Ondjamba (Oshiwambo)</p>
                                </div>
                            </div>
                            <div className="flex items-center mb-4">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold">Lion</h3>
                                    <p className="text-gray-600">Tau (Nama/Damara)</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold">Giraffe</h3>
                                    <p className="text-gray-600">Onduli (Oshiwambo)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;