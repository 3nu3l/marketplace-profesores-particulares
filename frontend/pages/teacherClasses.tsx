import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import Switch from '@mui/material/Switch';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'className', headerName: 'Nombre de la clase', width: 150 },
  { field: 'matter', headerName: 'Materia', width: 90 },
  {
    field: 'duration',
    headerName: 'Duración',
    type: 'number',
    width: 90,
  },
  {
    field: 'frecuency',
    headerName: 'Frecuencia',
    //description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    //valueGetter: (params: GridValueGetterParams) =>
      //`${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'status', headerName: 'Publicado', width: 100},
];

const rows = [
  { id: 1, className: 'Snow', matter: 'Jon', duration: 35, frecuency: 'Semanal', status: <Switch /> },
  { id: 2, className: 'Lannister', matter: 'Cersei', duration: 42 , frecuency: 'diaria', status: 'Publicada' },
  { id: 3, className: 'Lannister', matter: 'Jaime', duration: 45, frecuency: 'diaria', status: 'Sin publicar'  },
  { id: 4, className: 'Stark', matter: 'Arya', duration: 16 , frecuency: 'Semanal', status: 'Publicada' },
  { id: 5, className: 'Targaryen', matter: 'Daenerys', duration: null , frecuency: 'Semanal', status: 'Sin publicar' },
  { id: 6, className: 'Melisandre', matter: null, duration: 150 , frecuency: 'Semanal', status: 'Sin publicar' },
  { id: 7, className: 'Clifford', matter: 'Ferrara', duration: 44 , frecuency: 'diaria', status: 'Publicada' },
  { id: 8, className: 'Frances', matter: 'Rossini', duration: 36 , frecuency: 'Semanal', status: 'Publicada' },
  { id: 9, className: 'Roxie', matter: 'Harvey', duration: 65 , frecuency: 'Semanal', status: 'Publicada' },
];

export default function DataTable() {
  return (
    <Container component="main" maxWidth="lg">
        <CssBaseline />
            <Box 
                sx={{
                    //marginTop: 0,
                    marginBottom: 20,
                    paddingBottom:30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div style={{ height: 371, width: '100%'}}>
                    <h1>Mis clases</h1>
                    <Button variant="outlined">Crear</Button>
                    <h1></h1>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
                <Button variant="outlined" color="error" startIcon={<DeleteIcon/>}>Eliminar</Button>
                <Button variant="outlined" color="secondary" startIcon={<EditIcon/>}>Modificar</Button>
                <Button variant="outlined" startIcon={<DownloadIcon/>}> Despublicar</Button>
                <Button variant="outlined" color="success" startIcon={<PublishIcon/>}>Publicar</Button>
                </div>
            </Box>
    </Container>
  );
}
