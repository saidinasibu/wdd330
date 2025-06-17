import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AnimalCard = ({ animal }) => {
    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="h-48 overflow-hidden">
                <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{animal.name}</h3>
                <p className="text-gray-600 italic mb-1">{animal.scientificName}</p>
                <div className="flex justify-between items-center mt-4">
                    <Link
                        to={`/animal/${animal.id}`}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default AnimalCard;