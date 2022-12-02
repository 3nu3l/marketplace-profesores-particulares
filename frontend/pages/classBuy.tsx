import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react'

export default function ClassBuy() {
    const router = useRouter()
    const data = router.query

    const [classId, setClassId] = useState(data.classId)

    useEffect(() => {setClassId(data.searchTerm)}, [])

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
        // TODO: buy class with id
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
