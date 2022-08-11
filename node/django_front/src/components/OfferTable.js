import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Detail } from '../function/theme';
import { DataGrid, selectedGridRowsSelector } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../function/Atom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const OfferTable = () => {
  const status = useRecoilValue(userDataState);
  const navigate = useNavigate();
  const [rows, setRows] = useState();

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

  // 承諾のモーダル
  const handleOpenApproval = (offer) => {
    setModal(
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {offer.catname} を {offer.adoptername} さんに譲りますか？
        </Typography>
        <Button
          onClick={() => catApproval(offer)}
          variant="outlined"
          fullWidth
          color="button"
          sx={{ mt: 2 }}
        >
          承諾
        </Button>
      </Box>
    );
    setOpen(true);
  };

  const catApproval = (offer) => {
    setOpen(false);
    axios
      .patch('http://192.168.150.201:8000/api/catsRUD/' + offer.catid + '/', {
        status: 'お家決定',
      })
      .then(
        setModal(
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
              color="secondary"
            >
              {offer.adoptername} さんの申請を受け入れました
            </Typography>
          </Box>
        ),
        setOpen(true)
      )
      .catch((error) => {
        setModal(
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
              color="#FF0000"
            >
              送信に失敗しました
            </Typography>
          </Box>
        );
        setOpen(true);
      });
  };

  const columns = [
    {
      field: '',
      renderCell: (cellValues) => {
        return (
          <ThemeProvider theme={Detail}>
            <Button
              color="button"
              variant="outlined"
              onClick={(event) => {
                console.log(cellValues.row);
                handleOpenApproval(cellValues.row);
              }}
            >
              承諾
            </Button>
          </ThemeProvider>
        );
      },
    },
    { field: 'offerdate', headerName: '申請日', type: 'date', width: 150 },
    { field: 'adoptername', headerName: '申請者', width: 150 },
    { field: 'catname', headerName: '猫名', width: 150 },
    {
      field: 'status',
      headerName: 'ステータス',
      width: 150,
    },
    { field: 'gender', headerName: '性別', width: 150 },
    {
      field: 'catdate',
      headerName: '登録日',
      type: 'date',
      width: 150,
    },
  ];

  useEffect(() => {
    if (status.id != null) {
      axios
        .get('http://192.168.150.201:8000/api/offers/?supporter=' + status.id)
        .then((res) => {
          const offers = res.data;
          console.log(offers);
          let offerlist = [];
          offers.map((offer) => {
            offerlist.push({
              id: offer.id,
              catid: offer.cat.id,
              offerdate: offer.created_at,
              adoptername: offer.adopter.username,
              catname: offer.cat.name,
              status: offer.cat.status,
              gender: offer.cat.gender,
              catdate: offer.cat.created_at,
            });
          });
          setRows(offerlist);
        });
    }
  }, [status]);
  console.log(rows);

  const theme = useTheme();
  const [filterModel, setFilterModel] = React.useState({
    items: [
      {
        columnField: 'status',
        operatorValue: 'contains',
        value: '募集中',
      },
    ],
  });

  return (
    <ThemeProvider theme={Detail}>
      <div style={{ width: '100%' }}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {modal}
        </Modal>
        {rows && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            autoHeight
            disableSelectionOnClick={true}
            filterModel={filterModel}
            onFilterModelChange={(newFilterModel) =>
              setFilterModel(newFilterModel)
            }
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default OfferTable;
