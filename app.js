const express = require('express'); //Upravljanje rutama
const cors = require('cors'); //Služi da bi igre.html mogao dohvatiti podatke od Steam API-ja preko našeg API-ja
const fetch = require('node-fetch'); //Potreban za pribavljanje podataka sa Steam API-ja
const path = require('path'); //Služi kako bi app.js mogao doći do potrebnih datoteka
const fs = require('fs'); //Služi za spremanje podataka u data.json

const userdataPath = path.join(__dirname, 'public', 'data.json');
//Ovdje se nalazi korisnikova lista igrica.

let userdata = require('./public/data.json');
//Pohranjujemo podatke iz data.json u varijablu userdata

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
//ova linija oznacuje gdje ce se nalaziti nase html, css i js datoteke koje će app.js servirati korisniku.
//zahvaljujuci ovom liniju, kada korisnik ukuca "localhost:3000/" automatski će dobiti Index.html
app.use(express.json());
app.use(cors());

const broj_igrica = 200

//Ove rute služe samo za serviranje .html stranica.
app.get('/moje-igre', (req, res) => {
    serveWebpage(res, 'moje-igre.html');
    //Ovo je moja funkcija. Nalazi se na dnu skripte.
});

app.get('/dodaj-igru', (req, res) => {
    serveWebpage(res, 'dodaj-igru.html');
});

app.get('/promjeni-igru', (req, res) => {
    serveWebpage(res, 'promjeni-igru.html');
});

app.get('/igre', (req, res) => {
    serveWebpage(res, 'igre.html');
});


//Ova ruta povlači igrice sa Steam API-ja.
app.get('/povuci-igre', async (req, res) => {
    try {
        const odgovor = await fetch(`https://api.steampowered.com/IStoreService/GetAppList/v1/?key=1536D52F114A067EA442CC293E928C0D&max_results=${broj_igrica}`);
        //API Request.
        const data = await odgovor.json();
        //Pretvara odgovor u .json format
        const games = await data?.response?.apps;
        //ova linija mice ca sve one glupe headere sta steam stavlja u response
        res.json({ games });
    }
    catch (error) {
        res.status(500).json({ error: 'Nije moguće dohvatiti igre.'});
    }
});

//Ova ruta vraća json podatke iz userdata.
app.get("/userdata", (req, res) => {
    if (req.query.appid) {
    //Ako je uz rutu poslan argument appid, API vraća samo tu jednu igricu.
    //U protivnom, API vraća sve igrice u Data.json
        const appid = parseInt(req.query.appid);
        //parseInt pretvara string iz URL-a u broj.
        const game = userdata.find((g) => g.appid === appid);
        //Pronalazi igru u Data.json prema appid-ju
        if (game) { //ako igra postoji, pošalji ju.
            return res.json(game);
        } else {
            return res.status(404).json({ error: 'Igra nije pronađena.' });
        }
    };
    //API vraća sve igrice.
    res.json(userdata);
});

//Sve sljedeće rute bave se s userdata:
//Dodavanje nove igrice u listu.
app.post('/userdata/add', (req, res) => {
    // Povlači argumente iz tijela zahtjeva.
    const { appid, ImeIgre, Status, Recenzija, Komentar } = req.body;

    // appid, ImeIgre i Status su obavezni argumenti, ako ih nema, bacaj error.
    if (!appid || !ImeIgre || !Status) {
        return res.status(400).json({
            error: 'Argumenti appid, ImeIgre i Status su obavezni!'
        });
    }

    //Korisnik ne smije dodati igru koja je već dodana u listi.
    //Provjera da li igra već postoji. Ako da, bacaj error. 
    const game = userdata.find((g) => g.appid === appid);
    if (game) {
        return res.status(400).json({
            error: 'Igra već postoji!'
        });
    }

    else {
        const newEntry = { appid, ImeIgre, Status, Recenzija, Komentar };
        // Stvori novi objekt iz argumenata.
        userdata.push(newEntry);
        // Dodaj ga u userdata.

        saveUserData(res, 'Igrica je uspješno dodana.');
    }
});

//Promjena podataka o postojećoj igri u listi.
app.put('/userdata/update', (req, res) => {
    const { appid, ImeIgre, Status, Recenzija, Komentar } = req.body;
    if (!appid || !ImeIgre || !Status) {
        return res.status(400).json({
            error: 'Argumenti appid, ImeIgre i Status su obavezni!'
        });
    }
    
    const game = userdata.find((g) => g.appid === appid);
    //Ako igra ne postoji u listi bacaj error.
    if (!game) {
        return res.status(400).json({
            error: 'Igra ne postoji u listi!'
        });
    }
    else {
        const updatedEntry = { appid, ImeIgre, Status, Recenzija, Komentar };
        Object.assign(game, updatedEntry);
        //Object.assign zamjenjuje game iz userdata sa ovim updatedEntry.
        
        saveUserData(res, 'Igrica je uspješno promjenjena.');
    }
});

//Delete ruta prima appid u tijelu zahtjeva i prema tome briše igricu iz liste.
app.delete('/userdata/delete', (req, res) => {
    const { appid } = req.body;
    //Za DELETE potreban nam je samo appid, ostalo nas ne zanima.
    //Ako nema appid argumenta, bacaj error.
    if (!appid) {
        return res.status(400).json({ error: 'Argument appid je obavezan!' });
    }
    // console.log(appid);
    // Find the index of the game
    const gameIndex = userdata.findIndex((g) => g.appid === appid);

    // 
    if (gameIndex === -1) {
        return res.status(404).json({ error: 'Igra nije pronađena u listi!' });
    }

    // console.log(userdata[gameIndex]);
    userdata.splice(gameIndex, 1);
    //Ovo miće igricu iz lise

    saveUserData(res, 'Igrica je uspješno obrisana.');
});

const saveUserData = (res, successMessage) => {
    fs.writeFile(userdataPath, JSON.stringify(userdata, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ error: 'Spremanje podataka nije uspjelo!' });
        }

        // Success response
        res.status(201).json({
            message: successMessage
        });
    });
};

const serveWebpage = (res, url) =>{
    const filePath = path.join(__dirname, 'public', url);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        console.error(`File not found: ${filePath}`);
        res.status(404).json({ error: 'Stranica nije pronađena.' });
    }
}

app.listen(port, () => {
    console.log(`Server radi na portu ${port}`);
});