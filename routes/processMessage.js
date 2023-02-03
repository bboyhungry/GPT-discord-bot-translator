const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/translate', async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    res.send({ text });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});