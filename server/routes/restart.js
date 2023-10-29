const express = require("express");
const router = express.Router();

router.put("/", async (req, res) => {
    try {
        data = req.body;
        await fetch('http://localhost:3002/restart/', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;