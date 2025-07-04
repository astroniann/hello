
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'turfs.json');

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

function loadTurfs() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function saveTurfs(list) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/turfs', (_, res) => {
  res.json(loadTurfs());
});

app.post('/api/turfs', (req, res) => {
  const turfs = loadTurfs();
  if (turfs.length >= 10) {
    return res.status(400).json({ error: 'MAX_TURFS' });
  }
  turfs.push(req.body);
  saveTurfs(turfs);
  res.json({ ok: true, count: turfs.length });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
