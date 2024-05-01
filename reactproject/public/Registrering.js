// Opretter en WebSocket-forbindelse til serveren
const socket = new WebSocket('ws://localhost:3001');

// Lytter for når DOM er fuldt indlæst
document.addEventListener('DOMContentLoaded', function() {
    const startGameButton = document.getElementById("startSpilKnap");
    startGameButton.disabled = true; // Deaktiverer startspil-knappen i starten

    // Tilføjer en lytter til knappen for at tilføje spillere
    document.getElementById("tilføjSpillereKnap").addEventListener("click", function() {
        const playerNameInput = document.getElementById("Spillere");
        const playerName = playerNameInput.value.trim();

        if (playerName) {
            addPlayerToList(playerName); // Tilføjer spilleren til listen på siden
            playerNameInput.value = ''; // Nulstiller inputfeltet
            socket.send(JSON.stringify({ type: 'storePlayer', player: playerName })); // Sender spillerdata til server via WebSocket
        } else {
            console.log('Indtast venligst et spillernavn.'); // Logger en besked, hvis der ikke er indtastet et navn
        }
    });

    // Funktion til at tilføje spillernavnet til listen
    function addPlayerToList(playerName) {
        const playerList = document.getElementById("spillerListe");
        const listItem = document.createElement("li");
        listItem.style.display = 'flex';
        listItem.style.alignItems = 'center';
        listItem.style.justifyContent = 'space-between';

        const textNode = document.createElement("span");
        textNode.textContent = playerName;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener('change', checkCheckboxes);

        listItem.appendChild(textNode);
        listItem.appendChild(checkbox);

        playerList.appendChild(listItem);
    }

    // Funktion til at kontrollere afkrydsningsfelter og aktivere/deaktivere startspil-knappen
    function checkCheckboxes() {
        const checkboxes = document.querySelectorAll('#spillerListe input[type="checkbox"]:checked');
        startGameButton.disabled = checkboxes.length !== 2; // Aktiverer startknappen, hvis præcis to afkrydsningsfelter er afkrydset

        if (checkboxes.length === 2) {
            startGameButton.style.backgroundColor = "lime";
            startGameButton.style.color = "black";
        } else {
            startGameButton.style.backgroundColor = "#ff3535";
            startGameButton.style.color = "white";
        }
    }

    // Lytter for klik på "Start spil"-knappen og udfører den tilknyttede funktion
    document.getElementById("startSpilKnap").addEventListener("click", function(event) {
        event.preventDefault(); // Forhindrer standard formularafsendelse
        window.location.href = "spilSide.html"; // Omdirigerer til spillesiden
    });
});

// Håndterer beskeder modtaget fra serveren
socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Data received:', data);
};

// Håndterer fejl i WebSocket-forbindelsen
socket.onerror = function(error) {
    console.log('WebSocket Error:', error);
};
