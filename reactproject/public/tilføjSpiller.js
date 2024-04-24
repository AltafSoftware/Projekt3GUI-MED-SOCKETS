// Handle button click to add player
document.getElementById("tilføjSpillereKnap").addEventListener("click", function () 
{
    // Get the player name from the input field
    const playerNameInput = document.getElementById("Spillere");
    const playerName = playerNameInput.value.trim(); // Trim whitespace from the input

    // Check if the player name is not empty
    if (playerName !== "") 
    {
        // Add player name to the list
        addPlayerToList(playerName);
    
        // Clear the input field
        playerNameInput.value = ''; // Set input field value to an empty string

        // Send player name to backend
        fetch('http://localhost:3001/store-player', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ player: playerName }),
        })
        .then(response => 
        {
            if (response.ok) 
            {
                console.log('Player name sent successfully to backend!');
                // Reset input field
                playerNameInput.value = '';
            } 
            else 
            {
                console.error('Failed to send player name to backend.');
                // Handle error, show error message, or retry
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } 
    else 
    {
        console.log('Please enter a player name.'); // Notify if input field is empty
    }
});

// Function to add player name to the list
function addPlayerToList(playerName) 
{
    // Create a new list item
    const listItem = document.createElement("li");
    listItem.textContent = playerName;

    // Append the new list item to the player list
    const playerList = document.getElementById("spillerListe");
    playerList.appendChild(listItem);
}
