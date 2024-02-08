let express = require('express');
let routes = require('./routes/user.route');
let app = express();
app.use(express.json());
require('dotenv').config();
app.use('/user', routes);
require('./config/database');
app.listen(process.env.PORT, () => {
    console.log('Server is running on: ', process.env.PORT);
});
