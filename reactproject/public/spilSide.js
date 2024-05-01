// Opretter en WebSocket-forbindelse til serveren
const socket = new WebSocket('ws://localhost:3001');

socket.onopen = function() {
    console.log('WebSocket-forbindelse oprettet.');
};

// Lytter for når siden er indlæst for at anmode om leaderboard-data
window.onload = function() {
    socket.send(JSON.stringify({ type: 'requestLeaderboard' })); // Anmoder om opdateret leaderboard
};

// Funktion til at opdatere og vise leaderboard på siden
function renderLeaderboard(playerNames) {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = ''; // Renser eksisterende liste
    
    playerNames.forEach(name => {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        leaderboardList.appendChild(listItem);
    });
}

// Håndterer beskeder modtaget fra serveren
socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Data modtaget fra serveren:', data);
    if (data.players) {
        renderLeaderboard(data.players);
    }
};

socket.onclose = function(event) {
    console.log('WebSocket-forbindelse lukket:', event);
};

// Håndterer fejl i WebSocket-forbindelsen
socket.onerror = function(error) {
    console.log('WebSocket Error:', error);
};

