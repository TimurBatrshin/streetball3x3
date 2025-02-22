import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Home from './pages/Home';
import Players from './pages/Players';
import Tournaments from './pages/Tournaments';
import TournamentDetails from './pages/TournamentDetails';
import React from 'react';

const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  padding-top: 20px;
`;

const Header = styled.header`
  background-color: #007bff;
  color: white;
  padding: 20px;
`;

function App() {
  return (
      <AppContainer>
          <Header>
              <h1>Мое 3x3 Приложение</h1>
              <nav>
                  <ul>
                      <li><Link to="/">Главная</Link></li>
                      <li><Link to="players">Игроки</Link></li>
                      <li><Link to="tournaments">Турниры</Link></li>
                  </ul>
              </nav>
          </Header>

          {/* Используем BrowserRouter с базовым URL */}
          <Router basename="/streetball3x3">
              {/* Ваши маршруты */}
              <Routes>
                  {/* Путь "/" будет соответствовать "/streetball3x3/" */}
                  <Route path="/" element={<Home />} />
                  
                  {/* Путь "players" будет соответствовать "/streetball3x3/players" */}
                  <Route path="players" element={<Players />} />
                  
                  {/* Путь "tournaments" будет соответствовать "/streetball3x3/tournaments" */}
                  <Route path="tournaments" element={<Tournaments />} />
                  
                  {/* Путь "tournaments/:id" будет соответствовать "/streetball3x3/tournaments/:id" */}
                  <Route path="tournaments/:id" element={<TournamentDetails />} />
                  <Route path="*" element={<div>Страница не найдена!</div>} />
              </Routes>

          </Router>

      </AppContainer>

  );
}

export default App;