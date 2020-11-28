const express = require('express');
const path = require('path');
const port = 9000;

const app = express();

const envDir = path.join(__dirname, './src/config/development');
require(envDir)(app);

require('./src/routes/router')(app);

app.listen(port, () => {
    console.log(`Connected at http://localhost:${port}`);
    console.log('We are up. Lets have fun!');    
});