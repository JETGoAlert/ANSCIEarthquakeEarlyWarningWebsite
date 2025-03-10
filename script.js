// Play alert sound function
const alertSound = new Audio("sounds/alert.mp3");

// Function to fetch and display earthquake alerts
async function checkForAlerts() {
    const apiURL = "https://earthquake.phivolcs.dost.gov.ph/api/latest";  // Example PHIVOLCS API URL

    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        
        if (data.earthquakes.length > 0) {
            let quake = data.earthquakes[0];
            let magnitude = quake.magnitude;
            let location = quake.location;

            // Determine alert level based on magnitude
            let alertLevel;
            if (magnitude < 3.0) {
                alertLevel = "Blue (Minor)";
            } else if (magnitude < 4.5) {
                alertLevel = "Green (Light)";
            } else if (magnitude < 6.0) {
                alertLevel = "Yellow (Moderate)";
            } else if (magnitude < 7.5) {
                alertLevel = "Orange (Strong)";
            } else {
                alertLevel = "Red (Severe)";
            }

            // Display alert
            document.getElementById("alert-container").innerHTML = `
                <div class="alert ${alertLevel.toLowerCase()}">
                    <strong>⚠️ Earthquake Alert:</strong> ${magnitude} magnitude near ${location} <br>
                    Alert Level: ${alertLevel} <br>
                    <em>Drop, Cover, Hold On!</em>
                </div>
            `;

            // Play sound
            alertSound.play();
        } else {
            document.getElementById("alert-container").innerHTML = "✅ No recent earthquake detected.";
        }
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
    }
}

// Initialize Google Maps
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 14.6255, lng: 121.1222 }, // Example coordinates for Antipolo
        zoom: 14,
    });

    new google.maps.Marker({
        position: { lat: 14.6255, lng: 121.1222 },
        map,
        title: "Antipolo City National Science and Technology High School",
    });
}

// Function to fetch past earthquake data
async function loadPastEarthquakeData() {
    try {
        let response = await fetch("data/past_earthquakes.json");
        let earthquakes = await response.json();

        let output = "<h3>Past Earthquakes</h3><ul>";
        earthquakes.forEach(quake => {
            output += `<li>${quake.date} - ${quake.magnitude} magnitude at ${quake.location}</li>`;
        });
        output += "</ul>";

        document.getElementById("past-earthquakes").innerHTML = output;
    } catch (error) {
        console.error("Error loading past earthquake data:", error);
    }
}

// Load offline emergency guides
async function loadEmergencyGuides() {
    try {
        let response = await fetch("data/emergency_guides.json");
        let guides = await response.json();

        let output = "<h3>Emergency Preparedness</h3><ul>";
        guides.forEach(guide => {
            output += `<li>${guide.title}: ${guide.instructions}</li>`;
        });
        output += "</ul>";

        document.getElementById("emergency-guides").innerHTML = output;
    } catch (error) {
        console.error("Error loading emergency guides:", error);
    }
}
