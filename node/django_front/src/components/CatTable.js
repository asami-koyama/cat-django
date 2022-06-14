import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: '名前', width: 130 },
  { field: 'status', headerName: 'ステータス', width: 130 },
  { field: 'location', headerName: '地方', width: 130 },
  { field: 'protected_date', headerName: '保護日', type: 'date', width: 130 },
  { field: 'age', headerName: '年齢', type: 'number', width: 90, },
  { field: 'gender', headerName: '性別', width: 130 },
  { field: 'pattern', headerName: '柄', width: 130 },
  { field: 'color', headerName: '色', width: 130 },
  { field: 'note', headerName: '備考', width: 800 },
];



function Usetable(){
  
  const navigate = useNavigate();
  function handleClick(id) {
    navigate(`/CatDetail/${id}`);
  }

  const [cats, setCats] = useState([])
  useEffect(() => {
      axios.get('http://18.221.251.5:8000/api/cats')
      .then(res => {
          setCats(res.data)
      })
  }, [])
  const rows = cats;

  return (
    <div style={{width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        autoHeight
        disableSelectionOnClick={true}
        onRowClick={(rowData) => // ★ 行クリック時の処理
        {
          handleClick(rowData.id)
        }}
      />
    </div>
  );
}

export default Usetable