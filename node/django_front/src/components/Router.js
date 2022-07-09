import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import CatTablePage from './CatTablePage';
import WelcomePage from './WelcomePage';
import UserCreate from './UserCreate';
import Login from './Login';
import CatDetail from './CatDetail';
import Logout from './Logout';
import CatCreate from './CatCreate';
import AuthService from '../function/AuthService'
import React, { useState, useEffect, useRef } from 'react';
import { RecoilRoot } from "recoil";
import UserStatus from '../function/UserStatus'

const Router = () =>{
    return(
      <RecoilRoot>
        <BrowserRouter>
          <UserStatus/>
          <Header />
          <Routes>
            <Route path={`/`} element={<WelcomePage />} />
            <Route path={`/cats`} element={<CatTablePage />} />
            <Route path={`/adopterusercreate`} element={<UserCreate type = "Adopter"/>} />
            <Route path={`/supporterusercreate`} element={<UserCreate type = "Supporter"/>} />
            <Route path={`/login`} element={<Login/>} />
            <Route path={`/logout`} element={<Logout/>} />
            <Route path={`/catDetail/:id`} element={<CatDetail/>} />
            <Route path={`/catCreate`} element={<CatCreate/>} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>

    )

}
export default Router;