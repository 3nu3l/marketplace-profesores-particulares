import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const resetPassword = async (newPassword) => {
    await axios.post('** ENDPOINT ACÁ **', {
      newPassword: newPassword,
    }, {
    headers: {
      'Content-Type': 'application/json', 
      'Accept': 'application/json',
      // si no es necesario, borrar la sección de headers
    }})
    .then(function (response) {
        // Success
      console.log(response);
      window.alert("Contraseña restablecida con éxito, ya puede iniciar sesión.")
    })
    .catch(function (error) {
        // Failure
      console.log(error);
      window.alert("Ocurrió un error.")
    })
  };

export default function PasswordRecovery() {
    const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,16}$/
    const [password, setPassword] = React.useState("");
    const [errorPassword, setErrorPassword] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const [repeatPassword, setRepeatPassword] = React.useState("");
    const [errorRepeatPassword, setErrorRepeatPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let hasError: boolean = false;
        const data = new FormData(event.currentTarget);
    
        if (password.trim().length === 0 || !password.match(passwordRegex)) {
          hasError = true;
          setErrorPassword(true);
        } else {
          hasError = false;
          setErrorPassword(false);
        };
    
        if (repeatPassword !== password) {
          hasError = true;
          setErrorRepeatPassword(true);
        } else {
          hasError = false;
          setErrorRepeatPassword(false);
        };
    
        if (!hasError) {
          resetPassword(password)
        }
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
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Restablecer contraseña
            </Typography>
            <br /><br />
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        onClick={() => setShowPassword(prev => !prev)}
                        edge="end"
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                error={errorPassword}
                helperText={errorPassword ?
                    <>Ingrese una contraseña válida.<br />
                    La contraseña debe poseer:<br />
                    - Entre 8 y 16 caracteres alfanuméricos<br />
                    - Dos letras mayúsculas<br />
                    - Un caracter especial, elegir entre: !@#$&*<br />
                    - Tres letras minúsculas<br />
                    - Dos números<br />
                    </> : <></>}
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                />
                <br /><br />
                <TextField
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        onClick={() => setShowRepeatPassword(prev => !prev)}
                        edge="end"
                        >
                        {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
                required
                fullWidth
                name="repeatPassword"
                label="Repetir contraseña"
                type={showRepeatPassword ? 'text' : 'password'}
                id="repeatPassword"
                autoComplete="new-password"
                error={errorRepeatPassword}
                helperText={errorRepeatPassword ?
                    <>Las contraseñas deben coincidir</> : <></>}
                onChange={(event) => setRepeatPassword(event.target.value)}
                value={repeatPassword}
                />

                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Restablecer contraseña
                </Button>
            </Box>
            </Box>
        </Container>
    );
}