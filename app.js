const express = require('express');
const path = require('path');

const app = express();

const envDir = path.join(__dirname, './src/config/development');
require(envDir)(app);

require('./src/routes/router')(app);

app.listen(app.get('port'), () => {
    console.log('We are up. Lets have fun!');
});