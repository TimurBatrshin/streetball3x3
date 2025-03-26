import React, { useEffect, useState } from 'react';
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
  const [tournamentData, setTournamentData] = useState({});
  const [registeredPlayers, setRegisteredPlayers] = useState([]);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/api/tournaments/${tournamentId}`);
        setTournamentData(response.data);
        const registrationsResponse = await axios.get(`http://localhost:3004/api/registrations-on-tourney`);
        if (registrationsResponse.data[tournamentId]) {
          setRegisteredPlayers(registrationsResponse.data[tournamentId]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTournamentDetails();
  }, [tournamentId]);

  return (
    <TournamentDetailsContainer>
      <h2>Турнирные подробности</h2>
      <DetailsSection>
        <p>Название: {tournamentData.name}</p>
        <p>Дата: {tournamentData.date}</p>
        <p>Время: {tournamentData.time}</p>
        <p>Место: {tournamentData.location}</p>
        <p>Правила: {tournamentData.rules}</p>
        <p>Призовой фонд: {tournamentData.prizeFund}</p>
        <p>Статус: {tournamentData.status}</p>
      </DetailsSection>
      <h3>Зарегистрированные участники:</h3>
      <RegisteredPlayersList>
        {registeredPlayers.map((player) => (
          <PlayerItem key={player.email}>
            {player.name} ({player.email})
          </PlayerItem>
        ))}
      </RegisteredPlayersList>
    </TournamentDetailsContainer>
  );
};

export default TournamentDetails;