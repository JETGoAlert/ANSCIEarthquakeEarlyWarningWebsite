const alertBox = document.getElementById("alert-box");
const alertSound = new Audio("assets/alert.mp3");

async function checkForAlerts() {
    const apiURL = "https://earthquake.phivolcs.dost.gov.ph/api/latest"; // Example API URL

    try {
        let response = await fetch(apiURL);
        let data = await response.json();

        if (data.earthquakes.length > 0) {
            let quake = data.earthquakes[0];
            let magnitude = quake.magnitude;
            let location = quake.location;
            let severity = getSeverityLevel(magnitude);
            
            alertBox.innerHTML = `
                <h2>${severity.message}</h2>
                <p><strong>Magnitude:</strong> ${magnitude}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Advice:</strong> ${severity.advice}</p>
            `;
            alertBox.className = severity.class;
            alertSound.play();
        } else {
            alertBox.innerHTML = "<h2>✅ No recent earthquake detected.</h2>";
            alertBox.className = "alert-default";
        }
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
    }
}

// Function to determine alert severity
function getSeverityLevel(magnitude) {
    if (magnitude < 3.0) {
        return { class: "alert-blue", message: "Minor Earthquake", advice: "No action needed." };
    } else if (magnitude < 5.0) {
        return { class: "alert-green", message: "Light Earthquake", advice: "Stay alert." };
    } else if (magnitude < 6.0) {
        return { class: "alert-yellow", message: "Moderate Earthquake", advice: "Be prepared to take action." };
    } else if (magnitude < 7.0) {
        return { class: "alert-orange", message: "Strong Earthquake", advice: "Drop, Cover, Hold On!" };
    } else {
        return { class: "alert-red", message: "Severe Earthquake!", advice: "Immediate action required!" };
    }
}
