const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const itemRoutes = require('./routes/itemRoutes');

app.use(bodyParser.json());

// Connect to the database
require('./db/connection');

app.use('/api/items', itemRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
