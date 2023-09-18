const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/javascript_belt_exam", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( () => console.log("Connected to MongoDB"))
    .catch( err => console.log("There was an error connecting to the database", err))