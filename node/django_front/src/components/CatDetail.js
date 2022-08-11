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
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

function CatDetail() {
  const navigate = useNavigate();
  // paramsで猫のidを受け取る
  const { id } = useParams();

  // グローバル変数から操作ユーザのデータを取得
  const status = useRecoilValue(userDataState);

  // モーダルのスタイル定義
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #675642',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  };

  // モーダルの内容を定義するstateの作成
  const [modal, setModal] = useState();

  // モーダルの開閉制御
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  // 削除のモーダル
  const handleOpenDelete = () => {
    setModal(
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          削除してよろしいですか？
        </Typography>
        <Button
          onClick={catDelete}
          variant="outlined"
          fullWidth
          color="button"
          sx={{ mt: 2 }}
        >
          削除
        </Button>
      </Box>
    );
    setOpen(true);
  };

  // 申請エラーメッセージ格納用state
  const [requestErrorText, setRequestErrorText] = useState('');

  // 申請のモーダル
  const handleOpenRequest = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = data.get('message');
    console.log(message);
    if (message == '') {
      setRequestErrorText('内容を入力してください');
      console.log('aaaaa');
    } else {
      setModal(
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            以下の内容で申し込みを行いますか？
          </Typography>
          <Button
            onClick={() => requestSubmit(message)}
            variant="outlined"
            fullWidth
            color="button"
            sx={{ mt: 2 }}
          >
            申請
          </Button>
        </Box>
      );
      setOpen(true);
    }
  };

  // 猫のデータをDBから取得
  const [cat, setCat] = useState([]);
  useEffect(() => {
    axios.get('http://192.168.150.201:8000/api/cat/' + id).then((res) => {
      setCat(res.data);
    });
  }, []);
  const row = cat;

  // 画像以外のデータを定数に格納する
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

  console.log(status.id + ':' + cat.user);

  // 権限により異なるボタンが表示される
  const [menus, setMenus] = useState();
  useEffect(() => {
    if (status.user_type == 'Supporter' && status.id == cat.user) {
      console.log('Supporter');
      setMenus(
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item xs={3}>
            <Button variant="outlined" fullWidth color="button" onClick={edit}>
              編集
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={handleOpenDelete}
              variant="outlined"
              fullWidth
              color="button"
            >
              削除
            </Button>
          </Grid>
        </Grid>
      );
    } else if (status.user_type == 'Adopter') {
      // 申請のデータをDBから取得
      axios
        .get(
          'http://192.168.150.201:8000/api/offers/?adopter=' +
            status.id +
            '&cat=' +
            id
        )
        .then((res) => {
          if (res.data.length == 0) {
            setMenus(
              <Box component="form" noValidate onSubmit={handleOpenRequest}>
                <TextField
                  name="message"
                  fullWidth
                  id="message"
                  label="申請メッセージ"
                  multiline
                  rows={4}
                  sx={{ mt: 2 }}
                />

                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  color="button"
                  sx={{ mt: 2 }}
                >
                  申請
                </Button>
              </Box>
            );
          } else {
            setMenus(
              <Container>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  align="center"
                  color="secondary"
                >
                  申請済みです
                </Typography>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  color="button"
                  sx={{ mt: 2 }}
                  onClick={() => handleOpenDrop(res.data)}
                >
                  申請取り下げ
                </Button>
              </Container>
            );
          }
        });
    }
  }, [status.user_type, cat.user]);

  // 削除処理
  const catDelete = () => {
    axios
      .delete('http://192.168.150.201:8000/api/catsRUD/' + id + '/')
      .then((res) => {
        console.log(res.data);
        navigate(`/Cats`);
      });
  };

  // 編集処理（編集画面に移動）
  const edit = () => {
    console.log('edit');
    navigate(`/CatEdit/${id}`, { state: row });
  };

  // 申請処理
  const requestSubmit = (message) => {
    console.log('申請');
    axios
      .post('http://192.168.150.201:8000/api/offers/', {
        cat_id: id,
        adopter_id: status.id,
        supporter_id: row.user,
      })
      .then(
        axios
          .post('http://192.168.150.201:8000/api/chats/', {
            adopter_id: status.id,
            supporter_id: row.user,
            cat_id: id,
            messeage: message,
            is_readed: false,
            sender: status.id,
          })
          .then(
            setMenus(
              <Container>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  align="center"
                  color="secondary"
                >
                  申請を受け付けました
                </Typography>
              </Container>
            ),
            setOpen(false),
            setRequestErrorText('')
          )
          .catch((error) => {
            setMenus(
              <Container>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  align="center"
                  color="#FF0000"
                >
                  送信に失敗しました
                </Typography>
              </Container>
            );
            console.log(error);
          })
      )
      .catch((error) => {
        setMenus(
          <Container>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
              color="#FF0000"
            >
              送信に失敗しました
            </Typography>
          </Container>
        );
        console.log(error);
      });
  };

  // 申請取り下げ処理
  const handleOpenDrop = (offer) => {
    console.log(offer);
    console.log(offer[0].id);
    setModal(
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          この猫への里親申請を取り下げますか？
        </Typography>
        <Button
          onClick={() => dropSubmit(offer[0].id)}
          variant="outlined"
          fullWidth
          color="button"
          sx={{ mt: 2 }}
        >
          取り下げ
        </Button>
      </Box>
    );
    setOpen(true);
  };

  // 申請取り消し処理
  const dropSubmit = (offerId) => {
    console.log(offerId);
    axios
      .delete('http://192.168.150.201:8000/api/offersRUD/' + offerId)
      .then(function (response) {
        // handle success
        console.log(response);
        setOpen(false);
        navigate(`/Cats`);
      });
  };

  return (
    <ThemeProvider theme={Detail}>
      {/* モーダル */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modal}
      </Modal>

      {/* 本文 */}
      <Box
        sx={{ backgroundColor: 'primary.contrastText' }}
        className="min-height-fulldisplay"
      >
        <Container
          component="main"
          maxWidth="sm"
          alignitems="center"
          justify="center"
          sx={{ backgroundColor: '#FFFFFF', pb: '1vh' }}
          className="min-height-fulldisplay-minus1"
        >
          <Grid container justify="center">
            <Grid item xs={12} sx={{ mt: 2, mx: 4 }} align="center">
              {cat.img && (
                <Card sx={{ maxWidth: 350, mb: 2 }}>
                  <CardMedia component="img" alt="cat" image={cat.img} />
                </Card>
              )}
            </Grid>

            <Grid item xs={12} sx={{ pb: 2 }}>
              <hr></hr>
            </Grid>

            <Grid container justify="center" spacing={2}>
              {Items.map((item) => {
                return (
                  <Grid item xs={12}>
                    <Grid container justify="center">
                      <Grid item xs={2}></Grid>
                      <Grid item xs={4}>
                        <Typography variant="p" color="secondary">
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
                    <Typography variant="p" color="secondary">
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

              <Grid item xs={12}>
                {requestErrorText && (
                  <Typography variant="body1" sx={{ color: '#FF0000' }}>
                    {requestErrorText}
                  </Typography>
                )}
                {menus}
              </Grid>
              <Grid item xs={12} sx={{ height: '5vh' }}></Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default CatDetail;
