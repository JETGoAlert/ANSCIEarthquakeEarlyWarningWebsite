// 🌍 Initialize Google Maps for evacuation routes
function initMap() {
    var schoolLocation = { lat: 14.625, lng: 121.116 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: schoolLocation
    });

    new google.maps.Marker({
        position: schoolLocation,
        map: map,
        title: "Antipolo City National Science and Technology High School"
    });
}

// 🔥 Automatically Fetch Real-Time Earthquake Alerts
async function fetchEarthquakeAlerts() {
    const apiURL = "https://earthquake.phivolcs.dost.gov.ph/api/recent";  // Example API URL
    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        let alertBox = document.getElementById("alerts");

        if (data.earthquakes.length === 0) {
            alertBox.innerHTML = "<p>No recent earthquakes detected.</p>";
        } else {
            alertBox.innerHTML = "<h3>Recent Earthquake Alerts</h3>";
            data.earthquakes.forEach(eq => {
                alertBox.innerHTML += `
                    <div class="alert">
                        <p><strong>${eq.location}</strong> - Magnitude ${eq.magnitude}</p>
                        <p>Depth: ${eq.depth} km | Date: ${eq.date}</p>
                    </div>`;
                triggerMultiAlert(eq.magnitude, eq.location);
            });
        }
    } catch (error) {
        console.error("Error fetching real-time earthquakes:", error);
    }
}

// 📢 User-Triggered Earthquake Alert Check (Manual Check)
async function checkForAlerts() {
    const apiURL = "https://earthquake.phivolcs.dost.gov.ph/api/latest";  // Example API URL
    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        
        if (data.earthquakes.length > 0) {
            alert(`⚠️ Earthquake Alert: ${data.earthquakes[0].magnitude} magnitude near ${data.earthquakes[0].location}`);
        } else {
            alert("✅ No recent earthquake detected.");
        }
    } catch (error) {
        console.error("Error fetching earthquake data:", error);
    }
}

// 🚨 Multi-Alert System (Visual, Audio, Vibration)
function triggerMultiAlert(magnitude, location) {
    if (magnitude >= 5.0) {
        alert(`⚠️ Earthquake Alert: Magnitude ${magnitude} detected in ${location}!`);
        document.body.style.backgroundColor = "red";

        // Text-to-Speech Alert
        let speech = new SpeechSynthesisUtterance(`Earthquake Alert: Magnitude ${magnitude} detected in ${location}`);
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);

        // Vibrate for mobile users
        if (navigator.vibrate) {
            navigator.vibrate([500, 500, 500]);
        }
    }
}

// 📝 Handle Community Reporting Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("report-form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            let intensity = document.getElementById("intensity").value;
            let comments = document.getElementById("comments").value;

            if (intensity && comments) {
                alert("Thank you for reporting! Your data will help improve earthquake monitoring.");
                form.reset();
            } else {
                alert("Please complete the form before submitting.");
            }
        });
    }
});

// 🌐 Run Functions on Page Load
window.onload = function () {
    fetchEarthquakeAlerts();  // Auto-loads earthquake alerts
};
