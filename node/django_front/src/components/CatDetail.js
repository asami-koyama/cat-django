import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { Detail } from '../function/theme';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../function/Atom';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function CatDetail() {
    const status = useRecoilValue(userDataState);
    const [menus, setMenus] = useState();

    console.log(useParams());
    const { id } = useParams();
    const [cat, setCat] = useState([]);
    useEffect(() => {
        axios.get('http://192.168.150.201:8000/api/cats/' + id).then((res) => {
            setCat(res.data);
        });
    }, []);

    const row = cat;
    const Items = [
        { field: row.name, headerName: '名前' },
        { field: row.status, headerName: 'ステータス' },
        { field: row.location, headerName: '地方' },
        { field: row.protected_date, headerName: '保護日' },
        {
            field: row.age_year + '才' + row.age_month + 'ヶ月',
            headerName: '年齢',
        },
        { field: row.gender, headerName: '性別' },
        { field: row.pattern, headerName: '柄' },
        { field: row.color, headerName: '色' },
    ];
    const note = { field: row.note, headerName: '備考' };
    console.log(Items);

    console.log(status.user_type);
    useEffect(() => {
        console.log('effect');
        if (status.user_type == 'Supporter') {
            console.log('Supporter');
            setMenus(
                <Grid item xs={6}>
                    <Button>編集</Button>
                    <Button>削除</Button>
                </Grid>
            );
        } else if (status.user_type == 'Adopter') {
            console.log('Adopter');
            setMenus(
                <Grid item xs={6}>
                    <Button>里親申請</Button>
                </Grid>
            );
        }
    }, []);
    console.log(menus);

    return (
        <ThemeProvider theme={Detail}>
            <Box
                sx={{ backgroundColor: 'primary.contrastText' }}
                className="min-height-fulldisplay"
            >
                <Container
                    component="main"
                    maxWidth="sm"
                    alignitems="center"
                    justify="center"
                    sx={{ backgroundColor: '#FFFFFF' }}
                    className="min-height-fulldisplay"
                >
                    <Grid container justify="center">
                        <Grid item xs={12} sx={{ mt: 2, mx: 4 }} align="center">
                            {cat.img && (
                                <Card sx={{ maxWidth: 350, mb: 2 }}>
                                    <CardMedia
                                        component="img"
                                        alt="cat"
                                        image={cat.img}
                                    />
                                </Card>
                            )}
                        </Grid>

                        <Grid item xs={12} sx={{ pb: 2 }}>
                            <hr></hr>
                        </Grid>

                        <Grid container justify="center" spacing={2}>
                            {Items.map((item, index) => {
                                return (
                                    <Grid item xs={12}>
                                        <Grid container justify="center">
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    variant="p"
                                                    color="secondary"
                                                >
                                                    {item.headerName}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography
                                                    variant="p"
                                                    color="primary"
                                                    sx={{
                                                        whiteSpace: 'pre-wrap',
                                                    }}
                                                >
                                                    {item.field}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            })}

                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={0.5}>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={4}>
                                        <Typography
                                            variant="p"
                                            color="secondary"
                                        >
                                            {note.headerName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <Typography
                                            variant="p"
                                            color="primary"
                                            sx={{ whiteSpace: 'pre-wrap' }}
                                        >
                                            {note.field}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={8}></Grid>
                            <Grid item xs={4}>
                                {menus}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default CatDetail;
