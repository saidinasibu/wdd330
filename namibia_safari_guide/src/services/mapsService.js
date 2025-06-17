export const loadGoogleMaps = () => {
    return new Promise((resolve) => {
        if (window.google) return resolve();

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
    });
};

export const calculateDistance = (origin, destination) => {
    return new Promise((resolve) => {
        // Dans une application réelle, nous utiliserions l'API Google Maps
        // Pour l'exemple, nous simulons un calcul de distance

        setTimeout(() => {
            // Générer des valeurs aléatoires pour la démo
            const distances = ['480 km', '320 km', '750 km', '210 km'];
            const durations = ['6 hours', '4 hours', '9 hours', '3 hours'];

            const randomIndex = Math.floor(Math.random() * distances.length);

            resolve({
                distance: { text: distances[randomIndex] },
                duration: { text: durations[randomIndex] }
            });
        }, 1000);
    });
  };