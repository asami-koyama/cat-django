import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import CatTablePage from './CatTablePage';
import WelcomePage from './WelcomePage';
import UserCreate from './UserCreate';
import Login from './Login';
import CatDetail from './CatDetail';
import Logout from './Logout';
import TestPage from './TestPage';
import CatCreate from './CatCreate';
import setGlobalStyle from '../function/GlobalStyle'
import AuthService from '../function/AuthService'
import React, { useState, useEffect, useRef } from 'react';

const Router = () =>{
    useEffect(() => {
        AuthService.getCurrentUser().then(result =>{
            console.log(result)
            if (result === 0){

            }

    },[localStorage.getItem("user")])
    });
    console.log('aaa')

    return(
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path={`/`} element={<WelcomePage />} />
          <Route path={`/cats`} element={<CatTablePage />} />
          <Route path={`/test`} element={<TestPage />} />
          <Route path={`/adopterusercreate`} element={<UserCreate type = "Adopter"/>} />
          <Route path={`/supporterusercreate`} element={<UserCreate type = "Supporter"/>} />
          <Route path={`/login`} element={<Login/>} />
          <Route path={`/logout`} element={<Logout/>} />
          <Route path={`/catDetail/:id`} element={<CatDetail/>} />
          <Route path={`/catCreate`} element={<CatCreate/>} />
        </Routes>
      </BrowserRouter>
    )

}
export default Router;