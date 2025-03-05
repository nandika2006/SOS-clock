    const riskZones = [
        { lat: 12.9684, lon: 79.1559, radius: 500, display_name: "SVCE Campus (500m radius)" }, // 500m radius (Around SVCE campus)
        { lat: 12.9700, lon: 79.1575, radius: 800, display_name: "Near Sri Venkateshwara Temple" }, // 800m radius (A nearby temple)
        { lat: 12.9635, lon: 79.1525, radius: 600, display_name: "Perungalathur Junction" }, // 600m radius (A known junction near the area)
        { lat: 12.9730, lon: 79.1620, radius: 1000, display_name: "Guduvancheri Railway Station" }, // 1 km radius (A nearby railway station)
        { lat: 12.9660, lon: 79.1670, radius: 700, display_name: "Sholinganallur" } // 700m radius (A nearby locality)
    ];
    
    
    // Function to calculate distance using Haversine formula
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c * 1000; // Convert to meters
    }
    
    // Function to check if the user is in a risk zone
    function checkRiskZones(userLat, userLon) {
        let isInRiskZone = false;
    
        riskZones.forEach(zone => {
            let distance = getDistance(userLat, userLon, zone.lat, zone.lon);
            if (distance < zone.radius) { // Check if within radius
                isInRiskZone = true;
                triggerNotification("⚠ Warning! You are in a high-risk area: " + zone.display_name);
            }
        });
    
        // If the user is not in any risk zone, notify them they are in a safe zone
        if (!isInRiskZone) {
            triggerNotification("✅ Don't worry, you are in a safe zone.");
        }
    }
    
    // Function to trigger a notification
    function triggerNotification(message) {
        // Check if notifications are supported and permission is granted
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(message);
        } else if ("Notification" in window && Notification.permission !== "denied") {
            // Request permission to show notifications
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(message);
                }
            });
        }
    }
    
    // Get user's location and check risk zones
    function processGeofencing() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
    
                checkRiskZones(userLat, userLon); // Check if user is in a risk zone or safe zone
            }, function (error) {
                document.getElementById('status').innerHTML = "Error getting location.";
            });
        } else {
            document.getElementById('status').innerHTML = "Geolocation not supported.";
        }
    }
    
    // Function to go back in browser history
    function goBack() {
        window.history.back();
    }
    
    // Initialize geofencing on page load
    window.onload = processGeofencing;
