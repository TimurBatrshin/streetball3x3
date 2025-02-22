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

class Tournaments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournamentsData: [],
            loadingStatus: true,
            errorMessage: null,
            name: '',
            email: '',
            selectedTournamentId: '',
            registeredOnTournamentUsers:{}
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3004/api/tournaments')
            .then(response => this.setState({ tournamentsData: response.data, loadingStatus: false }))
            .catch(error => this.setState({ errorMessage: error.message, loadingStatus: false }));

        // Получите список зарегистрированных пользователей на каждый турнир
        axios.get('http://localhost::3004/api/registrations-on-tournament')
          .then(response => this.setState({ registeredOnTournamentUsers : response.data }))
          .catch(error => console.error(error));
            
      };

      handleNameChange = (event) => {
          this.setState({ name : event.target.value });
      };

      handleEmailChange = (event) => {
          this.setState({ email : event.target.value });
      };

      handleSelectTournamentChange=(event)=>{
          this.setState({selectedTournamentId:event.target.value});
      }

     handleSubmitRegistrationOnTournament=(event)=>{
         event.preventDefault();
         try{
             axios.post('http://localhost::3004/api/register-on-tournament',{tournamentId:this.state.selectedTournamentId,name:this.state.name,email:this.state.email})
             .then(()=>{
                 console.log("Зарегистрированы на турнир");
                 // Обновите список зарегистрированных пользователей после успешной регистрации
                 axios.get('http://localhost::3004/api/registrations-on-tournament')
                     .then(response=>this.setState({registeredOnTournamentUsers: response.data}))
                     .catch((error)=>console.error(error));
             })
             .catch((error)=>console.error(error));
         }
         catch(e){
             console.error(e);
         }
     }

     render(){
        if(this.state.loadingStatus)return<div>Loading...</div>;
        if(this.state.errorMessage)return<div>Error occurred</div>;
        
        return(
        <TournamentsContainer>
        <h2>Турниры</h2>
        <TournamentList>{this.state.tournamentsData.map(tourament=>
        (<TournamentItem key={tourament.id}>
        <Link to={`/tournaments/${tourament.id}`}>{tourament.name}</Link>
        {/* Добавьте радиокнопку для выбора турнира */}
        <input type="radio" value={tourament.id} onChange={this.handleSelectTournamentChange} />
        {/* Отобразите список зарегистрированных пользователей */}
        {this.state.registeredOnTournamentUsers[tourament.id]?.map(user=>
        (<p key={user.email}>{user.name} ({user.email})</p>)
        )}
        </TournamentItem>)
        )}</TournamentList>
        
        <RegistrationForm onSubmit={this.handleSubmitRegistrationOnTourney}>
        <InputField type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Введите имя" />
        <InputField type="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Введите email" />
        
        <ButtonStyled type="submit">Зарегестироваться на выбранный Турнир</ButtonStyled>
        
        </RegistrationForm>
        
        </TournamentsContainer>);
        };
        };
        
        export default Tournaments;