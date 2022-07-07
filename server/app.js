const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.get('/localities', async (req, res) => {
  try {
    console.log(process.env.API_URL, process.env.API_KEY);
    const response = await axios.get(
      `${process.env.API_URL}/postcode/search.json`,
      {
        params: {
          q: req.query.suburb,
          state: req.query.state
        },
        headers: {
          'auth-key': process.env.API_KEY
        }
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
