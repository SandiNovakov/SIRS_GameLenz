const games = [
    {
        class: "game1",
        imgSrc: "Elden_Ring.jpg",
        imgAlt: "Elden ring Picture",
        title: "Elden Ring",
        description: "Elden Ring is a 2022 action role-playing game developed by FromSoftware. It was directed by Hidetaka Miyazaki with worldbuilding provided by American fantasy writer George R. R. Martin.",
        iconClass: "fa-solid fa-circle-plus"
    },
    {
        class: "game1",
        imgSrc: "ItTakesTwo.jpg",
        imgAlt: "ItTakesTwo Picture",
        title: "It Takes Two",
        description: "It Takes Two is a 2021 cooperative action-adventure game developed by Hazelight Studios and published by Electronic Arts.",
        iconClass: "fa-solid fa-circle-plus"
    },
    {
        class: "game1",
        imgSrc: "Minecraft.png",
        imgAlt: "Minecraft Picture",
        title: "Minecraft",
        description: "Minecraft is a 2011 sandbox game developed and published by Swedish video game developer Mojang Studios.",
        iconClass: "fa-solid fa-circle-plus"
    },
    {
        class: "game1",
        imgSrc: "Dark_Souls.jpg",
        imgAlt: "Dark Souls Picture",
        title: "Dark Souls",
        description: "Dark Souls is a dark fantasy action role-playing game series developed by FromSoftware and published by Bandai Namco Entertainment.",
        iconClass: "fa-solid fa-circle-plus"
    },
    {
        class: "game1",
        imgSrc: "Hollow_Knight.webp",
        imgAlt: "Hollow Knight Picture",
        title: "Hollow Knight",
        description: "Hollow Knight is a 2017 Metroidvania video game developed and published by independent developer Team Cherry.",
        iconClass: "fa-solid fa-circle-plus"
    },
    {
        class: "game1",
        imgSrc: "Balatro.jpg",
        imgAlt: "Balatro Picture",
        title: "Balatro",
        description: "Balatro is a 2024 poker-themed roguelike deck-building game developed by LocalThunk and published by Playstack.",
        iconClass: "fa-solid fa-circle-plus"
    },
    {
        class: "game1",
        imgSrc: "The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
        imgAlt: "The Legend of Zelda: Breath of the Wild Picture",
        title: "The Legend of Zelda: Breath of the Wild",
        description: "Legend of Zelda: Breath of the Wild is a 2017 action-adventure game developed and published by Nintendo.",
        iconClass: "fa-solid fa-circle-plus"
    },
    {
        class: "game1",
        imgSrc: "Another_Crab's_Treasure_poster.webp",
        imgAlt: "Another Crab's Treasure Picture",
        title: "Another Crab's Treasure",
        description: "The Another Crab's Treasure is a Soulslike action-adventure video game played from a third-person perspective.",
        iconClass: "fa-solid fa-circle-plus"
    },
    {
        class: "game1",
        imgSrc: "God_of_War.jpg",
        imgAlt: "God of War Picture",
        title: "God of War",
        description: "God of War is a 2018 action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment.",
        iconClass: "fa-solid fa-circle-plus"
    },
    {
        class: "game1",
        imgSrc: "Animal_Crossing_New_Horizons.jpg",
        imgAlt: "Animal Crossing: New Horizons Picture",
        title: "Animal Crossing: New Horizons",
        description: "Animal Crossing: New Horizons is a 2020 social simulation game developed and published by Nintendo for the Nintendo Switch; it is the fifth main entry in the Animal Crossing series.",
        iconClass: "fa-solid fa-circle-plus"
    }
];

// Function to load games dynamically
function loadGames() {
    const container = document.getElementById('games-container'); // Assuming there's a container with this ID

    games.forEach(game => {
        // Create game div
        const gameDiv = document.createElement('div');
        gameDiv.className = game.class;

        // Create and append image
        const img = document.createElement('img');
        img.src = game.imgSrc;
        img.alt = game.imgAlt;
        gameDiv.appendChild(img);

        // Create text div
        const textDiv = document.createElement('div');
        textDiv.className = 'text';

        // Create and append title
        const title = document.createElement('h2');
        title.textContent = game.title;
        textDiv.appendChild(title);

        // Create and append description
        const description = document.createElement('h3');
        description.textContent = game.description;
        textDiv.appendChild(description);

        // Append text div to game div
        gameDiv.appendChild(textDiv);

        // Create and append icon
        const icon = document.createElement('i');
        icon.className = game.iconClass;
        gameDiv.appendChild(icon);

        // Append game div to container
        container.appendChild(gameDiv);

        // Add event listener for the icon
        icon.addEventListener('click', function () {
            if (isUserRegistered()) {
                addToGamesList(game);  // Add the clicked game to the GamesList
            } else {
                window.location.href = 'Register.html';  // Redirect to register if not registered
            }
        });
    });
}

// Function to check if user is registered
function isUserRegistered() {
    return localStorage.getItem('userEmail') && localStorage.getItem('userPassword') && localStorage.getItem('userUsername');
}

// Function to add game to GamesList (stored in localStorage)
function addToGamesList(game) {
    let gamesList = JSON.parse(localStorage.getItem('gamesList')) || [];  // Retrieve existing games list or an empty array
    game.class = 'game';
    if (!gamesList.some(existingGame => existingGame.title === game.title)) {  // Check if game already exists
        gamesList.push(game);  // Add new game to the list
        localStorage.setItem('gamesList', JSON.stringify(gamesList));  // Save updated list to localStorage
        // alert(`${game.title} has been added to your games list!`);
    } else {
        alert(`${game.title} is already in your games list.`);
    }
}

// Call the function after the DOM has loaded
document.addEventListener('DOMContentLoaded', loadGames);