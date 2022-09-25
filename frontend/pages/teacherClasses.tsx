import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch';
import Link from 'next/link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'className', headerName: 'Nombre de la clase', width: 150 },
  { field: 'matter', headerName: 'Materia', width: 90 },
  {
    field: 'duration',
    headerName: 'Duración',
    type: 'number',
    width: 90
  },
  {
    field: 'frecuency',
    headerName: 'Frecuencia',
    sortable: false,
    width: 160
  },
  { field: 'status', headerName: 'Publicada', width: 100, renderCell: () => { return (<Switch />)}},
  { field: 'actions', headerName: 'Acciones', renderCell: () => {return (
    <div>
      <IconButton color="error"><DeleteIcon/></IconButton>
      <IconButton color="secondary"><EditIcon/></IconButton>
    </div>)}}
];

const rows = [
  Row(1, 'Snow', 'Jon', 35, 'Semanal', true),
  Row(2, 'Lannister', 'Cersei', 42, 'diaria', true),
  Row(3, 'Lannister', 'Jaime', 45, 'diaria', false),
  Row(4, 'Stark', 'Arya', 16, 'Semanal', true),
  Row(5, 'Targaryen', 'Daenerys', null, 'Semanal', false),
  Row(6, 'Melisandre', null, 150, 'Semanal', false),
  Row(7, 'Clifford', 'Ferrara', 44, 'diaria', true),
  Row(8, 'Frances', 'Rossini', 36, 'Semanal', true),
  Row(9, 'Roxie', 'Harvey', 65, 'Semanal', true),
];

function Row(id: number, className: string, matter: string, duration: number, frecuency: string, status: boolean) {
  return({ id: id, className: className, matter: matter, duration: duration, frecuency: frecuency, status: status })
}

export default function DataTable() {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          marginBottom: 20,
          paddingBottom: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%' }}>
          <h1>Mis clases</h1>
          <Link color="inherit" href="/registrationClass"><Button variant="outlined">Crear</Button></Link>
          <h1></h1>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick={true}
            disableColumnSelector={true}
            hideFooterSelectedRowCount={true}
            autoHeight={true}
          />
        </div>
      </Box>
    </Container>
  );
}
