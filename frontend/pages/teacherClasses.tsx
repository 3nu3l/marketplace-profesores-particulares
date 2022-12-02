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
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import Switch from '@mui/material/Switch';

function Row(id: number, className: string, subject: string, duration: number, frecuency: string, classState: boolean, classType: string, ownerId: number, description: string) {
  return ({ id: id, className: className, subject: subject, duration: duration, frecuency: frecuency, classState: classState, classType: classType, ownerId: ownerId, description: description })
}

export default function DataTable() {
  const router = useRouter()

  const [classes, setClasses] = useState([])

  useEffect(() => {getClasses()}, [])
  
  function goToModify(id: number, status: string) {
    router.push(
      {
          pathname: '/modifyClass',
          query: {
              id: id,
              ownerId:  localStorage.getItem("userId"),
              currentStatus: status
          },
      },
      '/modifyClass'
  )
  }

  async function deleteClass(id: number) {
    axios.delete(`http://localhost:3001/deleteClass/${id}`,
    {
      headers: {
        'Content-Type': 'application/json', 
        'accept': 'application/json',
        'authorization': localStorage.getItem("token")
    }})
    .then(function (response) {
      console.log(response)
      window.alert("Clase eliminada con éxito")
      getClasses()
    })
    .catch(function (error) {
      console.log(error)
      window.alert("Ocurrió un error.")
    })
  }

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
          fetchedClass.classState,
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
      switch (error.response.status) {
        case 401:
          window.alert("Su sesión ha expirado. Por favor, vuelva a ingresar al sistema.")
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("fullName");
          localStorage.removeItem("userId");
          localStorage.removeItem("email");
          window.location.href = "/signIn";
          break;
      }
    })
  }

  async function handlePublishChange(id: number, currentStatus) {
    let newStatus = (currentStatus === "Despublicada" ? "Publicada" : "Despublicada")
    axios.put(`http://localhost:3001/classId/${id}`, {
      classState: newStatus,
  },
  { headers: {
      'authorization': localStorage.getItem("token")
  }})
  .then(function (response) {
      console.log(response)
      getClasses()
  })
  .catch(function (error) {
    console.log(error)
    window.alert("Ocurrió un error.")
  })
  }

  function goToComments(classId) {
    router.push(
      { 
        pathname: "/pendingComments",
    query: {
      classId: classId
    }},
    "/pendingComments")
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
      field: 'classState', headerName: 'Publicada', width: 100, renderCell: (params) => {
        return (<Switch checked={params.row.classState === "Publicada" ? true : false} onChange={() => handlePublishChange(params.row.id, params.row.classState)}></Switch>)
      }
    },
    {
      field: 'actions', headerName: 'Acciones', renderCell: (params) => {
        return (
          <div>
            <IconButton color="error" onClick={() => deleteClass(params.row.id)}><DeleteOutlineIcon /></IconButton>
            <Link color="inherit" href="/modifyClass"><IconButton color="secondary" onClick={() => goToModify(params.row.id, params.row.classState)}><EditOutlinedIcon /></IconButton></Link>
          </div>);
      }
    },
    {
      field: 'comments', headerName: 'Ver comentarios', renderCell: (params) => {
        return(
        <div>
        <IconButton onClick={() => goToComments(params.row.id)}><CommentIcon color='primary'/></IconButton>
        </div>)
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
