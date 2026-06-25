const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/contact", async (req, res) => {
    console.log("Received data:", req.body); 

    // Validate required fields
    const { firstName, lastName, email, message } = req.body;
    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ message: "Please fill all required fields" });
    }

    try {
        const contact = new Contact(req.body);
        await contact.save();
        console.log("Contact saved:", contact);
        res.json({ message: "Message sent successfully!" });
    } catch (err) {
        console.error("Error saving contact:", err);
        res.status(500).json({ message: "Failed to send message" });
    }
});

module.exports = router;
