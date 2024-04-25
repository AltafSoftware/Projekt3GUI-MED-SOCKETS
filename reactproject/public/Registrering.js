
// DOM (Document Object Model) = repræsenterer strukturen og indholdet af Registrering.html, hvilket 
// tillader JavaScriptet at interagere med, og manipulere elementer på siden dynamisk.

// Lyt efter begivenheden "DOMContentLoaded" og udfør de tilknyttede funktioner, når dokumentet er fuldt indlæst:
document.addEventListener('DOMContentLoaded', function() 
{
    const startGameButton = document.getElementById("startSpilKnap");
    startGameButton.disabled = true; // Startknappen deaktiveres i starten

    // Tilføj en eventListener til knappen for at tilføje spillere
    document.getElementById("tilføjSpillereKnap").addEventListener("click", function() 
    {
    // Lyt efter klik på knappen for at tilføje spillere og udfør den tilknyttede funktion

    // Hent HTML-elementet med id'et "Spillere" fra DOM'en (Document Object Model)
    const playerNameInput = document.getElementById("Spillere");

    // Hent værdien af det indtastede spillernavn fra input-feltet og fjern eventuel overskydende mellemrum etc.
    const playerName = playerNameInput.value.trim();

        // Hvis der er angivet et spillernavn
        if (playerName) {
            // Så tilføj spilleren til listen
            addPlayerToList(playerName); 
            // Og nulstil inputfeltet for spillernavne
            playerNameInput.value = ''; 

            // Initierer en fetch-anmodning til den specificerede URL
            fetch('http://localhost:3001/store-player', {
                // Angiver, at anmodningen er en HTTP POST-anmodning
                method: 'POST',
                // Specificerer, at den data der sendes til serveren, er i JSON-format
                headers: {
                    'Content-Type': 'application/json',
                },
                // Dataen der sendes til serveren, konverteret til en JSON-streng med en key og value
                body: JSON.stringify({ player: playerName }),
            })
            .then(response => {
                // Håndter svar fra serveren
                if (response.ok) {
                    console.log('Spillernavn sendt til backend!');
                } else {
                    console.error('Fejl ved afsendelse af spillernavn!');
                }
            })
            .catch(error => {
                // Håndter fejl ved fetch-anmodningen
                console.error('Fejl:', error);
            });
        } else {
            console.log('Indtast venligst et spillernavn.');
            // Hvis intet spillernavn er angivet, udskriv en besked til konsollen
        }
    });

    // Funktion til at tilføje spillernavnet til listen
    function addPlayerToList(playerName) {
    // Opret et nyt listeelement til spillernavnet og tilføj det til spillerlisten

        // Opret et nyt listeelement (<li>) i HTML-dokumentet
        const listItem = document.createElement("li");

        // Angiv CSS-stil for det nye listeelement
        listItem.style.display = 'flex';
        listItem.style.alignItems = 'center';
        listItem.style.justifyContent = 'space-between';

        // Opret et nyt span-element i HTML-dokumentet til at indeholde spillernavnet
        const textNode = document.createElement("span");
        // Tekstindholdet af det nye span-element sættes til spillernavnet
        textNode.textContent = playerName;

        // Opret et nyt checkbox-element i HTML-dokumentet
        const checkbox = document.createElement("input");
        // Indstil typen af checkbox-elementet til "checkbox"
        checkbox.type = "checkbox";
        // Tilføj en eventListener til checkbox-elementet, som lytter efter ændringer/changes alt efter om boksen er markeret/u-markeret
        checkbox.addEventListener('change', checkCheckboxes);

        // Tilføj det nye span-element (indeholdende spillernavnet) som et barn til det nye listeelement
        listItem.appendChild(textNode);
        // Tilføj checkbox-elementet som et barn til det nye listeelement
        listItem.appendChild(checkbox);

        // Find det eksisterende element i HTML-dokumentet med id'et "spillerListe" og gem det i variablen playerList
        const playerList = document.getElementById("spillerListe");
        // Tilføj det nye listeelement som et barn til det eksisterende "spillerListe"-element i HTML-dokumentet
        playerList.appendChild(listItem);
    }

    // Funktion til at aktivere eller deaktivere startspil-knappen
    function checkCheckboxes() 
    {
        // Find alle markerede afkrydsningsfelter i spillerlisten
        const checkboxes = document.querySelectorAll('#spillerListe input[type="checkbox"]:checked');
        
        // Tjek antallet af markerede check-boxes og aktiver/deaktiver startspil-knappen baseret på antallet
        if (startGameButton.disabled = checkboxes.length == 2) {
            startGameButton.disabled = false;
        }
        else if (startGameButton.disabled = checkboxes.length != 2) {
            startGameButton.disabled = true;
        }
    }

    // Lyt efter klik på "Start spil"-knappen og udfør den tilknyttede funktion
    document.getElementById("startSpilKnap").addEventListener("click", function(event) 
    {
        // Forhindrer standardadfærd når der klikkes
        event.preventDefault();
        // Redirect til spilsiden
        window.location.href = "drukspilSide.html";
    });
    });
    