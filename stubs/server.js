const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

// Используйте crypto.randomUUID() напрямую, так как randomUUID не экспортируется отдельно
function generateUUID() {
    return crypto.randomUUID();
}


const app = express();
app.use(express.json());
app.use(cors());

let playersData = [
    { id: 1, name: 'John Doe', rating: 1500 },
    { id: 2, name:'Jane Smith', rating:1600}
];

let registeredPlayersData=[];

// API endpoint для получения списка существующих игроков
app.get('/api/players', (_, res) => {
    res.json(playersData);
});

// API endpoint для регистрации нового игрока
app.post('/api/register-player', (req, res) => {
    if (!req.body || !req.body.name || !req.body.email) {
        return res.status(400).json({ message: 'Invalid request data' });
    }
    
    const { name, email } = req.body;
    
    // Генерируем уникальный id с помощью crypto.randomUUID()
    const newId = generateUUID();
    
    // Добавляем нового игрока в массив зарегистрированных пользователей
    registeredPlayersData.push({ id: newId, name, email });
    
    res.json({ message: 'Игрок зарегистрирован' });
});

// API endpoint для получения списка зарегистрированных пользователей (новых игроков)
app.get('/api/registered-players', (_, res) => {
    res.json(registeredPlayersData);
});

let tournamentsData=[
  {"id":"1","name":"FIBA World Cup"},
  {"id":"2","name":"Local Tournament"}
];

// API endpoint для получения списка турниров
app.get('/api/tournaments',(_,res)=>{
  res.json(tournamentsData);
})

let registrationsOnTournament={};

// API endpoint для регистрации пользователя на турнире
app.post('/api/register-on-tournament',(req,res)=>{
  if (!req.body || !req.body.tournamentId || !req.body.name || !req.body.email) {
      return res.status(400).json({ message: 'Invalid request data' });
   }
   
   const{tournamentId,name,email}=req.body;
   
   if(!registrationsOnTournament[tournamentId]){
       registrationsOnTournament[tournamentId]=[];
   }
   
   registrationsOnTournament[tournamentId].push({
       player:{name,email}
   })
   
   console.log(registrationsOnTournament);

   // Возвращаем подтверждение регистрации
   
     return(res.status(201).json({
         message:`Player ${name} is registered on tournament ${tournamentId}`
     }));
 })

// API endpoint для получения списка зарегистрированных пользователей по каждому туруиу 
app.get('/api/registrations-on-tourney',( _,res )=>{
     let result={};
     for(let tourney in registrationsOnTournament){
         result[tourney]=registrationsOnTourney[tourney].map(player=>player.player)
     }
     
     return(res.status(200).json(result));
 })

const port=3004;

function main() {

 app.listen(port);

 console.log(`Server running on port ${port}`);
}

main();

