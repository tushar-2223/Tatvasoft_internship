const mongoose = require('mongoose');

const DB = 'mongodb://localhost:27017/tatvasoft_backend';

mongoose.set('strictQuery', true);

mongoose.connect(DB).then(() => {
    console.log('connection successfull');
}).catch((err) => console.log(`connection fail`));



