import React from "react";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

export default function RegisterSuccess(props) {
    let text
    switch (props.registrationType) {
        case "user":
            text = "Se ha registrado con éxito. Ya puede ingresar al sitio."
        case "class":
            text = "Clase registrada con éxito."
        default:
            text = "Registro exitoso."
    }
    return(
        <Container component="main">
            <CssBaseline />
            <h1>{text}</h1>
        </Container>
    );
}