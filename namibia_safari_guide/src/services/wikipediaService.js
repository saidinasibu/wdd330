import axios from 'axios';

export const getAnimalInfo = async (animalName) => {
    try {
        const response = await axios.get(
            'https://en.wikipedia.org/w/api.php',
            {
                params: {
                    action: 'query',
                    format: 'json',
                    prop: 'extracts|pageimages',
                    titles: animalName,
                    exintro: 1,
                    explaintext: 1,
                    pithumbsize: 500,
                    origin: '*'
                }
            }
        );

        // Extraire les données de la réponse
        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];
        return pages[pageId];
    } catch (error) {
        console.error('Error fetching Wikipedia data:', error);
        return null;
    }
};

export const getLocalNames = async (animalName) => {
    // Dans une application réelle, on utiliserait une API ou une base de données
    // Pour l'exemple, nous retournons des noms statiques
    return new Promise((resolve) => {
        setTimeout(() => {
            const names = {
                elephant: {
                    oshiwambo: 'Ondjamba',
                    nama: 'ǂGûb',
                    herero: 'Ozongombe'
                },
                lion: {
                    oshiwambo: 'Nkoshi',
                    nama: 'Khob',
                    herero: 'Ombara'
                },
                // Ajouter d'autres animaux au besoin
            };

            resolve(names[animalName.toLowerCase()] || {});
        }, 500);
    });
};