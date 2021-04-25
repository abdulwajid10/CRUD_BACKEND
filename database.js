const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Freestyler100:Freestyler100@cluster0.xmufw.mongodb.net/CrudDB?retryWrites=true',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (!err) { console.warn('Database Connected Succesfully') }
        else { console.warn("Error while connectin database !") }
    });

    module.exports = mongoose;