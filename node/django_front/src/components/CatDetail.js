import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {ThemeProvider } from '@mui/material/styles';
import { Detail } from '../function/theme'


const IMG_URL = "/image/cat_image/"


function CatDetail(){
    
    let { id } = useParams();
    const [cat, setCat] = useState([])
    useEffect(() => {
        axios.get('http://192.168.150.201:8000/api/cats/'+id)
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
        { field: row.age_year+"才"+row.age_month+"ヶ月", headerName: '年齢'},
        { field: row.gender, headerName: '性別'},
        { field: row.pattern, headerName: '柄'},
        { field: row.color, headerName: '色'},
        { field: row.note, headerName: '備考'},
      ];
    console.log(Items);

    

    return (
        <ThemeProvider theme={Detail}>
            <Box sx={{backgroundColor: 'primary.contrastText'}} className='min-height-fulldisplay'>
            <Container component="main" maxWidth="sm" alignitems="center" justify="center" sx={{backgroundColor: '#FFFFFF', pb:6}} className='min-height-fulldisplay'>
                <Grid container justify="center">
                    <Grid item xs={12} sx={{mt:2 ,mx:4}} align="center">
                        {cat.img &&
                        <Card sx={{ maxWidth: 350, mb:2}}>
                            <CardMedia
                                component="img"
                                alt="cat"
                                image={cat.img}
                            />
                        </Card>
                        }
                    </Grid>

                    <Grid item  xs={12}><hr></hr></Grid>

                    { Items.map((item, index) => {
                    return (
                        <Grid item xs={12} sx={{m: 1.3}}>
                            <Grid container justify="center">
                                <Grid item xs={2}></Grid>
                                <Grid item xs={4}>
                                    <Typography variant="p" color="secondary">{item.headerName}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="p" color="primary">{item.field}</Typography>
                                </Grid>
                                
                            </Grid>  
                        </Grid>
                    );
                    }) }

                </Grid>
            </Container>
            </Box>
        </ThemeProvider>
    );
}
  
export default CatDetail;