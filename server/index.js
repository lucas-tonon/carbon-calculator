const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

// app.use(express.static('public'));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use(require('./routes/electricity'));
app.use(require('./routes/heating'));
app.use(require('./routes/transportation'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
