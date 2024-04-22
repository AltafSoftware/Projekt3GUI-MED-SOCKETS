
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

// Route to handle POST requests for storing player names
app.post('/store-players', (req, res) => {
    const playerNames = req.body.players; // Get the player names from the request body
    // Write player names to a file 
    fs.appendFile('spillere.txt', playerNames.join('\n') + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).json({ error: 'Error writing player names to file' });
        } else {
            console.log('Player names stored successfully:', playerNames);
            res.status(200).json({ message: 'Player names stored successfully' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
