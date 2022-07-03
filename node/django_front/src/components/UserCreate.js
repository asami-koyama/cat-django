import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import { Sign } from '../function/theme';
import AuthService from  '../function/AuthService'
import { useNavigate } from "react-router-dom";

export default function SignUp(props) {
  const usertype = {type:'' , title:''}
  usertype.type = props.type;
  if(usertype.type == 'Adopter'){
    usertype.title = '里親登録';
  }else{
    usertype.title = 'サポーター登録';
  }

  const [isError, setError] = useState({
    register:false,
    emptyRegister:false,
    email:false,
    name:false,
    password:false
  });

  let ErrorText = {
    RegisterErrorText:"",
    EmailErrorText:"",
    UsernameErrorText:"",
    PassWordErrorText:""
  };

  const [values, setValues] = useState({
    name:'',
    email:'',
    password:''
  });

  function handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    const isempty = value === "";
    setValues({ ...values, [name]: value });
    setError({ ...isError, [name]: isempty });
  }

  const navigate = useNavigate();
  function success(){
    navigate(`/Cats`);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(values.name !== "" && values.email !== "" && values.password !== ""){
      const data = new FormData(event.currentTarget);
        AuthService.register(
            data.get('name'),
            data.get('email'),
            data.get('password'),
            usertype.type
          ).then(
            ()=>{
              success()
            },
            error => {
              setError({ ...isError, register: true });
              console.log(error);
            }
          );
    }else{
      setError({ ...isError, emptyRegister: true });
    }
  };

  if(isError.register){
    ErrorText.RegisterErrorText = (<Typography variant="body2" sx={{color:'#FF0000'}}>
    このメールアドレスは既に使われています
    </Typography>);
  }else{
    ErrorText.RegisterErrorText = "";
  }

  if(isError.emptyRegister){
    ErrorText.RegisterErrorText = (<Typography variant="body2" sx={{color:'#FF0000'}}>
    空欄を記入してください
    </Typography>);
  }else{
    ErrorText.RegisterErrorText = "";
  }

  if(isError.email){
    ErrorText.EmailErrorText = (<Typography variant="body2" sx={{color:'#FF0000'}}>
    メールアドレスの入力は必須です
    </Typography>);
  }else{
    ErrorText.EmailErrorText = "";
  }

  if(isError.name){
    ErrorText.UsernameErrorText = (<Typography variant="body2" sx={{color:'#FF0000'}}>
    ユーザ名の入力は必須です
    </Typography>);
  }else{
    ErrorText.UsernameErrorText = "";
  }

  if(isError.password){
    ErrorText.PasswordErrorText = (<Typography variant="body2" sx={{color:'#FF0000'}}>
    パスワードの入力は必須です
    </Typography>);
  }else{
    ErrorText.PasswordErrorText = "";
  }

  console.log(values);

  return (
    <ThemeProvider theme={Sign}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.contrastText' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {usertype.title}
          </Typography>
          {ErrorText.RegisterErrorText}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="ユーザ名"
                  autoFocus
                  onChange={handleInputChange}
                  defaultValue={values.name}
                />
                {ErrorText.UsernameErrorText}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  defaultValue={values.email}
                />
                {ErrorText.EmailErrorText}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                  defaultValue={values.password}
                />
                {ErrorText.PasswordErrorText}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登録
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" color="secondary">
                  登録済みの方はここからログイン
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}