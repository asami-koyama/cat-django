import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { Sign } from '../function/theme';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../function/Atom';

const date = new Date();
const year = date.getFullYear();
const month = ('00' + (date.getMonth() + 1)).slice(-2);
const day = ('00' + date.getDate()).slice(-2);
const hour = ('00' + date.getHours()).slice(-2);
const minute = ('00' + date.getMinutes()).slice(-2);
const second = ('00' + date.getSeconds()).slice(-2);
const millisecond = date.getMilliseconds();

const today = year + '-' + month + '-' + day;
const now = year + month + day + '_' + hour + minute + second + millisecond;

const CatCreate = () => {
    const status = useRecoilValue(userDataState);

    const choiceGender = [
        { value: 'オス', label: 'オス' },
        { value: 'メス', label: 'メス' },
    ];

    const navigate = useNavigate();

    const Input = styled('input')({
        display: 'none',
    });

    const [values, setValues] = useState({
        name: { value: '', headerName: '名前', isEmpty: false, errorText: '' },
        location: {
            value: '',
            headerName: '地方',
            isEmpty: false,
            errorText: '',
        },
        protected_date: {
            value: today,
            headerName: '保護日',
            isEmpty: false,
            errorText: '',
        },
        age_year: {
            value: 0,
            headerName: '年齢',
            isEmpty: false,
            errorText: '',
        },
        age_month: {
            value: 0,
            headerName: '年齢',
            isEmpty: false,
            errorText: '',
        },
        gender: {
            value: choiceGender[0].label,
            headerName: '性別',
            isEmpty: false,
            errorText: '',
        },
        pattern: { value: '', headerName: '柄' },
        color: { value: '', headerName: '色' },
        note: { value: '', headerName: '備考' },
        image: { value: null, previewImage: null },
    });
    console.log(values);

    const changeRequired = (e) => {
        const target = e.target;
        const data = target.value;
        const targetName = target.name;
        const dataIsEmpty = data === '';
        setValues({
            ...values,
            [targetName]: {
                ...values[targetName],
                value: data,
                isEmpty: dataIsEmpty,
            },
        });
        console.log(values.name);
        console.log(data);
        console.log(targetName);
    };

    function changeNoRequired(e) {
        const target = e.target;
        const data = target.value;
        const targetName = target.name;
        setValues({
            ...values,
            [targetName]: { ...values[targetName], value: data },
        });
    }

    function changeImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setValues({
                ...values,
                image: {
                    ...values.image,
                    value: file,
                    previewImage: reader.result,
                },
            });
        };
        reader.readAsDataURL(file);
    }
    console.log(values.image);

    Object.keys(values).forEach(function (key) {
        const value = values[key];
        if (value.isEmpty) {
            value.errorText = (
                <Typography variant="body2" sx={{ color: '#FF0000' }}>
                    {value.headerName}の入力は必須です
                </Typography>
            );
        } else {
            value.errorText = '';
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        registerData();
    };

    const registerData = () => {
        let form_data = new FormData();
        if (values.image.value) {
            let name = values.image.value.name;
            let extension = name.substr(name.indexOf('.'), name.length + 1);
            let fileName = now + extension;
            console.log('aaa');
            form_data.append('img', values.image.value, fileName);
        }

        form_data.append('status', '募集中');
        form_data.append('name', values.name.value);
        form_data.append('location', values.location.value);
        form_data.append('protected_date', values.protected_date.value);
        form_data.append('age_year', values.age_year.value);
        form_data.append('age_month', values.age_month.value);
        form_data.append('gender', values.gender.value);
        form_data.append('pattern', values.pattern.value);
        form_data.append('color', values.color.value);
        form_data.append('note', values.note.value);
        form_data.append('user', status.id);

        axios
            .post(`http://192.168.150.201:8000/api/cats/`, form_data, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            .then((res) => {
                navigate(`/Cats`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <ThemeProvider theme={Sign}>
            <Box
                sx={{ backgroundColor: 'primary.main' }}
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
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ pt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <label htmlFor="contained-button-file">
                                    <Input
                                        id="contained-button-file"
                                        accept="image/*"
                                        name="image"
                                        multiple
                                        type="file"
                                        onChange={changeImage}
                                    />
                                    <Button
                                        aria-label="upload picture"
                                        component="span"
                                        color="secondary"
                                    >
                                        画像をアップロード
                                        <PhotoCamera />
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item xs={12}>
                                <img
                                    src={values.image.previewImage}
                                    style={{ width: '60%' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="猫の名前"
                                    autoFocus
                                    onChange={changeRequired}
                                    value={values.name.value}
                                    helperText="決まっていない場合は仮称を記入してください"
                                />
                                {values.name.errorText}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="location"
                                    required
                                    fullWidth
                                    id="location"
                                    label="地方"
                                    value={values.location.value}
                                    onChange={changeRequired}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="date"
                                    required
                                    label="保護日"
                                    type="date"
                                    onChange={changeRequired}
                                    value={values.protected_date.value}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="age_year"
                                    required
                                    fullWidth
                                    id="age_year"
                                    label="年齢"
                                    InputProps={{
                                        type: 'number',
                                        min: 0,
                                        max: 12,
                                    }}
                                    onChange={changeRequired}
                                    value={values.age_year.value}
                                />
                                {values.age_year.errorText}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="age_month"
                                    required
                                    fullWidth
                                    id="age_month"
                                    label="月齢"
                                    InputProps={{
                                        type: 'number',
                                        min: 0,
                                        max: 12,
                                    }}
                                    onChange={changeRequired}
                                    value={values.age_month.value}
                                />
                                {values.age_month.errorText}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="gender"
                                    required
                                    id="gender"
                                    label="性別"
                                    select
                                    value={values.gender.value}
                                    onChange={changeRequired}
                                >
                                    {choiceGender.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="pattern"
                                    fullWidth
                                    id="pattern"
                                    label="柄"
                                    onChange={changeNoRequired}
                                    value={values.pattern.value}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="color"
                                    fullWidth
                                    id="color"
                                    label="色"
                                    onChange={changeNoRequired}
                                    value={values.color.value}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="note"
                                    fullWidth
                                    id="note"
                                    label="備考"
                                    multiline
                                    rows={4}
                                    onChange={changeNoRequired}
                                    value={values.note.value}
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    登録
                                </Button>
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default CatCreate;
