    require('dotenv').config();
    const express = require('express');
    const cors = require('cors');
    const twilio = require('twilio');
    const crypto=require('crypto');
    
    
    const app = express();
    app.use(express.json());
    app.use(cors());
    
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    
    const sosAlerts={};
    
    app.get('/', (req, res) => {
        res.send("Server is running...");
    });
    
    
    app.post('/send-sos', (req, res) => {
        const { latitude, longitude, contacts,victimPhone } = req.body;
        const locationURL = `https://www.google.com/maps?q=${latitude},${longitude}`;
    
        if (!contacts || contacts.length === 0) {
            return res.status(400).json({ success: false, message: "No trusted contacts found!" });
        }
        const ackCode = `ACK${crypto.randomInt(1000, 9999)}`;
        sosAlerts[ackCode] = { victimPhone, contacts };
    
        contacts.forEach(contact => {
            
    
            client.messages.create({
                body: `🚨 SOS ALERT! 🚨\nLocation: ${locationURL}\nClick here to acknowledge: ${ackCode}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: contact.phone
            })
            .then(message => console.log(`Message sent to ${contact.phone}: ${message.sid}`))
            .catch(error => console.error(`Error sending to ${contact.phone}:, error`));
        });
    
        res.json({ success: true, message: "SOS Sent to all trusted contacts!" });
    });
    
    
    app.get('/acknowledge', (req, res) => {
        const phone = req.query.phone;
    
        if (!phone) {
            return res.status(400).send("Missing phone parameter.");
        }
    
        // Notify victim and other trusted contacts
        let contacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];
    
        contacts.forEach(contact => {
            client.messages.create({
                body: `✅ ALERT: ${phone} has acknowledged the SOS and is ready to help!`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: contact.phone
            })
            .then(message => console.log(`Acknowledgment sent to ${contact.phone}: ${message.sid}`))
            .catch(error => console.error(`Error sending to ${contact.phone}:, error`));
        });
    
        res.send("Acknowledgment sent successfully.");
    });
    
    app.get('/check-acknowledgment', async (req, res) => {
        try {
            const messages = await client.messages.list({ to: process.env.TWILIO_PHONE_NUMBER, limit: 20 });
    
            messages.forEach(msg => {
                const incomingMsg = msg.body.trim();
                const fromPhone = msg.from;
    
                if (sosAlerts[incomingMsg]) {
                    let { victimPhone, contacts } = sosAlerts[incomingMsg];
    
                    // Notify the victim and all trusted contacts
                    contacts.forEach(contact => {
                        client.messages.create({
                            body: `✅ ALERT: ${fromPhone} has acknowledged the SOS and is ready to help!`,
                            from: process.env.TWILIO_PHONE_NUMBER,
                            to: contact.phone
                        })
                        .then(message => console.log(`Acknowledgment sent to ${contact.phone}: ${message.sid}`))
                        .catch(error => console.error(`Error sending to ${contact.phone}:, error`));
                    });
    
                    // Also notify the victim
                    client.messages.create({
                        body: `✅ HELP CONFIRMED: ${fromPhone} is coming to help!`,
                        from: process.env.TWILIO_PHONE_NUMBER,
                        to: victimPhone
                    });
    
                    // Remove the acknowledged code from memory
                    delete sosAlerts[incomingMsg];
                }
            });
    
            res.json({ success: true, message: "Acknowledgments checked." });
    
        } catch (error) {
            console.error("Error fetching messages:", error);
            res.status(500).json({ success: false, message: "Error checking acknowledgments." });
        }
    });
    
    // const express = require("express");
    // const axios = require("axios");
    
    
    
    // app.get("/find-safe-places", async (req, res) => {
    //     const { lat, lon } = req.query;
    
    //     if (!lat || !lon) {
    //         return res.status(400).json({ error: "Invalid coordinates" });
    //     }
    
    //     try {
    //         const overpassQuery = `
    //             [out:json];
    //             (
    //                 node["amenity"="hospital"](around:5000, ${lat}, ${lon});
    //                 node["amenity"="police"](around:5000, ${lat}, ${lon});
    //             );
    //             out;
    //         `;
    
    //         const response = await axios.get("https://overpass-api.de/api/interpreter", {
    //             params: { data: overpassQuery }
    //         });
    
    //         const places = response.data.elements.map(el => ({
    //             name: el.tags.name || "Unnamed",
    //             lat: el.lat,
    //             lon: el.lon
    //         }));
    
    //         res.json(places);
    //     } catch (error) {
    //         console.error("Error fetching safe places:", error);
    //         res.status(500).json({ error: "Failed to fetch safe places" });
    //     }
    // });
    // const { OpenAI } = require("openai");
    // require('dotenv').config();
    // const apiKey = process.env.OPENAI_API_KEY;
    
    
    // const openai = new OpenAI({ apiKey});
    
    // app.post('/chatbot', async (req, res) => {
    //     const { message } = req.body;
    
    //     if (!message) {
    //         return res.status(400).json({ error: "Message is required" });
    //     }
    
    //     try {
    //         const response = await openai.chat.completions.create({
    //             model: "gpt-3.5-turbo",
    //             messages: [{ role: "user", content: message }]
    //         });
    
    //         res.json({ reply: response.choices[0].message.content });
    //     } catch (error) {
    //         console.error("OpenAI API error:", error);
    //         res.status(500).json({ error: "Chatbot service failed" });
    //     }
    // });
    
    
    
    app.listen(3000, () => console.log('Server running on port 3000'));
