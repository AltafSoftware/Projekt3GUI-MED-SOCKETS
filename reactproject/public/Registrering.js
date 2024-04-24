document.addEventListener('DOMContentLoaded', function() {
    const startGameButton = document.getElementById("startSpilKnap");
    startGameButton.disabled = true; // Start disabled

    // Handle button click to add player
    document.getElementById("tilføjSpillereKnap").addEventListener("click", function() {
        const playerNameInput = document.getElementById("Spillere");
        const playerName = playerNameInput.value.trim();

        if (playerName) {
            addPlayerToList(playerName);
            playerNameInput.value = '';

            fetch('http://localhost:3001/store-player', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ player: playerName }),
            })
            .then(response => {
                if (response.ok) {
                    console.log('Player name sent successfully to backend!');
                } else {
                    console.error('Failed to send player name to backend.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.log('Please enter a player name.');
        }
    });

    // Function to add player name to the list
    function addPlayerToList(playerName) {
        const listItem = document.createElement("li");
        listItem.style.display = 'flex';
        listItem.style.alignItems = 'center';
        listItem.style.justifyContent = 'space-between';

        const textNode = document.createElement("span");
        textNode.textContent = playerName;
        // FJERN DETTE FOR AT FÅ NAVNE UD I VENSTRE SIDE: <-----------------
        textNode.style.flex = '1';

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener('change', checkCheckboxes);

        listItem.appendChild(textNode);
        listItem.appendChild(checkbox);

        const playerList = document.getElementById("spillerListe");
        playerList.appendChild(listItem);
    }

    // Function to enable or disable start game button
    function checkCheckboxes() {
        const checkboxes = document.querySelectorAll('#spillerListe input[type="checkbox"]:checked');
        // TJEKKER HVOR MANGE BOKSE DER ER KRYDSET AF, OG SÆTTER KNAPPEN HEREFTER: <--------------------------------
        if (startGameButton.disabled = checkboxes.length == 2) {
            startGameButton.disabled = false;
        }
        else if (startGameButton.disabled = checkboxes.length != 2) {
            startGameButton.disabled = true;
        }
    }

    // Handling the "Start spil" button click
    document.getElementById("startSpilKnap").addEventListener("click", function(event) {
        event.preventDefault();
        
        // Proceed with starting the game
        window.location.href = "drukspilSide.html";
    });
});
