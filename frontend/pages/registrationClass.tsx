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

export default function CreateClass() {
    const costRegex = /^[+]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/
    const [cost, setCost] = React.useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            className: data.get('className'),
            matter: data.get('matter'),
        });
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
                                autoComplete="given-name"
                                name="className"
                                required
                                fullWidth
                                id="className"
                                label="Nombre de la clase"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="matter"
                                label="Materia"
                                name="matter"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="duration"
                                label="Duración"
                                name="duration"
                                autoComplete="duration"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="frequency"
                                label="Frecuencia"
                                type="frequency"
                                id="frequency"
                                autoComplete="frequency"
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
                                error={cost.trim().length === 0 || !cost.match(costRegex)}
                                helperText={cost.trim().length === 0 || !cost.match(costRegex) ?
                                    <>Ingrese un monto válido mayor a "0" (cero) y separando los centavos con "." (punto) solo con dos decimales</> : <></>}
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