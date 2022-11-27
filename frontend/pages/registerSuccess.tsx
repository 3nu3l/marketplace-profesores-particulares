import React from "react";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

export default function RegisterSuccess() {
    return(
        <Container component="main">
            <CssBaseline />
            <h1>Se ha registrado con éxito. Ya puede ingresar al sitio.</h1>
        </Container>
    );
}