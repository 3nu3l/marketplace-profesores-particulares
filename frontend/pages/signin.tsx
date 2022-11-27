import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';

const Login = async (email, password) => {
  axios.post('http://localhost:3001/signIn', {
    email: email,
    password: password
  }, {
  headers: {
    'Content-Type': 'application/json', 
    'accept': 'application/json',
  }})
  .then(function (response) {
    console.log(response);

    localStorage["token"] = response.data.bearerToken;
    localStorage["fullName"] = response.data.user.fullname;
    localStorage["role"] = response.data.user.role;

    location.href = "/"
  })
  .catch(function (error) {
    console.log(error);
    /* switch (error.response.status) {
      case 404:
        window.alert("El usuario no existe, por favor revise sus credenciales.")
        break;
      case 401:
        window.alert("Unauthorized")
        break;
      default:
        window.alert("Error desconocido, póngase en contacto con el administrador")
        break;
    }; */
  });
};

function handlePasswordRecovery() {
  let text
  let email = prompt("Ingrese el correo electrónico con el que se registró:", "example@mail.com")
  window.alert("Si su dirección se encuentra en nuestra base de datos, le enviaremos un correo de recuperación.")
  // TODO: request password recovery
}

export default function SignIn() {
  const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,16}$/
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const [errorEmail, setErrorEmail] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hasError: boolean = false;
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
    });

    if (password.trim().length === 0 || !password.match(passwordRegex)) {
      hasError = true;
      setErrorPassword(true);
    } else {
      hasError = false;
      setErrorPassword(false);
    };

    if (email.trim().length === 0 || !email.match(emailRegex)) {
      hasError = true;
      setErrorEmail(true);
    } else {
      hasError = false;
      setErrorEmail(false);
    };

    if (!hasError) {
      Login(email, password)
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
            Conectarse
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              error={errorEmail}
              helperText={errorEmail ?
                <>El formato de email es incorrecto. Ejemplo: example@mail.com</> : <></>}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar mis datos"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  <a onClick={handlePasswordRecovery}>¿Olvidó su contraseña?</a>{""}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"¿No tiene cuenta? Cree una"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
}
