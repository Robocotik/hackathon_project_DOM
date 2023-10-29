const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const port = 3002;
const cors = require("cors");

app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(cors());

const dataRouter = require("./routes/data");
app.use("/data", dataRouter);
const restartRouter = require("./routes/restart");
app.use("/restart", restartRouter);

app.listen(port, () => {

    console.log("Server running on port 3002");
});