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
