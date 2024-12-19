const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Leidžia bet kokias užklausas iš kitų prievadų

app.get('/api/todos', (req, res) => {
  res.json([
    "Example Todo 1",
    "Example Todo 2",
    "Example Todo 55",
    "Example Todo 3"
  ]);
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Serveris veikia adresu http://localhost:${PORT}`);
});

