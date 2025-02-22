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
flex-direction :column ; 
align-items:center; 
margin-top :20 px ;
`;
    
// Ввод данных
 const InputField=styled.input `
 padding :10 px ;  
 margin :5 px   O;  
 border-radius :5 px ;   
 border:l p x solid#ccc;   
 width:lOO%;  
 max-widthl300pX ;
 `;
    
 // Кнопка отправки формы
 const ButtonStyled=styled.button `
 background-color:#007bff;   
 color:white;     
 padding:lO p x   lO p x   lO p X ;     
 border:none;      
 border-radius:l O PX     O PX     P X      P X       P XX        
 cursor:pointer       
 margin-toplO Px        
 `;

const Players = () => {
    const [existingPlayers, setExistingPlayers] = useState([]);
    const [registeredPlayers, setRegisteredPlayers] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3004/api/players')
            .then(response => setExistingPlayers(response.data))
            .catch(error => console.error(error));

        axios.get('http://localhost:3004/api/registered-players')
            .then(response => setRegisteredPlayers(response.data))
            .catch(error => console.error(error));
            
      }, []);

      const [name, setName] = useState('');
      const [email, setEmail] = useState('');

      const handleSubmitRegistration = async (event) => {
          event.preventDefault();
          try {
              await axios.post('http://localhost:3004/api/register-player', { name, email });
              console.log('Игрок зарегистрирован');
              axios.get('http://localhost:3004/api/registered-players')
                  .then(response => setRegisteredPlayers(response.data))
                  .catch(error => console.error(error));
          } catch (error) {
              console.error(error);
          }
      };

      return(
        <PlayersContainer >
        <h2 >Существующие Игроки:</h2 >
        <PlayerList >
        {existingPlayers.map(player =>
        (<PlayerItem key={player.id}>{player.name} ({player.rating})</PlayerItem>)
        )}
        </PlayerList>
        
        <h3>Зарегистрированные Пользователи:</h3>
        <PlayerList>
        {registeredPlayers.map(user =>
        (<PlayerItem key={user.id}>{user.name} ({user.email})</PlayerItem>)
        )}
        </PlayerList>
        
        <RegistrationForm onSubmit={handleSubmitRegistration}>
        <InputField type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите имя" />
        <InputField type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" />
        
        <ButtonStyled type="submit">Зарегестироваться как новый Игрок</ButtonStyled>
        
        </RegistrationForm>
        
        </PlayersContainer>);
        };
        
        export default Players;