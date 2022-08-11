import React, { useState } from 'react';
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
// import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

function CatDetail() {
  //  const navigate = useNavigate();
  // paramsで猫のidを受け取る
  const { id } = useParams();

  // グローバル変数から操作ユーザのデータを取得
  const status = useRecoilValue(userDataState);

  // CatDetailから猫の情報を受け取る
  const location = useLocation();
  const row = location.state;

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

  // 申請処理
  const requestSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = data.get('message');
    if (message == '') {
      setRequestErrorText('内容を入力してください');
    } else {
      axios
        .post('http://192.168.150.201:8000/api/offers/', {
          cat: id,
          adopter: status.id,
          supporter: row.user,
        })
        .then(
          axios
            .post('http://192.168.150.201:8000/api/chats/', {
              sender: status.id,
              receiver: row.user,
              messeage: message,
              is_readed: false,
            })
            .then(
              setModal(
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  申請を受け付けました。保護主からの返信をお待ちください。
                </Typography>
              )
            )
            .catch((error) => {
              setRequestErrorText('送信に失敗しました');
              console.log(error);
            })
        )
        .catch((error) => {
          setRequestErrorText('送信に失敗しました');
          console.log(error);
        });
    }
  };

  // 申請エラーメッセージ格納用state
  const [requestErrorText, setRequestErrorText] = useState('');

  // 申請のモーダル
  const handleOpenRequest = (event) => {
    setModal(
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          以下の内容で申し込みを行いますか？
        </Typography>
        <Button
          onClick={requestSubmit(event)}
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
  const handleClose = () => setOpen(false);

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
              {row.img && (
                <Card sx={{ maxWidth: 350, mb: 2 }}>
                  <CardMedia component="img" alt="cat" image={row.img} />
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
