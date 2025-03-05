    // Import Firebase modules
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
    
    const firebaseConfig = {
        apiKey: "AIzaSyDRi99adxkq-Gh1aJ-Vu4VMb8S28I36Amo",
        authDomain: "sosclock-7ee3e.firebaseapp.com",
        projectId: "sosclock-7ee3e",
        storageBucket: "sosclock-7ee3e.firebasestorage.app",
        messagingSenderId: "124230121563",
        appId: "1:124230121563:web:df9ea626ecaf45d44ba77e",
        measurementId: "G-38S8E2BRNS"
      };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    // Register function
    window.register = function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => alert("Registered Successfully!"))
            .catch(error => alert(error.message));
    };
    
    // Login function
    window.login = function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        signInWithEmailAndPassword(auth, email, password)
            .then(() => alert("Logged in!"))
            .catch(error => alert(error.message));
    };
    
    // Logout function
    window.logout = function() {
        signOut(auth).then(() => alert("Logged out!"));
    };
    
    window.addTrustedContact = function() {
        let name = document.getElementById("contact-name").value;
        let phone = document.getElementById("contact-phone").value;
    
        if (!name || !phone) {
            alert("Please enter both name and phone number!");
            return;
        }
    
        let contacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];
        contacts.push({ name, phone });
        localStorage.setItem("trustedContacts", JSON.stringify(contacts));
    
        displayTrustedContacts();
    };
    
    function displayTrustedContacts() {
        let contacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];
        let contactsList = document.getElementById("contacts-list");
        contactsList.innerHTML = "";
    
        contacts.forEach((contact, index) => {
            let li = document.createElement("li");
            li.innerHTML = contact.name + " - " + contact.phone + ' <button onclick="removeContact(' + index + ')">❌ Remove</button>';
            contactsList.appendChild(li);
        });
    }
    
    // Function to remove a contact
    window.removeContact=function(index) {
        let contacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];
        contacts.splice(index, 1);  // Remove from array
        localStorage.setItem("trustedContacts", JSON.stringify(contacts));  
        displayTrustedContacts();
        // updateContactList();
    }
    
    // Function to update the contact list UI
    function updateContactList() {
        const contactList = document.getElementById("contacts-list");
        contactList.innerHTML = "";
    
        trustedContacts.forEach((contact, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${contact.name} - ${contact.phone} 
                `;
            contactList.appendChild(li);
        });
    }
    
    // Call updateContactList() on page load to show saved contacts
    document.addEventListener("DOMContentLoaded", updateContactList);
    
    window.goToClock = function() {
        document.getElementById("trusted-contacts-container").style.display = "none";
        document.getElementById("clock-container").style.display = "block";
    };
    
    window.showTrustedContactsPage = function() {
        document.getElementById("clock-container").style.display = "none";
        document.getElementById("trusted-contacts-container").style.display = "block";
        displayTrustedContacts();
    };
    
    
    onAuthStateChanged(auth, user => {
        if (user) {
            let contacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];
    
            if (contacts.length === 0) {
                // If no contacts added, redirect to Trusted Contacts page
                showTrustedContactsPage();
            } else {
                // Otherwise, go to the clock page
                document.getElementById("auth-container").style.display = "none";
                document.getElementById("clock-container").style.display = "block";
            }
    
            document.getElementById("sos-btn").hidden = true;
            document.getElementById("siren-btn").hidden=true;
            document.getElementById("trust").hidden=true;
            // document.getElementById("find-places").hidden=true;
            document.getElementById("bot").hidden=true;
            // document.getElementById("new").hidden=true;
            // document.getElementById("safe").display=none;
            document.getElementById("geofen").hidden = true;
            document.getElementById("forum").hidden = true;
            document.getElementById("edu").hidden = true;
    
            
    
    
            document.getElementById("clock").addEventListener("dblclick", function () {
        document.getElementById("sos-btn").hidden = false;
        document.getElementById("siren-btn").hidden = false;
        // document.getElementById("safe").display=block;
        // document.getElementById("find-places").hidden=false;
        document.getElementById("geofen").hidden = false;
        document.getElementById("trust").hidden = false;
        document.getElementById("bot").hidden=false;
        document.getElementById("forum").hidden = false;
        document.getElementById("edu").hidden =false;
    
        // document.getElementById("extra-options").style.display = "block"; // Ensure extra options appear
    });
    
            // document.addEventListener("DOMContentLoaded", function () {
            //     let sosButton = document.getElementById("sos-btn");
            //     let extraOptions = document.getElementById("extra-options");
            
            //     if (sosButton && extraOptions) {
            //         sosButton.addEventListener("dblclick", function () {
            //             if (extraOptions.style.display === "none") {
            //                 extraOptions.style.display = "block";
            //             } else {
            //                 extraOptions.style.display = "none";
            //             }
            //         });
            //     } else {
            //         console.error("SOS button or extra options div not found!");
            //     }
            // });
            
    
            // Check if the browser supports Speech Recognition
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (window.SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";  // Set language
    
        // Start listening when the page loads
        recognition.start();
    
        recognition.onresult = function (event) {
            let transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
            console.log("Voice detected:", transcript);
    
            // Check for specific commands
            if (transcript.includes("help") || transcript.includes("sos") || transcript.includes("emergency")) {
                document.getElementById("sos-btn").click(); // Simulate SOS button click
            }
        };
    
        recognition.onerror = function (event) {
            console.error("Speech Recognition Error:", event.error);
        };
    
    } else {
        alert("⚠ Voice recognition is not supported in this browser.");
    }
    
    
            document.getElementById("sos-btn").addEventListener("click", function () {
                console.log("🚨 SOS button clicked!");
                alert("🚨 SOS button clicked! Processing...");
            
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        let latitude = position.coords.latitude;
                        let longitude = position.coords.longitude;
                        let contacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];
            
                        if (contacts.length === 0) {
                            alert("⚠ No trusted contacts found! Please add contacts.");
                            return;
                        }
            
                        console.log("Sending SOS to:", contacts); // Debugging
            
                        fetch("http://localhost:3000/send-sos", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ latitude, longitude, contacts })
                        })
                        .then(response => response.json())
                        .then(data => alert(data.message))
                        .catch(error => console.error("Error:", error));
            
                    }, error => {
                        alert("⚠ Location access denied. Please enable GPS.");
                    });
                } else {
                    alert("❌ Geolocation is not supported by this browser.");
                }
            });
            
    
            updateClock();       
        } else {
            document.getElementById("auth-container").style.display = "block";
            document.getElementById("clock-container").style.display = "none";
        }
    });
    
            
    
    
    
    // Function to update the clock
    function updateClock() {
        let now = new Date();
        document.getElementById("clock").textContent = now.toLocaleTimeString();
    }
    
    // Run the clock update every second
    setInterval(updateClock, 1000);
    updateClock(); // Call it once immediately
    
    
    // const GOOGLE_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY";
    
    // function findSafePlaces() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(position => {
    //             let latitude = position.coords.latitude;
    //             let longitude = position.coords.longitude;
    //             fetchSafePlaces(latitude, longitude);
    //         }, error => {
    //             alert("⚠ Location access denied. Please enable GPS.");
    //         });
    //     } else {
    //         alert("❌ Geolocation is not supported by this browser.");
    //     }
    // }
    
    // function fetchSafePlaces(latitude, longitude) {
    //     const places = ["police", "hospital"];
    //     const safePlacesList = document.getElementById("safe-places-list");
    //     safePlacesList.innerHTML = "<p>Loading...</p>";
    
    //     places.forEach(place => {
    //         let url = https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${place}&key=${GOOGLE_API_KEY};
    
    //         fetch(url)
    //             .then(response => response.json())
    //             .then(data => {
    //                 safePlacesList.innerHTML = "";
    //                 data.results.forEach(safePlace => {
    //                     let li = document.createElement("li");
    //                     li.innerHTML = `<strong>${safePlace.name}</strong><br>
    //                                     ${safePlace.vicinity}<br>
    //                                     <a href="https://www.google.com/maps/search/?api=1&query=${safePlace.geometry.location.lat},${safePlace.geometry.location.lng}" target="_blank">View on Map</a>`;
    //                     safePlacesList.appendChild(li);
    //                 });
    //             })
    //             .catch(error => console.error("Error fetching places:", error));
    //     });
    // }
    
    // function showSafePlacesPage() {
    //     document.getElementById("clock-container").style.display = "none";
    //     document.getElementById("safe-places-container").style.display = "block";
    // }
    
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("find-places").addEventListener("click", getSafePlaces);
    });
    
    function getSafePlaces() {
        let placeType = document.getElementById("place-type").value; // Get user-selected place type
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
    
                let url = `https://nominatim.openstreetmap.org/search?q=${placeType}&format=json&limit=5&lat=${lat}&lon=${lon}`;
    
                console.log("Fetching data from:", url); // Debugging: Check if URL is correct
    
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        let resultsContainer = document.getElementById("safe-places");
                        resultsContainer.innerHTML = "<h3>Nearby Safe Places:</h3>";
    
                        if (data.length === 0) {
                            resultsContainer.innerHTML += "<p>No safe places found nearby.</p>";
                            return;
                        }
    
                        let list = document.createElement("ul");
                        data.forEach(place => {
                            let listItem = document.createElement("li");
                            listItem.innerHTML = `<strong>${place.display_name}</strong> 
                            <br>📍 <a href="https://www.google.com/maps?q=${place.lat},${place.lon}" target="_blank">View on Map</a>`;
                            list.appendChild(listItem);
                        });
    
                        resultsContainer.appendChild(list);
                    })
                    .catch(error => console.error("Error fetching data:", error));
            }, error => {
                console.error("Error getting location:", error);
                alert("Location access denied! Please allow location access.");
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }
    
    // async function findSafePlaces() {
    //     if (!userLatitude || !userLongitude) {
    //         alert("Location not available. Press SOS first!");
    //         return;
    //     }
    
    //     const response = await fetch(/find-safe-places?lat=${userLatitude}&lon=${userLongitude});
    //     const data = await response.json();
    
    //     if (data.length === 0) {
    //         alert("No safe places found nearby.");
    //     } else {
    //         alert("Safe places found! Check the map.");
    //         displaySafePlacesOnMap(data);
    //     }
    // }
    
    // // Function to display safe places on the map
    // function displaySafePlacesOnMap(safePlaces) {
    //     safePlaces.forEach(place => {
    //         L.marker([place.lat, place.lon])
    //             .addTo(map)
    //             .bindPopup(<b>${place.name || "Unknown"}</b>);
    //     });
    // }
    
    // document.getElementById("findSafePlaceBtn").addEventListener("click", findSafePlaces);
    
    
    
    
    // Select siren button
    const sirenButton = document.getElementById('siren-btn');
    
    // Create an audio object
    const sirenSound = new Audio('mixkit-emergency-car-arrival-1655.wav');
    sirenSound.loop = true; // Loop sound
    
    let isSirenPlaying = false;
    
    // Toggle Siren
    sirenButton.addEventListener('click', () => {
        if (!isSirenPlaying) {
            sirenSound.play();
            sirenButton.textContent = "🔇 Stop Siren";
        } else {
            sirenSound.pause();
            sirenSound.currentTime = 0; // Reset sound
            sirenButton.textContent = "🔊 Play Siren";
        }
        isSirenPlaying = !isSirenPlaying;
    });
