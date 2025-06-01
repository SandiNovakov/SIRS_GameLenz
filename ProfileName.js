document.addEventListener('DOMContentLoaded', function () {
    // Get the profile name element
    const profileName = document.querySelector('.profileName');

    // Retrieve the username from localStorage
    const username = localStorage.getItem('userUsername');

    // If the username exists, update the profile name text
    if (username) {
        profileName.textContent = username;
    } else {
        // If no username is found, prompt the user to register or log in
        profileName.textContent = 'Guest'; // You can choose another fallback text
    }
});