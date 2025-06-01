const games = JSON.parse(localStorage.getItem('gamesList')) || []; // Retrieve games from localStorage

// Function to load games dynamically
function loadGames() {
    const container = document.querySelector('.list'); // Selecting the container div with the class 'list'

    games.forEach((game, index) => {
        // Create game div
        const gameDiv = document.createElement('div');
        gameDiv.className = game.class;

        // Create and append image
        const img = document.createElement('img');
        img.src = game.imgSrc;
        img.alt = game.imgAlt;
        img.className = 'image';
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
        icon.className = 'fa-solid fa-circle-minus';
        icon.addEventListener('click', function () {
            // Remove the game from the array and localStorage
            removeGame(index);
        });
        gameDiv.appendChild(icon);

        // Append game div to container
        container.appendChild(gameDiv);
    });
}

// Function to remove a game by its index
function removeGame(index) {
    const updatedGames = games.filter((_, i) => i !== index); // Remove the game at the specified index
    localStorage.setItem('gamesList', JSON.stringify(updatedGames)); // Update localStorage
    window.location.reload(); // Reload the page to reflect changes
}

// Call the function after the DOM has loaded
document.addEventListener('DOMContentLoaded', loadGames);
