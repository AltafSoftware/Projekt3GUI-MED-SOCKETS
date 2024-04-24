
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import the cors package

// const path = require('path'); // Import the path module // ADDED!

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

// // Serve static files from the 'src' directory
// app.use(express.static(path.join(__dirname, 'src'))); // ADDED!

// Route to handle POST requests for storing player names
app.post('/store-player', (req, res) => 
{
    const playerName = req.body.player; // Get the player name from the request body
    // Write player name to a file 
    fs.appendFile('spillere.txt', playerName + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).json({ error: 'Error writing player name to file' });
        } else {
            console.log('Player name stored successfully:', playerName);
            res.status(200).json({ message: 'Player name stored successfully' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
