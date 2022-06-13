import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CatTablePage from './components/CatTablePage';
import WelcomePage from './components/WelcomePage';
import UserCreate from './components/UserCreate';
import Login from './components/Login';
import CatDetail from './components/CatDetail';
import Logout from './components/Logout';

class App extends React.Component {
  render() {
    this.state = {}
    return (
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path={`/`} element={<WelcomePage />} />
          <Route path={`/cats`} element={<CatTablePage />} />
          <Route path={`/adopterusercreate`} element={<UserCreate type = "Adopter"/>} />
          <Route path={`/supporterusercreate`} element={<UserCreate type = "Supporter"/>} />
          <Route path={`/login`} element={<Login/>} />
          <Route path={`/logout`} element={<Logout/>} />
          <Route path={`/CatDetail/:id`} element={<CatDetail/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;