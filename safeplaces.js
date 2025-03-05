    // function findSafePlaces() {
    //     let placeType = document.getElementById("place-type").value;
    //     let safePlacesList = document.getElementById("safe-places-list");
    
    //     safePlacesList.innerHTML = <li>Finding ${placeType}s near you...</li>;
    
    //     // Simulating an API call (Replace this with real location data fetching)
    //     setTimeout(() => {
    //         safePlacesList.innerHTML = `
    //             <li>${placeType} 1 - Example Location</li>
    //             <li>${placeType} 2 - Example Location</li>
    //             <li>${placeType} 3 - Example Location</li>
    //         `;
    //     }, 2000);
    // }
    
    // function goBack() {
    //     window.location.href = "index.html"; // Redirect back to the main page
    // }
    // function findSafePlaces() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(position => {
    //             let lat = position.coords.latitude;
    //             let lon = position.coords.longitude;
    //             let type = document.getElementById("place-type").value;
                
    //             let query = type === "hospital" ? "hospital" : "police";
    //             let url = https://nominatim.openstreetmap.org/search?format=json&q=${query}&lat=${lat}&lon=${lon}&radius=5000;
    
    //             fetch(url)
    //                 .then(response => response.json())
    //                 .then(data => displayResults(data))
    //                 .catch(error => alert("Error fetching places: " + error));
    //         }, () => {
    //             alert("⚠ Location access denied! Enable GPS.");
    //         });
    //     } else {
    //         alert("❌ Geolocation not supported in this browser.");
    //     }
    // }
    
    // function displayResults(places) {
    //     let list = document.getElementById("safe-places-list");
    //     list.innerHTML = ""; // Clear previous results
    
    //     if (places.length === 0) {
    //         list.innerHTML = "<li>No safe places found nearby.</li>";
    //         return;
    //     }
    
    //     places.forEach(place => {
    //         let li = document.createElement("li");
    //         li.textContent = ${place.display_name};
    //         list.appendChild(li);
    //     });
    // }
    
    // function goBack() {
    //     window.history.back();
    // }
    function findSafePlaces() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let type = document.getElementById("place-type").value;
    
                let query = type === "hospital" ? "hospital" : "police";
                let url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&bounded=1&viewbox=${lon-0.1},${lat-0.1},${lon+0.1},${lat+0.1}`;
    
                fetch(url)
                    .then(response => response.json())
                    .then(data => displayResults(data, lat, lon))
                    .catch(error => alert("Error fetching places: " + error));
            }, () => {
                alert("⚠ Location access denied! Enable GPS.");
            });
        } else {
            alert("❌ Geolocation not supported in this browser.");
        }
    }
    
    function displayResults(places, userLat, userLon) {
        let list = document.getElementById("safe-places-list");
        list.innerHTML = ""; // Clear previous results
    
        if (places.length === 0) {
            list.innerHTML = "<li>No safe places found nearby.</li>";
            return;
        }
    
        places.forEach(place => {
            let distance = getDistance(userLat, userLon, place.lat, place.lon);
            let li = document.createElement("li");
            li.textContent = `${place.display_name} - ${distance.toFixed(2)} km away`;
            list.appendChild(li);
        });
    }
    
    // Function to calculate distance between two coordinates (Haversine formula)
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    
    function goBack() {
        window.history.back();
    }
