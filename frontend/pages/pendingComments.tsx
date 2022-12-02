import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/dist/client/router';
import axios from "axios";
import { Container } from "@mui/system";
import { CssBaseline } from "@mui/material";
import List from '@mui/material/List'
import { Button } from '@mui/material';
import SimpleClass from "../src/components/simpleClassComments";

export default function PendingComments() {
    const router = useRouter()
    const data = router.query

    const name = data.className
    const subject = data.classSubject

    const [noResults, setNoResults] = useState(false)

    const [comments, setComments] = useState([])

    useEffect(() => {getComments()}, [])

    const pendingComments = comments.filter(comment => comment.commentState === "Pendiente").map((comment) =>
    <div><SimpleClass text={comment.content} publisher={comment.studentName}></SimpleClass>
    <Button variant="contained" color="success" onClick={() => changeCommentState(comment.studentName, false)}>Aprobar</Button> <span/> <span/>
    <Button variant="outlined" color="error" onClick={() => changeCommentState(comment.studentName, true)}>Eliminar</Button>
    <br /><br /></div>
    )

    async function getComments() {
        axios.get(`http://localhost:3001/comments/${name}/${subject}`,
        {
            headers: {
                'authorization': localStorage.getItem("token")
            }
        })
        .then(function (response){
            console.log(response.data)
            setComments(response.data.class[0].comments)
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

    async function changeCommentState(studentName: string, shouldDelete: boolean) {
        const newState = (shouldDelete ? "Rechazado" : "Aprobado")
        console.log(name)
        console.log(subject)
        axios.put(`http://localhost:3001/comments/${name}/${subject}`, {
            "studentName": studentName,
            "commentState": newState
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