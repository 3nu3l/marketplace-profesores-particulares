import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link'

function handleCommentSend() {
    window.alert("Su comentario está pendiente de aprobación")

}

export default function ClassDetails({name, subject, price, rating, frequency, duration, type, description}) {
    const [value, setValue] = React.useState<number | null>(2);
    
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
                        $ {price}
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="body1" component="div" style={{textAlign: "left"}}>
                        Modalidad: {type}
                    </Typography>
                    </Grid>
                    <br />
                    <Grid item xs={12}>
                    <Typography variant="body1" component="div" style={{textAlign: "left"}}>
                        {description}
                    </Typography>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <Link href="/"><Button variant='contained' style={{marginLeft: "auto"}}>Contratar esta clase</Button></Link>
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
            <TextField id="class-comment" label="Comentario..." variant="standard" style={{width: 600, maxWidth: 1000, flexGrow: 1}} /><br /><br />
            <Link href="#"><a onClick={handleCommentSend}><Button variant='outlined' style={{marginLeft: "auto"}}>Enviar</Button></a></Link>
            <br /><br />
            <Typography variant="h5">
                Comentarios de alumnos:
            </Typography>
            <br /><br />
        </Container>
    );
}