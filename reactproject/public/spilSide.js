// Establish a WebSocket connection to the server
const socket = new WebSocket('ws://localhost:3001');

socket.onopen = function() {
    console.log('WebSocket-forbindelse oprettet.');
    socket.send(JSON.stringify({ type: 'requestLeaderboard' })); // Request updated leaderboard
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Data modtaget fra serveren:', data);

    if (data.players) {
        renderLeaderboard(data.players);
    }
    if (data.number !== undefined) {
        console.log('Number received from server:', data.number);
        displayNumber(data.number);
    }
};

socket.onclose = function(event) {
    console.log('WebSocket-forbindelse lukket:', event);
};

socket.onerror = function(error) {
    console.log('WebSocket Error:', error);
};

function renderLeaderboard(playerNames) {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    playerNames.forEach(name => {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        leaderboardList.appendChild(listItem);
    });
}

function displayNumber(number) {
    const numberElement = document.createElement('h2');
    numberElement.textContent = 'Received Number: ' + number;
    document.body.appendChild(numberElement);
}
