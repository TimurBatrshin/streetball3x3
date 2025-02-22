import React from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

const TournamentDetailsContainer = styled.div`
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
    margin-top: 20px;
`;

const DetailsSection = styled.section`
    margin-bottom: 20px;
`;

const RegisteredPlayersList = styled.ul`
    list-style: none;
    padding: 0;
`;

const PlayerItem = styled.li`
    padding: 10px;
`;

const TournamentDetails = ({ tournamentId }) => {
    const [tournamentData, setTournamentData] = React.useState({});
    const [registeredPlayers, setRegisteredPlayers] = React.useState([]);

    React.useEffect(() => {
        axios.get(`http://localhost:3004/api/tournaments/${tournamentId}`)
            .then(response => setTournamentData(response.data))
            .catch(error => console.error(error));

        axios.get('http://localhost:3004/api/registrations-on-tourney')
            .then(response => {
                if (response.data[tournamentId]) {
                    setRegisteredPlayers(response.data[tournamentId]);
                }
            })
            .catch(error => console.error(error));
            
      }, []);

      return(
        <TournamentDetailsContainer >
        <h2 >Детали Турнира</h2 >
        <DetailsSection>
        <p>Название:{tournamentData.name}</p>
        </DetailsSection>
        
        <h3>Зарегистрированные Участники:</h3>
        <RegisteredPlayersList>{registeredPlayers.map(player =>
        (<PlayerItem key={player.email}>{player.name} ({player.email})</PlayerItem>)
        )}</RegisteredPlayersList>
        
        </TournamentDetailsContainer>);
        };
        
        export default TournamentDetails;