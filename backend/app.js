const express = require('express');
// const mongoose = require('mongoose');
var cors = require('cors');
const app = express();

const PORT = 5000;

app.use(cors());

app.use(express.json());

// connection db
require('./db/conn');

//middleware = link the router
app.use(require('./router/auth'));

app.listen(PORT, () => {
    console.log(`server is running of http://localhost:5000`);
})
