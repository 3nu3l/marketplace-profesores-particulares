import React from "react";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useRouter } from "next/router";

export default function RegisterSuccess() {
    const router = useRouter()
    const data = router.query
    const hasMessage = (data.successMessage !== undefined)
    console.log(data.successMessage)
    console.log(hasMessage)

    return(
        <Container component="main">
            <CssBaseline />
            <h1>{hasMessage ? data.successMessage : "Registro exitoso."}</h1>
        </Container>
    );
}