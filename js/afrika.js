document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-button');
    const navbarLinks = document.getElementById('navbar-links');

    navbarLinks.classList.add('active');
    toggleButton.classList.add('active');

    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
        toggleButton.classList.toggle('active');
    });
});

let count = 0;
const enteredCountries = new Set();
let timer;
const countdownTime = 2 * 60;
let timeRemaining = countdownTime;

function increaseCounter() {
    count++;
    document.getElementById('count').textContent = count + " von / 41";
    if (count == 41){
        alert("Gratuliere! alle Länder wurden richtig eingegeben");
        const inputField = document.getElementById('inputField');
        inputField.disabled = true;
    }
}

function disableInput() {
    const inputField = document.getElementById('inputField');
    inputField.disabled = true;
    alert("Zeit ist abgelaufen! Keine weiteren Eingaben möglich.");
}

function showAlert() {
    let inputField = document.getElementById('inputField');
    let userInput = inputField.value.trim().toLowerCase();

    const countryMapping = {
        "ägypten": "Egypt",
        "algerien": "Algeria",
        "angola": "Angola",
        "benin": "Benin",
        "botsuana": "Botswana",
        "burkinafaso": "Burkina-Faso",
        "burundi": "Burundi",
        "kapverde": "Cape-Verde",
        "zentralafrikanischerepublik": "Central-African-Republic",
        "tschad": "Chad",
        "komoren": "Comoros",
        "kongo": "Congo",
        "demokratischerepublik kongo": "Democratic-Republic-of-the Congo",
        "dschibuti": "Djibouti",
        "äquatorialguinea": "Equatorial-Guinea",
        "eritrea": "Eritrea",
       // "eswatini": "Eswatini",
        "äthiopien": "Ethiopia",
        "gabun": "Gabon",
        "gambia": "Gambia",
        "ghana": "Ghana",
        "guinea": "Guinea",
        "guinea-bissau": "Guinea-Bissau",
        "elfenbeinküste": "Côte-d'Ivoire",
        "kenia": "Kenya",
        "lesotho": "Lesotho",
        "liberia": "Liberia",
        "libyen": "Libya",
        "madagaskar": "Madagascar",
        "malawi": "Malawi",
        "mali": "Mali",
        "mauretanien": "Mauritania",
        "mauritius": "Mauritius",
        "mosambik": "Mozambique",
        "namibia": "Namibia",
        "niger": "Niger",
        "nigeria": "Nigeria",
        "ruanda": "Rwanda",
        "sao tome und principe": "São-Tomé-and-Principe",
        "senegal": "Senegal",
        "seychellen": "Seychelles",
        "sierraleone": "Sierra-Leone",
        "somalia": "Somalia",
        "südafrika": "South-Africa",
        "südsudan": "South-Sudan",
        "sudan": "Sudan",
        "tansania": "Tanzania",
        "togo": "Togo",
        "tunesien": "Tunisia",
        "uganda": "Uganda",
        "sambia": "Zambia",
        "simbabwe": "Zimbabwe",
        "westernsahara": "Western-Sahara"
    };

    let countryClass = countryMapping[userInput];

    if (countryClass) {
        if (!enteredCountries.has(userInput)) {
            let countryPaths = document.querySelectorAll('.' + countryClass);
            if (countryPaths.length > 0) {
                countryPaths.forEach(path => {
                    path.style.fill = 'green';
                });
                increaseCounter();
                inputField.value = '';
                enteredCountries.add(userInput);
                document.getElementById('status').textContent = 'Gefärbtes Land: ' + userInput;
            } 
        } else {
            alert("Dieses Land wurde bereits eingegeben!");
            inputField.value = '';
        }
    } else {
        alert("Land nicht gefunden!");
    }
}

function shownoTimer() {
    document.getElementById('timer').style.display = 'none';
    clearInterval(timer);
    timeRemaining = countdownTime;
    document.getElementById('inputField').disabled = false;
}

function showTimer() {
    document.getElementById('timer').style.display = 'block';
    clearInterval(timer);
    timeRemaining = 2 * 60; 
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        updateTimer();
        if (timeRemaining <= 0) {
            clearInterval(timer);
            disableInput();
        }
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

document.getElementById('inputField').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        showAlert();
    }
});

document.querySelectorAll(".allPaths").forEach(e => {
    e.setAttribute('class', `allPaths ${e.id}`);
    e.addEventListener("click", function () {
        getUser(e.id);
    });
});

window.onload = startTimer;
