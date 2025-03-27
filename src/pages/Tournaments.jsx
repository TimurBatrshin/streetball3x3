import React, { Component } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const TournamentsContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
  margin-top: 20px;
`;

const TournamentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TournamentItem = styled.li`
  padding: 10px;
`;

const RegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
`;

const ButtonStyled = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
`;

class Tournaments extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tournamentsData: [],
        loadingStatus: true,
        errorMessage: null,
        name: '',
        email: '',
        team: { player1: '', player2: '', player3: '', substitute: '' },
        selectedTournamentId: '',
        registeredOnTournamentUsers: {}
    };
  }

  componentDidMount() {
    const tournamentsUrl = 'http://localhost:3004/api/tournaments';
    const registrationsUrl = 'http://localhost:3004/api/registrations-on-tournament';

    console.log(`Requesting tournaments from ${tournamentsUrl}`);
    axios.get(tournamentsUrl)
      .then(response => this.setState({ tournamentsData: response.data, loadingStatus: false }))
      .catch(error => this.setState({ errorMessage: error.message, loadingStatus: false }));

    console.log(`Requesting registrations on tournament from ${registrationsUrl}`);
    axios.get(registrationsUrl)
      .then(response => this.setState({ registeredOnTournamentUsers: response.data }))
      .catch(error => console.error(`Error fetching registrations on tournament: ${error}`));
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  
  handleTeamChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      team: {
        ...prevState.team,
        [name]: value
      }
    }));
  };
  
  handleSelectTournamentChange = (event) => {
    this.setState({ selectedTournamentId: event.target.value });
  };
  
  handleSubmitRegistrationOnTournament = (event) => {
    event.preventDefault();
    const { selectedTournamentId, name, email, team } = this.state;
    const registerTournamentUrl = 'http://localhost:3004/api/register-on-tournament';

    console.log(`Registering on tournament at ${registerTournamentUrl}`);
    try {
      axios.post(registerTournamentUrl, { tournamentId: selectedTournamentId, name, email, team })
        .then(() => {
          console.log("Зарегистрированы на турнир");
          axios.get('http://localhost:3004/api/registrations-on-tournament')
            .then(response => this.setState({ registeredOnTournamentUsers: response.data }))
            .catch(error => console.error(`Error fetching registrations on tournament after registration: ${error}`));
        })
        .catch(error => console.error(`Error registering on tournament: ${error}`));
    } catch (e) {
      console.error(`Error in try-catch registering on tournament: ${e}`);
    }
  };

  render() {
    if (this.state.loadingStatus) return <div>Loading...</div>;
    if (this.state.errorMessage) return <div>Error occurred</div>;

    return (
      <TournamentsContainer>
        <h2>Турниры</h2>
        <TournamentList>
          {this.state.tournamentsData.map(tourament => (
            <TournamentItem key={tourament.id}>
              <Link to={`/tournaments/${tourament.id}`}>{tourament.name}</Link>
              <input type="radio" value={tourament.id} onChange={this.handleSelectTournamentChange} />
              {this.state.registeredOnTournamentUsers[tourament.id]?.map(user => (
                <p key={user.email}>{user.name} ({user.email})</p>
              ))}
            </TournamentItem>
          ))}
        </TournamentList>
        <RegistrationForm onSubmit={this.handleSubmitRegistrationOnTournament}>
          <InputField type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Введите имя" />
          <InputField type="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Введите email" />
          <InputField type="text" name="player1" value={this.state.team.player1} onChange={this.handleTeamChange} placeholder="Игрок 1" />
          <InputField type="text" name="player2" value={this.state.team.player2} onChange={this.handleTeamChange} placeholder="Игрок 2" />
          <InputField type="text" name="player3" value={this.state.team.player3} onChange={this.handleTeamChange} placeholder="Игрок 3" />
          <InputField type="text" name="substitute" value={this.state.team.substitute} onChange={this.handleTeamChange} placeholder="Запасной игрок" />
          <ButtonStyled type="submit">Зарегистрироваться на выбранный Турнир</ButtonStyled>
        </RegistrationForm>
      </TournamentsContainer>
    );
  }
}

export default Tournaments;