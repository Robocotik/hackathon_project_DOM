const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const port = 3001;
const cors = require("cors");

app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(cors());
// Routers
const dataRouter = require("./routes/data");
app.use("/data", dataRouter);
const restartRouter = require("./routes/restart");
app.use("/restart", restartRouter);

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
