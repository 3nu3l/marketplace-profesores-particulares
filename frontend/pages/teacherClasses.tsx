import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import Link from 'next/link';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CustomSwitch from '../src/components/customSwitch';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const rows = [
  Row(1, 'Introducción a trigonometría', 'Matemática', 35, 'Semanal', true),
  Row(2, 'MRU, MRUV, Tiro vertical', 'Física', 42, 'Única', true),
  Row(3, 'Entendiendio el Martín Fierro', 'Lengua y Literatura', 45, 'Única', false),
  Row(4, 'Uniones covalentes', 'Química', 16, 'Semanal', true),
  Row(5, 'Redes y Telecomunicaciones 1', 'Sistemas de Comuncaciones', 24, 'Semanal', false),
  Row(6, 'Introducción a trigonometría', 'Matemática', 150, 'Semanal', false),
  Row(7, 'MRU, MRUV, Tiro vertical', 'Física', 44, 'Única', true),
  Row(8, 'Entendiendio el Martín Fierro', 'Lengua y Literatura', 36, 'Semanal', true),
  Row(9, 'Uniones covalentes', 'Química', 65, 'Semanal', true),
];

function Row(id: number, className: string, subject: string, duration: number, frecuency: string, status: boolean, classType: string, ownerId: number, description: string) {
  return ({ id: id, className: className, subject: subject, duration: duration, frecuency: frecuency, status: status, classType: classType, ownerId: ownerId, description: description })
}

export default function DataTable() {
  const [classes, setClasses] = useState([])

  useEffect(() => {getClasses()}, []) 

  async function getClasses() {
    axios.get(`http://localhost:3001/classOwner/${localStorage.getItem("userId")}`, {
      headers: {
        'authorization': localStorage.getItem("token"),
        'ownerId': localStorage.getItem("userId")
      }
    })
    .then(function (response) {
      console.log(response.data.class)
      let classes = []
      for (let i = 0; i < response.data.class.length; i++) {
        let fetchedClass = response.data.class[i]
        let convertedClass = Row(fetchedClass._id,
          fetchedClass.className,
          fetchedClass.subject,
          fetchedClass.duration,
          fetchedClass.frequency,
          fetchedClass.status,
          fetchedClass.classType,
          fetchedClass.ownerId,
          fetchedClass.description)
          classes.push(convertedClass)
      }
      setClasses(classes)
    }
    )
    .catch(function (error) {
      console.log(error)
    })
  }
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'className', headerName: 'Nombre de la clase', width: 300 },
    { field: 'subject', headerName: 'Materia', width: 200 },
    {
      field: 'duration',
      headerName: 'Duración',
      type: 'number',
      width: 90,
      align: 'left'
    },
    {
      field: 'frecuency',
      headerName: 'Frecuencia',
      sortable: false,
      width: 160
    },
    {
      field: 'status', headerName: 'Publicada', width: 100, renderCell: () => {
        return (<CustomSwitch></CustomSwitch>)
      }
    },
    {
      field: 'actions', headerName: 'Acciones', renderCell: () => {
        return (
          <div>
            <IconButton color="error"><DeleteOutlineIcon /></IconButton>
            <Link color="inherit" href="/modifyClass"><IconButton color="secondary"><EditOutlinedIcon /></IconButton></Link>
          </div>);
      }
    }
  ]

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
            rows={classes}
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
