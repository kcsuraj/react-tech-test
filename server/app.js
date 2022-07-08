const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/localities', async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.AUS_POST_API_URL}/postcode/search.json`,
      {
        params: {
          q: req.query.suburb,
          state: req.query.state
        },
        headers: {
          'auth-key': process.env.AUS_POST_API_KEY
        }
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
