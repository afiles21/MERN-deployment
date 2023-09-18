const express = require('express');
const cors = require('cors');
const app = express();

app.use(
    cors(),
    express.json(),
    express.urlencoded({ extended: true})
)

require('./config/mongoose');

require('./routes/store')(app);

app.listen(8000, console.log("Server listening on port 8000"))