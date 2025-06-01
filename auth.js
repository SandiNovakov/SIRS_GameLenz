document.addEventListener('DOMContentLoaded', function() {
    const authContainer = document.getElementById('auth-container');
    const registerButtons = document.querySelectorAll('.registerButton');

    // Function to check if the user is signed in
    function isUserSignedIn() {
        return localStorage.getItem('userEmail') && localStorage.getItem('userPassword') && localStorage.getItem('userUsername');
    }

    // If the user is signed in, hide the buttons and show the avatar
    if (isUserSignedIn()) {
        registerButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
    if (authContainer) {
        if (isUserSignedIn()) {
            // Create the avatar div and link it to Profile.html
            const avatarLink = document.createElement('a');
            avatarLink.href = 'Profile.html';

            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'avatar';
            avatarDiv.textContent = 'P';  // This can be replaced with user's initial or other data

            avatarLink.appendChild(avatarDiv);
            authContainer.appendChild(avatarLink);
        }
    }
});

