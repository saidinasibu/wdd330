// Animals data
const animals = [
    {
        "id": 1,
        "name": "🦌 The Oryx - Symbol of Namibia’s Desert Strength",
        "url_photo": "Gemsbok.webp",
        "description": "Also called the gemsbok, the oryx is Namibia’s national animal. With long, sharp horns and a striking face, it survives extreme heat and arid landscapes, especially in the Namib Desert and Etosha’s savannahs."
    },
    {
        "id": 2,
        "name": "🐘 Elephant - The Gentle Giant",
        "url_photo": "elephant.webp",
        "description": "The African elephant is the largest land mammal, known for its intelligence, memory, and strong social bonds. In Namibia, desert-adapted elephants thrive in dry regions like Damaraland, showcasing their ability to survive in harsh environments."
    },
    {
        "id": 3,
        "name": "🦁 Lion - The King of the Wild",
        "url_photo": "lion.webp",
        "description": "Powerful and majestic, the lion is one of Namibia’s top predators. From the open plains of Etosha to the remote deserts of the northwest, even desert-adapted lions roam the land — fierce yet iconic symbols of Africa."
    },
    {
        "id": 4,
        "name": "🦏 Rhino - Ancient and Endangered",
        "url_photo": "rhino.webp",
        "description": "Namibia protects both black and white rhinos, with the largest population of free-roaming black rhinos in the world. These powerful herbivores are a conservation success story and a rare sight on safari."
    },
    {
        "id": 5,
        "name": "🐆 Cheetah - Master of Speed",
        "url_photo": "cheetah.webp",
        "description": "The cheetah is the fastest land animal, capable of reaching 110 km/h in short bursts. Namibia hosts the largest wild cheetah population, found mostly in open farmlands and private reserves."
    },
    {
        "id": 6,
        "name": "🦒 Giraffe - Tall and Graceful",
        "url_photo": "giraffe.webp",
        "description": "With their towering height and gentle movement, giraffes are peaceful browsers found across Namibia’s woodlands and savannahs. Watching them walk at sunset is a truly magical safari moment."
    },
    {
        "id": 7,
        "name": "🐍 Boomslang - The Elusive Tree Snake",
        "url_photo": "Boomslang.webp",
        "description": "This shy, highly venomous snake lives in trees and bushes. Though rarely seen, the boomslang is fascinating and plays an important role in the ecosystem."
    }
];

// Parks data
const parks = [
    {
        "id": 1,
        "name": "Etosha National Park",
        "url_photo": "Etosha.webp",
        "description": "One of Africa’s premier wildlife reserves, Etosha features vast salt pans attracting abundant animals including lions, elephants, and rhinos."
    },
    {
        "id": 2,
        "name": "Namib-Naukluft National Park",
        "url_photo": "NamibNaukluft.webp",
        "description": "Home to the world’s highest sand dunes and breathtaking desert landscapes."
    },
    {
        "id": 3,
        "name": "Skeleton Coast National Park",
        "url_photo": "SkeletonCoast.webp",
        "description": "A rugged, remote coastline known for shipwrecks and desert-adapted wildlife."
    },
    {
        "id": 4,
        "name": "Bwabwata National Park",
        "url_photo": "Bwabwata.webp",
        "description": "A biodiversity hotspot located in northeastern Namibia with a mix of savannah and forest."
    },
    {
        "id": 5,
        "name": "Namib Desert",
        "url_photo": "NamibDesert.webp",
        "description": "The world’s oldest desert featuring unique flora and fauna adapted to extreme conditions."
    }
];

// Create card elements for animals and parks
function createCard(item) {
    const card = document.createElement('article');
    card.classList.add('card');

    const img = document.createElement('img');
    img.classList.add('card-image');
    img.src = `images/${item.url_photo}`;
    img.alt = item.name;

    const content = document.createElement('div');
    content.classList.add('card-content');

    const title = document.createElement('h3');
    title.classList.add('card-title');
    title.textContent = item.name;

    const description = document.createElement('p');
    description.classList.add('card-description');
    description.textContent = item.description;

    content.appendChild(title);
    content.appendChild(description);
    card.appendChild(img);
    card.appendChild(content);

    return card;
}

// Load cards only on wildlife.html
function loadCards() {
    const animalContainer = document.getElementById('animal_cards');
    const parkContainer = document.getElementById('park_cards');
    if (animalContainer && parkContainer) {
        animals.forEach(animal => animalContainer.appendChild(createCard(animal)));
        parks.forEach(park => parkContainer.appendChild(createCard(park)));
    }
}

document.addEventListener('DOMContentLoaded', loadCards);
