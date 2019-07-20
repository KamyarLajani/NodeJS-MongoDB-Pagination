const express = require("express");
const app = express();
const path = require("path");
const route = require(path.join(__dirname , "/routes/route.js"));
app.use("/", route);


app.listen(8080);
