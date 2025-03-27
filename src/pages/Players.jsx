import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

const PlayersContainer = styled.div`
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
    margin-top: 20px;
`;

const PlayerList = styled.ul`
    list-style: none;
    padding: 0;
`;

const PlayerItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #eee;
`;

// Форма регистрации
const RegistrationForm = styled.form`
display:flex; 
flex-direction: column; 
align-items:center; 
margin-top: 20px;
`;
    
// Ввод данных
const InputField = styled.input`
padding: 10px;  
margin: 5px 0;  
border-radius: 5px;   
border: 1px solid #ccc;   
width: 100%;  
max-width: 300px;
`;
    
// Кнопка отправки формы
const ButtonStyled = styled.button`
background-color: #007bff;   
color: white;
padding: 10px 10px 10px;     
border: none;      
border-radius: 10px;       
cursor: pointer;       
margin-top: 10px;        
`;

const Players = () => {
    const [existingPlayers, setExistingPlayers] = useState([]);
    const [registeredPlayers, setRegisteredPlayers] = useState([]);
    
    useEffect(() => {
        const playersUrl = 'http://localhost:3004/api/players';
        const registeredPlayersUrl = 'http://localhost:3004/api/registered-players';
        
        console.log(`Requesting existing players from ${playersUrl}`);
        axios.get(playersUrl)
            .then(response => setExistingPlayers(response.data))
            .catch(error => console.error(`Error fetching existing players: ${error}`));

        console.log(`Requesting registered players from ${registeredPlayersUrl}`);
        axios.get(registeredPlayersUrl)
            .then(response => setRegisteredPlayers(response.data))
            .catch(error => console.error(`Error fetching registered players: ${error}`));
            
    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmitRegistration = async (event) => {
        event.preventDefault();
        const registerPlayerUrl = 'http://localhost:3004/api/register-player';
        
        console.log(`Registering player at ${registerPlayerUrl}`);
        try {
            await axios.post(registerPlayerUrl, { name, email });
            console.log('Игрок зарегистрирован');
            axios.get('http://localhost:3004/api/registered-players')
                .then(response => setRegisteredPlayers(response.data))
                .catch(error => console.error(`Error fetching registered players after registration: ${error}`));
        } catch (error) {
            console.error(`Error registering player: ${error}`);
        }
    };

    return (
        <PlayersContainer>
            <h2>Существующие Игроки:</h2>
            <PlayerList>
                {existingPlayers.map(player => (
                    <PlayerItem key={player.id}>{player.name} ({player.rating})</PlayerItem>
                ))}
            </PlayerList>
            
            <h3>Зарегистрированные Пользователи:</h3>
            <PlayerList>
                {registeredPlayers.map(user => (
                    <PlayerItem key={user.id}>{user.name} ({user.email})</PlayerItem>
                ))}
            </PlayerList>
            
            <RegistrationForm onSubmit={handleSubmitRegistration}>
                <InputField type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите имя" />
                <InputField type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" />
                
                <ButtonStyled type="submit">Зарегистрироваться как новый Игрок</ButtonStyled>
            </RegistrationForm>
        </PlayersContainer>
    );
};

export default Players;