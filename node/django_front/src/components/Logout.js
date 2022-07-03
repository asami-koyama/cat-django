import * as React from 'react';
import AuthService from  '../function/AuthService'
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';

export default function Logout() {
    AuthService.logout();
    const navigate = useNavigate();
    function gohome(){
        navigate(`/`);
    }
    return(
        <Container component="main" maxWidth="xs">
            ログアウトしました
        </Container>
    )
}