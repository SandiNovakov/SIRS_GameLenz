document.addEventListener("DOMContentLoaded", function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const appid = urlParams.get('appid');

    fetch(`./userdata?appid=${appid}`)
        .then(response => {
            if (!response.ok) {
                alert('Došlo je do greške prilikom učitavanja igre');
                return;
            }
            return response.json();
        })
        .then(data => {
            // const imeIgre = data.ImeIgre;
            // neka sam dragi Bog pomogne ovom kodu ovdje. Ne dirajte. Dok radi, radi.
            if (document.getElementById('appid')) {
                document.getElementById('appid').textContent = `ID igre: ${data.appid}`;
            }
            if (document.getElementById('ime-igre')) {
                document.getElementById('ime-igre').textContent = `Ime igre: ${data.ImeIgre}`;
            }
            if (document.getElementById('status')) {
                document.getElementById('status').value = data.Status;
            }
            if (document.getElementById('review')) {
                document.getElementById('review').value = data.Recenzija;
            }
            if (document.getElementById('comment')) {
                document.getElementById('comment').value = data.Komentar;
            }

            const gameForm = document.getElementById("gameForm");

            gameForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent the default form submission behavior

                const status = document.getElementById("status").value;
                const review = document.getElementById("review").value;
                const comment = document.getElementById("comment").value;

                const formData = {
                    appid: data.appid,
                    ImeIgre: data.ImeIgre,
                    Status: status,
                    Recenzija: review,
                    Komentar: comment,
                };                // Send the data using a PUT request
                fetch("/userdata/update", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData), // Convert the object to JSON
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json(); // Parse JSON response
                        } else {
                            throw new Error("Failed to save data");
                        }
                    })
                    .then((data) => {
                        // Handle the server's response
                        console.log("Server response:", data);
                        alert("Podatci su uspješno spremljeni.!");
                        window.location.replace("./moje-igre");
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        alert("Promjena podataka nije uspjela!");
                    });
            });
        })
        .catch(error => {
            console.error("Greška:", error);
            const container = document.getElementById('container'); // Ensure you have an element with ID 'container'
            if (container) {
                container.innerHTML = "<p>Došlo je do greške prilikom učitavanja igara.</p>";
            }
        });
});