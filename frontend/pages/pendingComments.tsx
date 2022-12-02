import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/dist/client/router';
import axios from "axios";
import { Container } from "@mui/system";
import { CssBaseline } from "@mui/material";
import List from '@mui/material/List'
import { Button } from '@mui/material';
import SimpleClassComments from "../src/components/simpleClassComments";

export default function PendingComments() {
    const router = useRouter()
    const data = router.query

    const classId = data.classId

    const [noResults, setNoResults] = useState(false)

    const [comments, setComments] = useState([])

    useEffect(() => {getComments()}, [])

    const pendingComments = comments.filter(comment => comment.commentState === "Pendiente").map((comment) =>
    <div><SimpleClassComments text={comment.content} publisher={comment.studentName}></SimpleClassComments>
    <Button variant="contained" color="success" onClick={() => approveComment(comment.studentName)}>Aprobar</Button> <span/> <span/>
    <Button variant="outlined" color="error" onClick={() => deleteComment(comment.studentName, comment.studentEmai)}>Eliminar</Button>
    <br /><br /></div>
    )

    async function getComments() {
        console.log("=======================")
        console.log(classId)
        axios.get(`http://localhost:3001/comments/${classId}`,
        {
            headers: {
                'authorization': localStorage.getItem("token")
            }
        })
        .then(function (response){
            console.log(response.data)
            setComments(response.data.class.comments)
        })
        .catch(function (error) {
            console.log(error.response)
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
            case 404:
                setNoResults(true)
                break;
            default:
                window.alert("Ha ocurriddo un error")
                break;
            }
        })
    }

    async function deleteComment(studentName: string, studentEmail: string) {
        let descriptionState = prompt("¿Por qué razón debería ser rechazado este comentario? Se le comunicará al estudiante por email.")
        axios.put(`http://localhost:3001/comments/changeState/${classId}`, {
            "studentName": studentName,
            "commentState": "Aprobado",
            "studentEmail": studentEmail,
            "descriptionState": descriptionState
        }, {
            headers: {
                'authorization': localStorage.getItem("token")
            }
        })
        .then(function (response) {
            console.log(response)
            getComments()
        })
        .catch(function (error) {
            console.log(error.response)
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
                window.alert("Ha ocurriddo un error")
                break;
            }
        })
    }

    async function approveComment(studentName: string) {
        axios.put(`http://localhost:3001/comments/changeState/${classId}`, {
            "studentName": studentName,
            "commentState": "Aprobado"
        }, {
            headers: {
                'authorization': localStorage.getItem("token")
            }
        })
        .then(function (response) {
            console.log(response)
            getComments()
        })
        .catch(function (error) {
            console.log(error.response)
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
                window.alert("Ha ocurriddo un error")
                break;
            }
        })
    }

    if (noResults) {
        return(
        <Container component="main">
            <CssBaseline />
            <h1>No hay comentarios pendientes de aprobación</h1>
        </Container>)
    } else {
        return(
            <Container component="main">
                <CssBaseline />
                <h1>Comentarios pendientes de aprobación:</h1>
                <List disablePadding style={{paddingTop:0, marginTop:-7}}>
                {pendingComments}
                </List>
            </Container>
        )
    }
}