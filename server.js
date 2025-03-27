const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

function generateUUID() {
    return crypto.randomUUID();
}

const app = express();

const decodeURIComponentSafe = (encodedURI) => {
  try {
    return decodeURIComponent(encodedURI);
  } catch (e) {
    console.error('URI malformed', e);
    return encodedURI;
  }
};

// Middleware для проверки корректности URL с логированием
app.use((req, res, next) => {
  req.url = decodeURIComponentSafe(req.url);
  next();
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

let playersData = [
    { id: 1, name: 'John Doe', rating: 1500 },
    { id: 2, name:'Jane Smith', rating:1600}
];

let registeredPlayersData = [];

// Получение списка игроков
app.get('/api/players', (_, res) => {
    res.json(playersData);
});

// Регистрация нового игрока
app.post('/api/register-player', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Invalid request data' });
    }

    const newId = generateUUID();
    registeredPlayersData.push({ id: newId, name, email });

    res.json({ message: 'Игрок зарегистрирован' });
});

// Получение списка зарегистрированных игроков
app.get('/api/registered-players', (_, res) => {
    res.json(registeredPlayersData);
});

let tournamentsData = [
  { id: "1", name: "FIBA World Cup" },
  { id: "2", name: "Local Tournament" }
];

// Получение списка турниров
app.get('/api/tournaments', (_, res) => {
  res.json(tournamentsData);
});

let registrationsOnTournament = {};

// Регистрация на турнир
app.post('/api/register-on-tournament', (req, res) => {
  const { tournamentId, name, email } = req.body;
  if (!tournamentId || !name || !email) {
      return res.status(400).json({ message: 'Invalid request data' });
  }

  if (!registrationsOnTournament[tournamentId]) {
      registrationsOnTournament[tournamentId] = [];
  }

  registrationsOnTournament[tournamentId].push({
      player: { name, email }
  });

  console.log(registrationsOnTournament);

  return res.status(201).json({
      message: `Player ${name} is registered on tournament ${tournamentId}`
  });
});

// Получение списка зарегистрированных игроков по турнирам
app.get('/api/registrations-on-tourney', (_, res) => {
  let result = {};
  for (let tourney in registrationsOnTournament) {
      result[tourney] = registrationsOnTournament[tourney].map(player => player.player);
  }
  
  return res.status(200).json(result);
});

const port = 3004;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});