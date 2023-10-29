const express = require("express");
const router = express.Router();

function verify(data) {
    isValid = true;
    if ("speed" in data) {
        if (!(1 <= data["speed"] && data["speed"] <= 20)) {
            isValid = false;
        }
    }
    if ("height" in data) {
        if (!(10 <= data["height"] && data["height"] <= 20)) {
            isValid = false;
        }
    }
    return isValid;
}

router.get("/", async (req, res) => {
    await fetch('http://localhost:3002/data/', {method: 'GET'})
        .then((response) => response.text())
        .then((body) => {
            res.json(body);
        });
});

router.put("/changeData", async (req, res) => {
    try {
        data = req.body;
        if (verify(data)) {
            await fetch('http://localhost:3002/data/changeData', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
        }
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;