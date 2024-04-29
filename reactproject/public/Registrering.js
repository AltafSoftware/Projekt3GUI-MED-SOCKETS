// DOM (Document Object Model) = represents the structure and content of Registrering.html, allowing JavaScript to interact with and manipulate elements on the page dynamically.

// Listen for the "DOMContentLoaded" event and perform the associated functions when the document is fully loaded:
document.addEventListener('DOMContentLoaded', function() {
    const startGameButton = document.getElementById("startSpilKnap");
    startGameButton.disabled = true; // Disable the start game button initially

    // Add an event listener to the button for adding players
    document.getElementById("tilføjSpillereKnap").addEventListener("click", function() {
        const playerNameInput = document.getElementById("Spillere");
        const playerName = playerNameInput.value.trim();

        // If a player name is specified
        if (playerName) {
            addPlayerToList(playerName); // Add the player to the list on the page
            playerNameInput.value = ''; // Reset the player name input field

            // Initialize a fetch request to the specified URL
            updateServerAndLeaderboard(playerName);
        } else {
            console.log('Indtast venligst et spillernavn.'); // Log a message if no player name is entered
        }
    });

// Function to add the player name to the list
function addPlayerToList(playerName) {
    const playerList = document.getElementById("spillerListe");
    const existingPlayers = Array.from(playerList.querySelectorAll('li span')).map(span => span.textContent);

    if (!existingPlayers.includes(playerName)) {
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
    } else {
        console.log('Player name already added.');
    }
}

    // Function to update server and leaderboard
    function updateServerAndLeaderboard(playerName) {
        fetch('http://localhost:3001/store-player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ player: playerName }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Spillernavn sendt til backend!');
            } else {
                console.error('Fejl ved afsendelse af spillernavn!');
            }
        })
        .catch(error => {
            console.error('Fejl:', error);
        });
    }

    // Function to check checkboxes and enable/disable the start game button
    function checkCheckboxes() {
        const checkboxes = document.querySelectorAll('#spillerListe input[type="checkbox"]:checked');
        startGameButton.disabled = checkboxes.length !== 2; // Enable start button if exactly two checkboxes are checked

        if (checkboxes.length === 2) {
            startGameButton.style.backgroundColor = "lime";
            startGameButton.style.color = "black";
        }
        else {
            startGameButton.style.backgroundColor = "red";
            startGameButton.style.color = "white";
        }
    }

    // Listen for clicks on the "Start spil" button and perform the associated function
    document.getElementById("startSpilKnap").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        window.location.href = "spilSide.html"; // Redirect to the game page
    });
});
