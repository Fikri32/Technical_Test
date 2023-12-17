const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pendaftaranRoutes = require('./route/pendaftaran');

const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

// Call pendaftaran route
app.use('/api', pendaftaranRoutes);

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});