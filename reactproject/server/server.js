const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Combined route to handle storing player names and updating the leaderboard
app.post('/store-player', (req, res) => {
    const playerName = req.body.player.trim();  // Ensure to trim any extra spaces

    fs.readFile('leaderboard.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading from file:', err);
            res.status(500).json({ error: 'Error reading leaderboard' });
            return;
        }

        const existingPlayers = new Set(data.split('\n').filter(Boolean));
        if (existingPlayers.has(playerName)) {
            console.log('Duplicate player name not added:', playerName);
            res.status(409).json({ message: 'Player name already exists' });
        } else {
            fs.appendFile('leaderboard.txt', playerName + '\n', err => {
                if (err) {
                    console.error('Error writing to file:', err);
                    res.status(500).json({ error: 'Error writing player name to file' });
                    return;
                }
                res.status(200).json({ message: 'Player name stored successfully' });
                console.log('Player name stored successfully:', playerName);
            });
        }
    });
});

// Route to get player names for the leaderboard
app.get('/get-leaderboard', (req, res) => {
    fs.readFile('leaderboard.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read leaderboard:', err);
            res.status(500).json({ error: 'Failed to read leaderboard' });
            return;
        }
        const uniquePlayers = Array.from(new Set(data.trim().split('\n').filter(name => name)));
        res.json({ players: uniquePlayers });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
