import * as React from 'react';
import AuthService from '../function/AuthService';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { isLoginState } from '../function/Atom';
import { useRecoilState } from 'recoil';
import { Header } from '../function/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

export default function Logout() {
    const [isLogin, setisLogin] = useRecoilState(isLoginState);
    AuthService.logout();
    setisLogin(false);
    const navigate = useNavigate();
    function gohome() {
        navigate(`/`);
    }
    return (
        <ThemeProvider theme={Header}>
            <Container component="main" maxWidth="xs">
                <Container
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    ログアウトしました
                    <Button>
                        <Link href="/" variant="body2" color="secondary">
                            TOPへ戻る
                        </Link>
                    </Button>
                </Container>
            </Container>
        </ThemeProvider>
    );
}
