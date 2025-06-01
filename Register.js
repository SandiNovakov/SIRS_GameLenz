// Wait for the document to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    const registerButton = document.getElementById('registerButton');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const usernameInput = document.getElementById('usernameInput');

    // Attach event listener to the register button
    registerButton.addEventListener('click', function (event) {
        // Prevent form submission if fields are empty
        if (!emailInput.value || !passwordInput.value || !usernameInput.value) {
            alert('Please fill in all fields before registering!');
            event.preventDefault(); // Prevent the link from navigating
        } else {
            // Save the user data to localStorage
            localStorage.setItem('userEmail', emailInput.value);
            localStorage.setItem('userPassword', passwordInput.value);
            localStorage.setItem('userUsername', usernameInput.value);
        }
    });

    // Check if the user is already signed in (i.e., if the data exists in localStorage)
    if (window.location.pathname === '/SignedIn.html') {
        if (!localStorage.getItem('userEmail') || !localStorage.getItem('userPassword') || !localStorage.getItem('userUsername')) {
            // Redirect to the register page if not signed in
            window.location.href = '/index.html'; // Make sure the correct path is used
        }
    }
});