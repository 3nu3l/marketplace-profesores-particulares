import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function ClassBuy() {
    const router = useRouter()
    const data = router.query

    const [classId, setClassId] = useState(0)

    const phoneRegex = /^[0-9,+]*$/
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [errorphoneNumber, setErrorPhoneNumber] = React.useState(false);

    const [schedule, setSchedule] = React.useState("");
    const [errorSchedule, setErrorSchedule] = React.useState(false);

    const [message, setMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let hasError: boolean = false;
        const data = new FormData(event.currentTarget);

        if (phoneNumber.trim().length === 0 || !phoneNumber.match(phoneRegex)) {
            hasError = true;
            setErrorPhoneNumber(true);
        } else {
            hasError = false;
            setErrorPhoneNumber(false);
        }
        if (schedule.trim().length === 0) {
            hasError = true;
            setErrorSchedule(true);
        } else {
            hasError = false;
            setErrorSchedule(false);
        }
        if (message.trim().length === 0) {
            hasError = true;
            setErrorMessage(true);
        } else {
            hasError = false;
            setErrorMessage(false);
        }
            if (!hasError) {
                buyClass()
            }
    };


    async function buyClass() {
        if (localStorage.getItem("role") === "student") {
            setClassId(data.classId)
            axios.put(`http://localhost:3001/enrollments/${classId}`,
            {
                "studentId": localStorage.getItem("userId")
            },
            {
            headers: {
                'authorization': localStorage.getItem("token")
            }})
            .then(function (response) {
            console.log(response)
            window.alert("Clase contrtada con éxito")
            window.location.href = "/studentClasses"
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
        } else {
            window.alert("No tiene los permisos necesarios para realizar esta acción. Inicie sesión con una cuenta de estudiante.")
        }
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            marginBottom: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
            Contratar clase
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Teléfono de contacto"
                name="phoneNumber"
                autoComplete="phone"
                error={errorphoneNumber}
                helperText={errorphoneNumber ?
                <>El formato de telefono es incorrecto. Ejemplo: +5491187654321</> : <></>}
                onChange={(event) => setPhoneNumber(event.target.value)}
                value={phoneNumber}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="schedule"
                label="Horario de preferencia"
                id="schedule"
                error={errorSchedule}
                helperText={errorSchedule ?
                <>No debe quedar vacío</> : <></>}
                onChange={(event) => setSchedule(event.target.value)}
                value={schedule}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="message"
                label="Mensaje al profesor"
                id="message"
                error={errorMessage}
                helperText={errorMessage ?
                <>No debe quedar vacío</> : <></>}
                onChange={(event) => setMessage(event.target.value)}
                value={message}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Contratar
            </Button>
            </Box>
        </Box>
        </Container>
    );
}
