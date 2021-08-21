const express = require("express");
const { json, urlencoded } = require('body-parser');
const cors = require("cors");


const app = express();

app.listen(3000, () => {
    console.log("Server up and running at port 3000");
});