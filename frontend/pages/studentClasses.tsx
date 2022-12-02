import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import Link from 'next/link';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Row(id: number, className: string, subject: string, duration: number, frecuency: string, classType: string, description: string) {
  return ({ id: id, className: className, subject: subject, duration: duration, frecuency: frecuency, classType: classType, description: description })
}

export default function DataTable() {
  const router = useRouter()

  const [classes, setClasses] = useState([])

  useEffect(() => {getClasses()}, [])

    function goToClass(className, classSubject) {
        router.push({
            pathname: "/classDetails",
        query: {
            'className': className,
            'classSubject': classSubject
        }},
        "/classDetails")
    }

  async function deleteClass(id: number) {
    axios.put(`http://localhost:3001/enrollments/${id}`,
    {
        "studentId": localStorage.getItem("userId")
    },
    {
      headers: {
        'authorization': localStorage.getItem("token")
    }})
    .then(function (response) {
      console.log(response)
      window.alert("Clase dada de baja con éxito")
      getClasses()
    })
    .catch(function (error) {
      console.log(error)
      switch (error.response.status) {
        case 401:
            window.alert("Por favor, vuelva a iniciar sesión.")
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("fullName");
            localStorage.removeItem("userId");
            localStorage.removeItem("email");
            window.location.href = "/";
            break;
        default:
            window.alert("Ocurrió un error.")
            break;
    }})
  }

  async function getClasses() {
    axios.get(`http://localhost:3001/enrollments/${localStorage.getItem("userId")}`, {
      headers: {
        'authorization': localStorage.getItem("token"),
      }
    })
    .then(function (response) {
      console.log(response.data.class)
      let classes = []
      for (let i = 0; i < response.data.classes.length; i++) {
        let fetchedClass = response.data.classes[i]
        let convertedClass = Row(fetchedClass._id,
          fetchedClass.className,
          fetchedClass.subject,
          fetchedClass.duration,
          fetchedClass.frequency,
          fetchedClass.classState,
          fetchedClass.classType)
          classes.push(convertedClass)
      }
      setClasses(classes)
    }
    )
    .catch(function (error) {
      console.log(error)
      switch (error.response.status) {
        case 401:
          window.alert("Por favor, vuelva a iniciar sesión.")
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("fullName");
          localStorage.removeItem("userId");
          localStorage.removeItem("email");
          window.location.href = "/";
          break;
      }
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
      field: 'actions', headerName: 'Acciones', renderCell: (params) => {
        return (
          <div>
            <IconButton color="error" onClick={() => deleteClass(params.row.id)}><DeleteOutlineIcon /></IconButton>
            <IconButton color="primary" onClick={() => goToClass(params.row.className, params.row.subject)}><VisibilityIcon /></IconButton>
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
