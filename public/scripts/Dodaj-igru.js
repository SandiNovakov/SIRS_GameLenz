const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const appid = parseInt(urlParams.get('appid'));
const ImeIgre = urlParams.get('name');





document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById('appid')) {
        document.getElementById('appid').textContent = `ID igre: ${appid}`;
    }
    if (document.getElementById('ime-igre')) {
        document.getElementById('ime-igre').textContent = `Ime igre: ${ImeIgre}`;
    }

    const gameForm = document.getElementById("gameForm");

    gameForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior




        const status = document.getElementById("status").value;
        const review = document.getElementById("review").value;
        const comment = document.getElementById("comment").value;


        const formData = {
            appid:appid,
            ImeIgre: ImeIgre,
            Status: status,
            Recenzija: review,
            Komentar: comment,
        };

        // Send the data using a POST request
        fetch("/userdata/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Convert the object to JSON
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse JSON response
                } else {
                    throw new Error("Spremanje podataka nije uspjelo");
                }
            })
            .then((data) => {
                // Handle the server's response
                console.log("Server response:", data);
                alert("Podatci su uspješno spremljeni!");
                window.location.replace("./igre");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Spremanje podataka nije uspjelo.");
            });
        });
      });