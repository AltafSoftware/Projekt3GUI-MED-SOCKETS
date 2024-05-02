// Establish a WebSocket connection to the server
const socket = new WebSocket('ws://localhost:3001');

socket.onopen = function() {
    console.log('WebSocket-forbindelse oprettet.');
    // socket.send(JSON.stringify({ type: 'requestLeaderboard' })); // Request updated leaderboard
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Data modtaget fra serveren:', data);

    if (data.players) {
        renderLeaderboard(data.players);
    }
    if (data.lowestTime) {
        displayLowestTime(data.lowestTime);
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

function displayLowestTime(time) {
    const tiderValue = document.getElementById('tiderValue');
    tiderValue.textContent = time;
}
