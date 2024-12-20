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
        "albanien": "Albania",
        "österreich": "Austria",
        "belarus": "Belarus",
        "belgien": "Belgium",
        "bosnien": "Bosnia-and-Herzegovina",
        "bulgarien": "Bulgaria",
        "kroatien": "Croatia",
        "zypern": "Cyprus",
        "tschechien": "Czech-Republic",
        "dänemark": "Denmark",
        "estland": "Estonia",
        "finnland": "Finland",
        "frankreich": "France",
        "deutschland": "Germany",
        "griechenland": "Greece",
        "ungarn": "Hungary",
        "island": "Iceland",
        "irland": "Ireland",
        "italien": "Italy",
        "kosovo" : "Kosovo",
        "lettland": "Latvia",
        "liechtenstein": "Liechtenstein",
        "litauen": "Lithuania",
        "luxemburg": "Luxembourg",
        "malta": "Malta",
        "moldavien": "Moldova",
        "monaco": "Monaco",
        "montenegro": "Montenegro",
        "niederlande": "Netherlands",
        "mazedonien": "Macedonia",
        "norwegen": "Norway",
        "polen": "Poland",
        "portugal": "Portugal",
        "rumänien": "Romania",
        "russland": "Russia",
        "san marino": "San Marino",
        "serbien": "Serbia",
        "slowakei": "Slovakia",
        "slowenien": "Slovenia",
        "spanien": "Spain",
        "schweden": "Sweden",
        "schweiz": "Switzerland",
        "ukraine": "Ukraine",
        "england": "United-Kingdom",
        "vatikanstadt": "Vatican City",
        "türkei": "Turkey"
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
