import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import SimpleClassComments from '../src/components/simpleClassComments'
import List from '@mui/material/List'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function ClassDetails() {
    const [value, setValue] = useState<number | null>(2);

    const[classId, setClassId] = useState(0)

    const [name, setName] = useState("")
    const [subject, setSubject] = useState("")
    const [price, setPrice] = useState(0)
    const [rating, setRating] = useState(0)
    const [frequency, setFrequency] = useState("")
    const [duration, setDuration] = useState(0)
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")

    const [comments, setComments] = useState([])

    const [commentText, setCommentText] = useState("")

    const router = useRouter()
    const data = router.query

    const approvedComments = comments.filter(comment => comment.commentState === "Aprobado").map((comment) =>
    <div><SimpleClassComments text={comment.content} publisher={comment.studentName}></SimpleClassComments><br /></div>
    )
    
    useEffect(() => {getClassDetails()}, [])

    function goToHire() {
        console.log(classId)
        if (localStorage.getItem("role") === "student") {
            router.push({
                pathname: "/classBuy",
                query: {
                    classId: classId
                }},
                "/classBuy")
        } else {
            window.alert("No tiene los permisos necesarios para realizar esta acción. Inicie sesión con una cuenta de estudiante.")
        }
    }

    async function getClassDetails() {
        axios.get(`http://localhost:3001/class/${data.className}/${data.classSubject}`,{
            headers: {
                'authorization': localStorage.getItem("token")
            },
        })
        .then(function (response) {
            console.log(response.data)
            const classDetails = response.data.class[0]
            setClassId(classDetails._id)
            setName(classDetails.className)
            setSubject(classDetails.subject)
            setPrice(classDetails.cost)
            setRating(classDetails.rating)
            setFrequency(classDetails.frequency)
            setDuration(classDetails.duration)
            setType(classDetails.classType)
            setDescription(classDetails.description)
            setComments(classDetails.comments)
        })
        .catch(function (error) {
            console.log(error.response)
        })
    }

    async function handleCommentSend() {
        if (localStorage.getItem("role") === "student") {
            axios.put(`http://localhost:3001/comments/addComment/${classId}`, {
                "content": commentText,
                "studentName": localStorage.getItem("fullName"),
                "studentEmail": localStorage.getItem("email"),
                "commentState": "Pendiente"
            },
            {
                headers: {
                    'authorization': localStorage.getItem("token")
                }
            })
            .then(function (response) {
                console.log(response.data)
                setCommentText("")
                window.alert("Su comentario está pendiente de aprobación")
            })
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
                    default:
                        window.alert("Error desconocido, póngase en contacto con el administrador")
                        break;
                }
            })
        } else {
            window.alert("No tiene los permisos necesarios para realizar esta acción. Inicie sesión con una cuenta de estudiante.")
        }
    }
    
    return(
        <Container
        component = "main"
        style={{ alignItems: "center", justifyContent: "center" }}
        >
            <CssBaseline />
            <Typography gutterBottom variant="h2" component="div">
                {name}
            </Typography>
            <Paper
            sx={{
                p: 2,
                flexGrow: 1,
                backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
            >
                <Grid container spacing={{xs: 2, md: 0}} direction={{xs: "column", md: "row"}}>
                    <Grid item xs={9}>
                        <Typography variant="h4" gutterBottom>
                            Clase de {subject}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {duration} horas | {frequency}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Rating name="read-only" value={rating} readOnly />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="h5" component="div" style={{textAlign: "left"}} color="green">
                        $ {price}/h
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="body1" component="div" style={{textAlign: "left"}}>
                        Modalidad: {type}
                    </Typography>
                    </Grid>
                    <br /><br />
                    <Grid item xs={12}>
                    <Typography variant="body1" component="div" style={{textAlign: "left"}}>
                        {description}
                    </Typography>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <Button variant='contained' style={{marginLeft: "auto"}} onClick={goToHire}>Contratar esta clase</Button>
            <br /><br />
            <Typography variant="h5">
                Calificá esta clase:
            </Typography>
            <Rating
            name="controlled-rating"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            />
            <br /><br />
            <Typography variant="h5">
                Dejá tu comentario:
            </Typography>
            <TextField id="class-comment" label="Comentario..." variant="standard" value={commentText} style={{width: 600, maxWidth: 1000, flexGrow: 1}} onChange={(event) => setCommentText(event.target.value)}/><br /><br />
            <Link href="#"><a onClick={handleCommentSend}><Button variant='outlined' style={{marginLeft: "auto"}}>Enviar</Button></a></Link>
            <br /><br />
            <Typography variant="h5">
                Comentarios de alumnos:
            </Typography>
            <br /><br />
            <Grid item xs={9}>
                    <List disablePadding style={{paddingTop:0, marginTop:-7}}>
                        {approvedComments}
                    </List>
                </Grid>
                <br></br><br></br>
        </Container>
    );
}