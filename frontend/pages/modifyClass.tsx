import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import { InputAdornment } from '@mui/material';


export default function ModifyClass() {
    const costRegex = /^[+]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/
    const [errorCost, setErrorCost] = React.useState(false);
    const [cost, setCost] = React.useState("");

    const [className, setClassName] = React.useState("");
    const [errorClassName, setErrorClassName] = React.useState(false);

    const [matter, setMatter] = React.useState("");
    const [errorMatter, setErrorMatter] = React.useState(false);

    const [duration, setDuration] = React.useState("");
    const [errorDuration, setErrorDuration] = React.useState(false);

    const [frequency, setFrequency] = React.useState("");
    const [errorFrequency, setErrorFrequency] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            className: data.get('className'),
            matter: data.get('matter'),
        });

        if (cost.trim().length === 0 || !cost.match(costRegex))
            setErrorCost(true);
        else
            setErrorCost(false);
        if (className.trim().length === 0)
            setErrorClassName(true);
        else
            setErrorClassName(false);
        if (matter.trim().length === 0)
            setErrorMatter(true);
        else
            setErrorMatter(false);
        if (duration.trim().length === 0 || !duration.match(costRegex))
            setErrorDuration(true);
        else
            setErrorDuration(false);
        if (frequency.trim().length === 0)
            setErrorFrequency(true);
        else
            setErrorFrequency(false);
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
                    <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Modificar clase
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="className"
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
                                id="matter"
                                label="Materia"
                                name="matter"
                                error={errorMatter}
                                helperText={errorMatter ? <>No debe estar vacío.</> : <></>}
                                onChange={(event) => setMatter(event.target.value)}
                                value={matter}
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="frequency"
                                label="Frecuencia"
                                id="frequency"
                                error={errorFrequency}
                                helperText={errorFrequency ? <>No debe estar vacío.</> : <></>}
                                value={frequency}
                                onChange={(event) => setFrequency(event.target.value)}
                            />
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
                        color="secondary"
                        type="submit"
                        fullWidth
                        variant="outlined"
                        //variant="contained"
                        sx={{ mt: 3, mb: 1 }}
                    >
                        Guardar y cerrar
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 1 }}
                    >
                        Publicar clase
                    </Button>



                </Box>
            </Box>
        </Container>
    );
}