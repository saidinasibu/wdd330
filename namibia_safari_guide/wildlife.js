const animals = [
    {
        name: "African Elephant",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg",
        description: "The largest land animal, found in Etosha and other parks."
    },
    {
        name: "Lion",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg",
        description: "Lions live in savannah areas and are often spotted in groups."
    },
    {
        name: "Springbok",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Springbok_Namibia.jpg",
        description: "A small antelope, national animal of Namibia, known for jumping."
    },
    {
        name: "Zebra",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Zebra_Namibia.jpg",
        description: "Zebras roam in herds and have unique stripe patterns."
    }
];

const container = document.getElementById("animal-list");

animals.forEach(animal => {
    const card = document.createElement("div");
    card.className = "animal-card";

    card.innerHTML = `
      <img src="${animal.image}" alt="${animal.name}" />
      <h3>${animal.name}</h3>
      <p>${animal.description}</p>
    `;

    container.appendChild(card);
});
  