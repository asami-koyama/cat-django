import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../function/Atom';

const columns = [
  { field: 'name', headerName: '名前', width: 130 },
  { field: 'status', headerName: 'ステータス', width: 130 },
  { field: 'location', headerName: '地方', width: 130 },
  { field: 'protected_date', headerName: '保護日', type: 'date', width: 130 },
  { field: 'age_year', headerName: '年齢(年)', type: 'number', width: 90 },
  { field: 'age_month', headerName: '年齢(月)', type: 'number', width: 90 },
  { field: 'gender', headerName: '性別', width: 130 },
  { field: 'pattern', headerName: '柄', width: 130 },
  { field: 'color', headerName: '色', width: 130 },
  { field: 'note', headerName: '備考', width: 800 },
];

function CatsTableRegistered() {
  const status = useRecoilValue(userDataState);
  const navigate = useNavigate();
  function handleClick(id) {
    navigate(`/catDetail/${id}`);
  }

  const [cats, setCats] = useState([]);
  useEffect(() => {
    if (status.id != null) {
      axios
        .get('http://192.168.150.201:8000/api/cats/?user=' + status.id)
        .then((res) => {
          setCats(res.data);
        });
    }
  }, [status]);
  const rows = cats;

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
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        autoHeight
        disableSelectionOnClick={true}
        onRowClick={(
          rowData // ★ 行クリック時の処理
        ) => {
          handleClick(rowData.id);
        }}
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
      />
    </div>
  );
}

export default CatsTableRegistered;
