// Dohvaćanje kontejnera za igre
const container = document.getElementById("igre-container");

// Dohvaćanje podataka 
fetch("./userdata")
    .then(response => {
        if (!response.ok) {
            throw new Error("Greška prilikom dohvaćanja podataka!");
        }
        return response.json();
    })
    .then(data => {
        // Poveznica kroz svaku igru i kreiranje HTML elemenata
        data.forEach(game => {
            // Kreiranje glavn div za prikaz igre
            const gameDiv = document.createElement("div");
            gameDiv.classList.add("game-item");

            // Popunjavanje podataka o igri
            gameDiv.innerHTML = `
                <h2>${game.ImeIgre}</h2>
                <p>Status: ${game.Status}</p>
                <p>Recenzija: ${game.Recenzija !== null ? game.Recenzija : "Nema recenzije"}</p>
                <p>Komentar: ${game.Komentar !== null ? game.Komentar : "Nema komentara"}</p>
                <button class="button" onclick=deleteGame(${game.appid})>Izbriši</button>
                <a href="/promjeni-igru?appid=${game.appid}" class="button">Promijeni</a>
            `;

            // Dodan kreirani element u glavni kontejner
            container.appendChild(gameDiv);
        });
    })
    .catch(error => {
        console.error("Greška:", error);
        container.innerHTML = "<p>Došlo je do greške prilikom učitavanja igara.</p>";
    });

function deleteGame(appid) {
    const formData = {
        appid: appid
    };

    fetch("/userdata/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convert the object to JSON
    })
        .then((response) => {
            if (response.ok) {
                return response.json(); // Parse JSON response
            } else {
                throw new Error("Failed to delete data");
            }
        })
        .then((data) => {
            // Handle the server's response
            console.log("Server response:", data);
            alert("Igra je uspješno izbrisana!");
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Brisanje igrice nije uspjelo.");
        });

};

