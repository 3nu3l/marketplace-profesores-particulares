import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';


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
  { field: 'status', headerName: 'Estado', width: 100}, 
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  return (
    <Container component="main" maxWidth="lg">
        <CssBaseline />
            <Box
                sx={{
                    marginTop: 2,
                    marginBottom: 2,
                    paddingBottom:30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div style={{ height: 371, width: '100%'}}>
                    <h1>Mis clases</h1>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
                </div>
            </Box>
    </Container>
  );
}
