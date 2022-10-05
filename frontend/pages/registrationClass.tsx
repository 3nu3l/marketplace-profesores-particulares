import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function CreateClass() {
    const costRegex = /^[+]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/
    const [errorCost, setErrorCost] = React.useState(false);
    const [cost, setCost] = React.useState("");

    const [className, setClassName] = React.useState("");
    const [errorClassName, setErrorClassName] = React.useState(false);

    const [subject, setSubject] = React.useState("");
    const [errorSubject, setErrorSubject] = React.useState(false);

    const [duration, setDuration] = React.useState("");
    const [errorDuration, setErrorDuration] = React.useState(false);

    const [frequency, setFrequency] = React.useState("");

    const [classType, setClassType] = React.useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            className: data.get('className'),
            subject: data.get('subject'),
        });

        if (cost.trim().length === 0 || !cost.match(costRegex))
            setErrorCost(true);
        else
            setErrorCost(false);
        if (className.trim().length === 0)
            setErrorClassName(true);
        else
            setErrorClassName(false);
        if (subject.trim().length === 0)
            setErrorSubject(true);
        else
            setErrorSubject(false);
        if (duration.trim().length === 0 || !duration.match(costRegex))
            setErrorDuration(true);
        else
            setErrorDuration(false);
    };

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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <PostAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registrar clase
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                id="className"
                                label="Nombre"
                                error={errorClassName}
                                helperText={errorClassName ? <>No debe estar vacío.</> : <></>}
                                onChange={(event) => setClassName(event.target.value)}
                                value={className}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="subject"
                                label="Materia"
                                name="subject"
                                error={errorSubject}
                                helperText={errorSubject ? <>No debe estar vacío.</> : <></>}
                                onChange={(event) => setSubject(event.target.value)}
                                value={subject}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="duration"
                                label="Duración"
                                name="duration"
                                inputProps={{ min: 0 }}
                                type='number'
                                error={errorDuration}
                                helperText={errorDuration ?
                                    <>{<div>Ingrese una duración válida mayor a &#39;0&#39; (cero).</div>}</> : <></>}
                                value={duration}
                                onChange={(event) => setDuration(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="frequency-select-label">Frencuencia</InputLabel>
                                <Select
                                labelId="frequency-select-label"
                                id="frequency-select"
                                value={frequency}
                                label="Frencuencia"
                                onChange={(event: SelectChangeEvent) => setFrequency(event.target.value as string)}
                                >
                                    <MenuItem value={0}>Única</MenuItem>
                                    <MenuItem value={1}>Semanal</MenuItem>
                                    <MenuItem value={2}>Mensual</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="class-type-select-label">Tipo</InputLabel>
                                <Select
                                labelId="class-type-select-label"
                                id="class-type-select"
                                value={classType}
                                label="Tipo"
                                onChange={(event: SelectChangeEvent) => setClassType(event.target.value as string)}
                                >
                                    <MenuItem value={0}>Individual</MenuItem>
                                    <MenuItem value={1}>Grupal</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="cost"
                                label="Costo por hora"
                                name="cost"
                                type='number'
                                error={errorCost}
                                helperText={errorCost ?
                                    <>{<div>Ingrese un monto válido mayor a &#39;0&#39; (cero) y separando los centavos con &#39;.&#39; (punto) solo con dos decimales</div>}</> : <></>}
                                value={cost}
                                onChange={(event) => setCost(event.target.value)}
                                inputProps={{ min: 0 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <div>$</div>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Registrar clase
                    </Button>

                </Box>
            </Box>
        </Container>
    );
}