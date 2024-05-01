const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 3001;

// Sætter serveren til at tjene statiske filer fra 'public' mappen
app.use(express.static(path.join(__dirname, 'public')));
// Hvis du har andre ressourcer i 'src' mappen, så tjener du dem også
app.use('/src', express.static(path.join(__dirname, 'src'))); 

// Funktion til at håndtere lagring af spiller navne og opdatering af leaderboard
function storePlayer(playerName, ws) {
    fs.readFile('leaderboard.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading from file:', err);
            return;
        }

        const existingPlayers = new Set(data.split('\n').filter(Boolean));
        if (existingPlayers.has(playerName)) {
            ws.send(JSON.stringify({ message: 'Player name already exists' }));
        } else {
            fs.appendFile('leaderboard.txt', playerName + '\n', err => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return;
                }
                ws.send(JSON.stringify({ message: 'Player name stored successfully' }));
                broadcastLeaderboard();
            });
        }
    });
}

// Funktion til at sende opdateret leaderboard til alle forbundne klienter
function broadcastLeaderboard() {
    fs.readFile('leaderboard.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read leaderboard:', err);
            return;
        }
        const uniquePlayers = Array.from(new Set(data.trim().split('\n').filter(Boolean)));
        console.log('Spiller:', uniquePlayers);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ players: uniquePlayers }));
            }
        });
    });
}

// Håndtering af WebSocket-forbindelser
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        const data = JSON.parse(message);
        if (data.type === 'storePlayer') {
            storePlayer(data.player, ws);
        } else if (data.type === 'requestLeaderboard') {
            broadcastLeaderboard();
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
