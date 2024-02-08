let mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
mongoose.connection
    .on('open', () => console.log('Database Connected Successfully!'))
    .on('error', (err) => console.log('Database Connection Failed!', err));
