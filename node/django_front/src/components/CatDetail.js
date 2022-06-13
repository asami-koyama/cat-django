import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {ThemeProvider } from '@mui/material/styles';
import { Detail } from './theme'


const IMG_URL = "/image/cat_image/"



function CatDetail(){
    
    let { id } = useParams();
    const [cat, setCat] = useState([])
    useEffect(() => {
        axios.get('http://18.221.251.5:8000/api/cats/'+id)
        .then(res => {
            setCat(res.data)
        })
    }, [])

    const row = cat;
    console.log(row);
    const Items = [
        { field: row.name, headerName: '名前'},
        { field: row.status, headerName: 'ステータス'},
        { field: row.location, headerName: '地方'},
        { field: row.protected_date, headerName: '保護日'},
        { field: row.age, headerName: '年齢'},
        { field: row.gender, headerName: '性別'},
        { field: row.pattern, headerName: '柄'},
        { field: row.color, headerName: '色'},
        { field: row.note, headerName: '備考'},
      ];
    console.log(Items);
    return (
        <ThemeProvider theme={Detail}>
        <Container component="main" maxWidth="xs">
            <Grid container >
                <Grid item xs={12} sx={{m: 2}}>
                    <Card sx={{ maxWidth: 350, mb:2}}>
                    <CardMedia
                        component="img"
                        alt="cat"
                        image={IMG_URL + row.img}  
                    />
                    </Card>
                </Grid>

            { Items.map((item) => {
              return (
                <Grid item xs={12} sx={{m: 1}}>
                    <Grid container justify="center">
                        <Grid item xs={1} ></Grid>
                        <Grid item xs={4}>
                            <Typography variant="p" color="secondary">{item.headerName}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="p" color="primary">{item.field}</Typography>
                        </Grid>
                        <Grid item xs={1} ></Grid>
                    </Grid>  
                </Grid>
              );
            }) }


            </Grid>
        </Container>
        </ThemeProvider>
    );
}
  
export default CatDetail;