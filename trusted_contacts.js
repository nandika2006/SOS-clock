    let contacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];
    
    function addTrustedContact() {
        let name = document.getElementById("contact-name").value;
        let phone = document.getElementById("contact-phone").value;
        let contactsList = document.getElementById("contacts-list");
    
        if (name === "" || phone === "") {
            alert("Please enter both name and phone number.");
            return;
        }
    
        contacts.push({ name, phone });
        localStorage.setItem("trustedContacts", JSON.stringify(contacts));
    
        updateContactsList();
        document.getElementById("contact-name").value = "";
        document.getElementById("contact-phone").value = "";
    }
    
    function updateContactsList() {
        let contactsList = document.getElementById("contacts-list");
        contactsList.innerHTML = "";
    
        contacts.forEach((contact, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${contact.name} - ${contact.phone} 
                            <button onclick="removeContact(${index})">❌</button>`;
            contactsList.appendChild(li);
        });
    }
    
    function removeContact(index) {
        contacts.splice(index, 1);
        localStorage.setItem("trustedContacts", JSON.stringify(contacts));
        updateContactsList();
    }
    
    function goBack() {
        window.location.href = "index.html"; // Redirect to main page
    }
    
    // Load contacts when the page loads
    window.onload = updateContactsList;
