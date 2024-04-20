// src/playerUtils.js

// Initialize an empty array to store players
let players = [];

// Function to send players data to backend
export function sendPlayersData() {
  // Make an HTTP POST request to the backend API endpoint
  fetch('http://your-backend-api.com/store-players', {
    method: 'POST', // Define the HTTP method as POST
    headers: {
      'Content-Type': 'application/json', // Set the Content-Type header to indicate JSON data
    },
    body: JSON.stringify({ players }), // Convert the players array to JSON and send it in the request body
  })
  .then(response => { // Handle the response from the server
    if (response.ok) { // Check if the response status is in the successful range (200-299)
      console.log('Data sent successfully!'); // Log a success message to the console
    } else {
      console.error('Failed to send data to the backend.'); // Log an error message to the console if the response status indicates failure
    }
  })
  .catch(error => { // Catch any errors that occur during the fetch operation
    console.error('Error:', error); // Log the error to the console
  });
}

// Function to add a player dynamically
export function addPlayer(playerName) {
  players.push(playerName); // Add the new player to the players array
  sendPlayersData(); // Call the sendPlayersData function to send updated players data to the backend
}

// Function to remove a player dynamically
export function removePlayer(index) {
  players.splice(index, 1); // Remove the player at the specified index from the players array
  sendPlayersData(); // Call the sendPlayersData function to send updated players data to the backend
}
