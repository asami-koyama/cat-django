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
import { ThemeProvider } from '@mui/material/styles';
import { Sign } from '../function/theme';
import AuthService from '../function/AuthService';
import { useNavigate } from 'react-router-dom';
import { isLoginState } from '../function/Atom';
import { useRecoilState } from 'recoil';

export default function Login() {
    const [isLogin, setisLogin] = useRecoilState(isLoginState);

    const [isError, setError] = useState(false);
    let ErrorText = '';

    const navigate = useNavigate();
    function success(token) {
        navigate(`/Cats`);
        setisLogin(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        AuthService.login(data.get('email'), data.get('password')).then(
            (token) => {
                success(token);
            },
            (error) => {
                setError(true);
                console.log(error);
            }
        );
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    if (isError) {
        ErrorText = (
            <Typography variant="body2" sx={{ color: '#FF0000' }}>
                メールアドレスまたはパスワードが間違っています
            </Typography>
        );
    } else {
        ErrorText = '';
    }

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
                        ログイン
                    </Typography>
                    {ErrorText}
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="メールアドレス"
                                    name="email"
                                    autoComplete="email"
                                />
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
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ログイン
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    href="/adopterusercreate"
                                    variant="body2"
                                    color="secondary"
                                >
                                    里親に新規登録するならこちら
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    href="/supporterusercreate"
                                    variant="body2"
                                    color="secondary"
                                >
                                    サポーターに新規登録するならこちら
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
