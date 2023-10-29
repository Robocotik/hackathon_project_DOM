const express = require("express");
const router = express.Router();

router.put("/", async (req, res) => {
    const data = req.body;
    console.log(data);
    await fetch('http://localhost:3002/data/changeData', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req.body)
    })
});

module.exports = router;