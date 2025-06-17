import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import HomePage from './pages/HomePage';
import AnimalDetailPage from './pages/AnimalDetailPage';
import PlannerPage from './pages/PlannerPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
    return (
        <ThemeProvider>
            <FavoritesProvider>
                <Router>
                    <div className="flex flex-col min-h-screen bg-secondary">
                        <NavBar />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/animal/:id" element={<AnimalDetailPage />} />
                                <Route path="/planner" element={<PlannerPage />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </FavoritesProvider>
        </ThemeProvider>
    );
}

export default App;