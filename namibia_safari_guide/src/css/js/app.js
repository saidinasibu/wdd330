// App State
let currentTheme = 'light';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let map, directionsService, directionsRenderer;

// DOM Elements
const pageContent = document.getElementById('page-content');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Page templates
const pageTemplates = {
    home: `
        <div class="hero">
            <div class="hero-content">
                <h2>Discover the Wildlife of Namibia</h2>
                <p>Your ultimate guide to exploring Namibia's national parks and wildlife. Identify animals, plan your safari trip, and experience the beauty of Namibian nature.</p>
                <div class="hero-buttons">
                    <a href="#" class="btn" data-target="animals">Explore Animals</a>
                    <a href="#" class="btn btn-secondary" data-target="planner">Plan Your Trip</a>
                </div>
            </div>
        </div>
        
        <div class="container">
            <div class="section-title">
                <h2>Featured Animals</h2>
            </div>
            
            <div class="animal-grid" id="featured-animals"></div>
        </div>
        
        <div class="planner-section">
            <div class="container">
                <div class="section-title">
                    <h2>Plan Your Safari Trip</h2>
                </div>
                
                <div class="planner-container">
                    <p>Calculate distances between Namibia's national parks to plan your perfect safari itinerary.</p>
                    <div class="input-group">
                        <div class="input-row">
                            <div class="input-field">
                                <label for="from-park">From Park:</label>
                                <select id="from-park">
                                    <option value="">Select a park</option>
                                    ${parks.map(park => `<option value="${park.name}">${park.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="input-field">
                                <label for="to-park">To Park:</label>
                                <select id="to-park">
                                    <option value="">Select a park</option>
                                    ${parks.map(park => `<option value="${park.name}">${park.name}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        <button class="btn" id="calculate-btn">Calculate Distance</button>
                    </div>
                    
                    <div id="map-container" class="map-container"></div>
                    
                    <div class="results" id="results" style="display: none;">
                        <h3>Travel Information</h3>
                        <div class="result-item">
                            <i class="fas fa-road"></i>
                            <span>Distance: <span id="distance-result">-</span></span>
                        </div>
                        <div class="result-item">
                            <i class="fas fa-clock"></i>
                            <span>Duration: <span id="duration-result">-</span></span>
                        </div>
                        <div class="result-item">
                            <i class="fas fa-car"></i>
                            <span>Recommended route: <span id="route-result">-</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    animals: `
        <div class="container">
            <div class="section-title">
                <h2>Namibian Wildlife</h2>
            </div>
            
            <div class="animal-grid" id="all-animals"></div>
        </div>
    `,

    'animal-detail': `
        <div class="container detail-container">
            <a href="#" class="back-btn" id="back-to-animals">
                <i class="fas fa-arrow-left"></i> Back to Animals
            </a>
            
            <div class="detail-header">
                <div class="animal-image">
                    <img id="detail-image" src="" alt="Animal">
                </div>
                <div class="animal-info">
                    <h2 id="detail-name"></h2>
                    <div class="local-names" id="detail-local-names"></div>
                    <p class="description" id="detail-description"></p>
                    
                    <div class="fun-facts">
                        <h3><i class="fas fa-lightbulb"></i> Interesting Facts</h3>
                        <ul id="detail-facts"></ul>
                    </div>
                    
                    <button class="btn" id="add-favorite-btn">
                        <i class="far fa-heart"></i> Add to Favorites
                    </button>
                </div>
            </div>
        </div>
    `,

    parks: `
        <div class="container">
            <div class="section-title">
                <h2>National Parks of Namibia</h2>
            </div>
            
            <div class="park-cards" id="park-cards"></div>
        </div>
    `,

    planner: `
        <div class="planner-section">
            <div class="container">
                <div class="section-title">
                    <h2>Safari Trip Planner</h2>
                </div>
                
                <div class="planner-container">
                    <p>Plan your safari adventure by calculating distances between Namibia's national parks.</p>
                    <div class="input-group">
                        <div class="input-row">
                            <div class="input-field">
                                <label for="planner-from">From Park:</label>
                                <select id="planner-from">
                                    <option value="">Select a park</option>
                                    ${parks.map(park => `<option value="${park.name}">${park.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="input-field">
                                <label for="planner-to">To Park:</label>
                                <select id="planner-to">
                                    <option value="">Select a park</option>
                                    ${parks.map(park => `<option value="${park.name}">${park.name}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        <button class="btn" id="planner-calculate-btn">Calculate Distance</button>
                    </div>
                    
                    <div id="planner-map" class="map-container"></div>
                    
                    <div class="results" id="planner-results" style="display: none;">
                        <h3>Travel Information</h3>
                        <div class="result-item">
                            <i class="fas fa-road"></i>
                            <span>Distance: <span id="planner-distance">-</span></span>
                        </div>
                        <div class="result-item">
                            <i class="fas fa-clock"></i>
                            <span>Duration: <span id="planner-duration">-</span></span>
                        </div>
                        <div class="result-item">
                            <i class="fas fa-car"></i>
                            <span>Recommended route: <span id="planner-route">-</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    favorites: `
        <div class="favorites-section">
            <div class="container">
                <div class="section-title">
                    <h2>Your Favorites</h2>
                </div>
                
                <div id="favorites-message" style="text-align: center; margin-bottom: 2rem; display: none;">
                    <p>You haven't added any favorites yet. Browse animals and click the heart icon to add them to your favorites.</p>
                    <a href="#" class="btn" data-target="animals">Browse Animals</a>
                </div>
                
                <div class="animal-grid" id="favorites-grid"></div>
            </div>
        </div>
    `
};

// Initialize the application
function initApp() {
    // Load home page by default
    navigateToPage('home');
    setupEventListeners();
    initMap();
}

// Navigate to page
function navigateToPage(pageId) {
    // Update page content
    pageContent.innerHTML = pageTemplates[pageId];

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.target === pageId) {
            link.classList.add('active');
        }
    });

    // Load page-specific content
    switch (pageId) {
        case 'home':
            renderFeaturedAnimals();
            setupDistanceCalculator();
            break;
        case 'animals':
            renderAllAnimals();
            break;
        case 'animal-detail':
            // Will be handled by showAnimalDetail
            break;
        case 'parks':
            renderParkCards();
            break;
        case 'planner':
            setupPlanner();
            break;
        case 'favorites':
            renderFavorites();
            break;
    }
}

// Render featured animals on home page
function renderFeaturedAnimals() {
    const container = document.getElementById('featured-animals');
    if (!container) return;

    // Get first 4 animals
    const featured = animals.slice(0, 4);
    container.innerHTML = featured.map(animal => createAnimalCard(animal)).join('');
}

// Render all animals on animals page
function renderAllAnimals() {
    const container = document.getElementById('all-animals');
    if (!container) return;

    container.innerHTML = animals.map(animal => createAnimalCard(animal)).join('');
}

// Render park cards
function renderParkCards() {
    const container = document.getElementById('park-cards');
    if (!container) return;

    container.innerHTML = parks.map(park => `
        <div class="park-card">
            <img src="${park.imageUrl}" alt="${park.name}">
            <div class="park-card-content">
                <h3>${park.name}</h3>
                <p>${park.description}</p>
                
                <div class="park-info">
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${park.location}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <span>${park.hours}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span>${park.contact}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-expand-arrows-alt"></i>
                        <span>${park.size}</span>
                    </div>
                </div>
                
                <div class="info-item">
                    <i class="fas fa-paw"></i>
                    <span><strong>Animals:</strong> ${park.animals.join(', ')}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Render favorites
function renderFavorites() {
    const container = document.getElementById('favorites-grid');
    const message = document.getElementById('favorites-message');

    if (!container || !message) return;

    if (favorites.length === 0) {
        message.style.display = 'block';
        container.style.display = 'none';
    } else {
        message.style.display = 'none';
        container.style.display = 'grid';
        container.innerHTML = favorites.map(id => {
            const animal = animals.find(a => a.id === id);
            return createAnimalCard(animal);
        }).join('');
    }
}

// Create animal card HTML
function createAnimalCard(animal) {
    const isFavorite = favorites.includes(animal.id);
    const localNames = Object.entries(animal.localNames)
        .map(([lang, name]) => `<strong>${lang}:</strong> ${name}`)
        .join(', ');

    return `
        <div class="animal-card">
            <img src="${animal.imageUrl}" alt="${animal.name}">
            <div class="animal-card-content">
                <h3>${animal.name}</h3>
                <div class="local-names">${localNames}</div>
                <p>${animal.description.substring(0, 150)}...</p>
                <div class="animal-card-actions">
                    <button class="btn" data-animal-id="${animal.id}">View Details</button>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-animal-id="${animal.id}">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Show animal details
function showAnimalDetail(animalId) {
    const animal = animals.find(a => a.id === animalId);
    if (!animal) return;

    navigateToPage('animal-detail');

    // Update detail page after a small delay to allow DOM update
    setTimeout(() => {
        document.getElementById('detail-name').textContent = animal.name;

        const localNames = Object.entries(animal.localNames)
            .map(([lang, name]) => `<strong>${lang}:</strong> ${name}`)
            .join(', ');
        document.getElementById('detail-local-names').innerHTML = localNames;

        document.getElementById('detail-description').textContent = animal.description;
        document.getElementById('detail-image').src = animal.imageUrl;
        document.getElementById('detail-image').alt = animal.name;

        const factsList = document.getElementById('detail-facts');
        factsList.innerHTML = animal.funFacts.map(fact => `<li>${fact}</li>`).join('');

        // Update favorite button
        const isFavorite = favorites.includes(animal.id);
        const addFavoriteBtn = document.getElementById('add-favorite-btn');
        if (addFavoriteBtn) {
            addFavoriteBtn.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> ${isFavorite ? 'Remove from' : 'Add to'} Favorites`;
            addFavoriteBtn.onclick = () => toggleFavorite(animal.id);
        }

        // Set up back button
        const backBtn = document.getElementById('back-to-animals');
        if (backBtn) {
            backBtn.onclick = (e) => {
                e.preventDefault();
                navigateToPage('animals');
            };
        }
    }, 50);
}

// Toggle favorite
function toggleFavorite(animalId) {
    const index = favorites.indexOf(animalId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(animalId);
    }

    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Update UI
    if (document.getElementById('featured-animals')) {
        renderFeaturedAnimals();
    }
    if (document.getElementById('all-animals')) {
        renderAllAnimals();
    }
    if (document.getElementById('favorites-grid')) {
        renderFavorites();
    }
}

// Initialize Google Map
function initMap() {
    // Initialize map on the home page
    const mapElement = document.getElementById('map-container');
    if (mapElement) {
        map = new google.maps.Map(mapElement, {
            center: { lat: -22.5609, lng: 17.0658 }, // Windhoek coordinates
            zoom: 6
        });
    }

    // Initialize map on the planner page
    const plannerMapElement = document.getElementById('planner-map');
    if (plannerMapElement) {
        const plannerMap = new google.maps.Map(plannerMapElement, {
            center: { lat: -22.5609, lng: 17.0658 }, // Windhoek coordinates
            zoom: 6
        });

        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(plannerMap);
    }
}

// Setup distance calculator
function setupDistanceCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const fromPark = document.getElementById('from-park').value;
            const toPark = document.getElementById('to-park').value;
            calculateDistance(fromPark, toPark, 'home');
        });
    }
}

// Setup planner
function setupPlanner() {
    const calculateBtn = document.getElementById('planner-calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const fromPark = document.getElementById('planner-from').value;
            const toPark = document.getElementById('planner-to').value;
            calculateDistance(fromPark, toPark, 'planner');
        });
    }
}

// Calculate distance between parks
function calculateDistance(fromPark, toPark, page) {
    if (!fromPark || !toPark) {
        alert('Please select both parks');
        return;
    }

    const park1 = parks.find(p => p.name === fromPark);
    const park2 = parks.find(p => p.name === toPark);

    if (!park1 || !park2) return;

    // In a real app, you would use the Google Maps API here
    // For demo purposes, we'll simulate results
    const distance = Math.floor(Math.random() * 800) + 200;
    const duration = Math.floor(distance / 60) + 1;

    if (page === 'home') {
        document.getElementById('distance-result').textContent = `${distance} km`;
        document.getElementById('duration-result').textContent = `${duration} hours by car`;
        document.getElementById('route-result').textContent = `B1 Highway via Windhoek`;
        document.getElementById('results').style.display = 'block';
    } else if (page === 'planner') {
        document.getElementById('planner-distance').textContent = `${distance} km`;
        document.getElementById('planner-duration').textContent = `${duration} hours by car`;
        document.getElementById('planner-route').textContent = `B1 Highway via Windhoek`;
        document.getElementById('planner-results').style.display = 'block';
    }
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');

    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

    // Save theme preference
    localStorage.setItem('theme', currentTheme);
}

// Set up event listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage(link.dataset.target);
        });
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // View animal details
    document.addEventListener('click', (e) => {
        if (e.target.closest('[data-animal-id]') && e.target.closest('.btn') && !e.target.closest('.favorite-btn')) {
            const animalId = parseInt(e.target.closest('[data-animal-id]').dataset.animalId);
            showAnimalDetail(animalId);
        }

        // Toggle favorite
        if (e.target.closest('.favorite-btn')) {
            const animalId = parseInt(e.target.closest('.favorite-btn').dataset.animalId);
            toggleFavorite(animalId);
        }
    });

    // Footer navigation
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.dataset.target) {
                e.preventDefault();
                navigateToPage(link.dataset.target);
            }
        });
    });

    // Hero buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.hero-buttons a')) {
            e.preventDefault();
            const target = e.target.closest('.hero-buttons a').dataset.target;
            navigateToPage(target);
        }
    });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    currentTheme = 'dark';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);