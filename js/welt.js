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
const countdownTime = 5 * 60; 
let timeRemaining = countdownTime;

function increaseCounter() {
    count++;
    document.getElementById('count').textContent = count + " von / 194";
}

function showAlert() {
    let inputField = document.getElementById('inputField');
    let userInput = inputField.value.trim().toLowerCase();

    const countryMapping = {
        "afghanistan": "Afghanistan",
        "ägypten": "Egypt",
        "albanien": "Albania",
        "algerien": "Algeria",
        "andorra": "Andorra",
        "angola": "Angola",
        "antigua und barbuda": "Antigua and Barbuda",
        "argentinien": "Argentina",
        "armenien": "Armenia",
        "australien": "Australia",
        "österreich" : "Austria",
        "aserbaidschan": "Azerbaijan",
        "bahamas": "Bahamas",
        "bahrain": "Bahrain",
        "bangladesch": "Bangladesh",
        "barbados": "Barbados",
        "belarus": "Belarus",
        "belgien": "Belgium",
        "belize": "Belize",
        "benin": "Benin",
        "bhutan": "Bhutan",
        "bolivien": "Bolivia",
        "bosnien": "Bosnia-and-Herzegovina",
        "botsuana": "Botswana",
        "brasilien": "Brazil",
        "brunei": "Brunei",
        "bulgarien": "Bulgaria",
        "burkinafaso": "Burkina-Faso",
        "burundi": "Burundi",
        "cambodia": "Cambodia",
        "kamerun": "Cameroon",
        "kanada": "Canada",
        "kap verde": "Cape Verde",
        "zentralafrikanische republik": "Central African Republic",
        "tschad": "Chad",
        "chile": "Chille",
        "china": "China",
        "kolumbien": "Colombia",
        "komoren": "Comoros",
        "kongo": "Congo",
        "demokratische republik kongo": "Democratic Republic of the Congo",
        "costarica": "Costa-Rica",
        "elfenbeinküste": "Ivory Coast",
        "kroatien": "Croatia",
        "kuba": "Cuba",
        "zypern": "Cyprus",
        "tschechien": "Czech-Republic",
        "dänemark": "Denmark",
        "dschibuti": "Djibouti",
        "dominica": "Dominica",
        "dominikanische republik": "Dominican Republic",
        "ecuador": "Ecuador",
        "ägypten": "Egypt",
        "el salvador": "El Salvador",
        "äquatorialguinea": "Equatorial Guinea",
        "eritrea": "Eritrea",
        "estland": "Estonia",
        "eswatini": "Eswatini",
        "äthiopien": "Ethiopia",
        "fidschi": "Fiji",
        "finnland": "Finland",
        "frankreich": "France",
        "gabun": "Gabon",
        "gambia": "Gambia",
        "georgien": "Georgia",
        "deutschland": "Germany",
        "ghana": "Ghana",
        "griechenland": "Greece",
        "grenada": "Grenada",
        "guatemala": "Guatemala",
        "guinea": "Guinea",
        "guinea-bissau": "Guinea-Bissau",
        "guyana": "Guyana",
        "haiti": "Haiti",
        "honduras": "Honduras",
        "ungarn": "Hungary",
        "island": "Iceland",
        "indien": "India",
        "indonesien": "Indonesia",
        "iran": "Iran",
        "irak": "Iraq",
        "irland": "Ireland",
        "israel": "Israel",
        "italien": "Italy",
        "jamaika": "Jamaica",
        "japan": "Japan",
        "jordanien": "Jordan",
        "kasachstan": "Kazakhstan",
        "kenia": "Kenya",
        "kiribati": "Kiribati",
        "nordkorea": "North-Korea",
        "südkorea": "South-Korea",
        "kuwait": "Kuwait",
        "kirgisistan": "Kyrgyzstan",
        "laos": "Laos",
        "lettland": "Latvia",
        "libanon": "Lebanon",
        "lesotho": "Lesotho",
        "liberia": "Liberia",
        "libyen": "Libya",
        "liechtenstein": "Liechtenstein",
        "litauen": "Lithuania",
        "luxemburg": "Luxembourg",
        "madagaskar": "Madagascar",
        "malawi": "Malawi",
        "malaysia": "Malaysia",
        "malediven": "Maldives",
        "mali": "Mali",
        "malta": "Malta",
        "marshallinseln": "Marshall Islands",
        "mauretanien": "Mauritania",
        "mauritius": "Mauritius",
        "mexiko": "Mexico",
        "mikronesien": "Micronesia",
        "moldavien": "Moldova",
        "monaco": "Monaco",
        "mongolei": "Mongolia",
        "montenegro": "Montenegro",
        "marokko": "Morocco",
        "mosambik": "Mozambique",
        "myanmar": "Myanmar",
        "namibia": "Namibia",
        "nauru": "Nauru",
        "nepal": "Nepal",
        "niederlande": "Netherlands",
        "neuseeland": "New-Zealand",
        "nicaragua": "Nicaragua",
        "niger": "Niger",
        "nigeria": "Nigeria",
        "norwegen": "Norway",
        "oman": "Oman",
        "pakistan": "Pakistan",
        "palau": "Palau",
        "palästina": "Palestine",
        "panama": "Panama",
        "papua-neuguinea": "Papua New Guinea",
        "paraguay": "Paraguay",
        "peru": "Peru",
        "philippinen": "Philippines",
        "polen": "Poland",
        "portugal": "Portugal",
        "katar": "Qatar",
        "rumänien": "Romania",
        "russland": "Russia",
        "ruanda": "Rwanda",
        "st. kitts und nevis": "Saint Kitts and Nevis",
        "st. lucia": "Saint Lucia",
        "st. vincent und die grenadinen": "Saint Vincent and the Grenadines",
        "samoa": "Samoa",
        "san marino": "San Marino",
        "sao tome und principe": "Sao Tome and Principe",
        "saudiarabien": "SaudiArabia",
        "senegal": "Senegal",
        "serbien": "Serbia",
        "seychellen": "Seychelles",
        "sierra leone": "Sierra Leone",
        "singapur": "Singapore",
        "slowakei": "Slovakia",
        "slowenien": "Slovenia",
        "salomonen": "Solomon Islands",
        "somalia": "Somalia",
        "südafrika": "South-Africa",
        "südsudan": "South Sudan",
        "spanien": "Spain",
        "sri lanka": "Sri Lanka",
        "sudan": "Sudan",
        "suriname": "Suriname",
        "schweden": "Sweden",
        "schweiz": "Switzerland",
        "syrien": "Syria",
        "taiwan": "Taiwan",
        "tadschikistan": "Tajikistan",
        "tansania": "Tanzania",
        "thailand": "Thailand",
        "togo": "Togo",
        "tonga": "Tonga",
        "trinidad und tobago": "Trinidad and Tobago",
        "tunesien": "Tunisia",
        "türkei": "Turkey",
        "turkmenistan": "Turkmenistan",
        "tuvalu": "Tuvalu",
        "uganda": "Uganda",
        "ukraine": "Ukraine",
        "vereinigte arabische emirate": "United Arab Emirates",
        "england": "United-Kingdom",
        "usa": "United-States",
        "uruguay": "Uruguay",
        "usbekistan": "Uzbekistan",
        "vanuatu": "Vanuatu",
        "vatikanstadt": "Vatican City",
        "venezuela": "Venezuela",
        "vietnam": "Vietnam",
        "jemen": "Yemen",
        "sambia": "Zambia",
        "simbabwe": "Zimbabwe",
        "kosovo" : "Kosovo",
        
        "westernsahara" : "Western-Sahara"
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
    clearInterval(timer ); 
}

function showTimer() {
    document.getElementById('timer').style.display = 'block';
    clearInterval(timer); 
    timeRemaining = countdownTime; 
    startTimer(); 
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 0) {
            clearInterval(timer);
            disableInput();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : '' }${seconds} ` ;
}

function disableInput() {
    const inputField = document.getElementById('inputField');
    inputField.disabled = true;
    alert("Zeit ist abgelaufen! Keine weiteren Eingaben möglich.");
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
