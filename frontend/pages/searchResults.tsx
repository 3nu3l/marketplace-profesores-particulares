import * as React from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import FilterSelector from '../src/components/filterSelector'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

export default function SearchResults() {
    const router = useRouter()
    const data = router.query

    const [noResults, setNoResults] = useState(false)

    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {performSearch(data.searchTerm)}, [])

    const SimpleClass = ({name, subject, price, rating, frequency, duration}) => (
        <Paper
        sx={{
            p: 2,
            maxWidth: 700,
            flexGrow: 1,
            backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        >
        <Grid container spacing={2}>
                <Grid item xs={8}>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {duration} hs | {frequency}
                </Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant="h5" component="div" style={{textAlign: "right"}} color="green">
                    $ {price}
                </Typography>
                </Grid>
                <Grid item xs={8}>
                <Rating name="read-only" value={rating} readOnly />
                </Grid>
                <Grid item xs={4} style={{display: "flex"}}>
                <Button style={{marginLeft: "auto"}} onClick={() => goToClass(name, subject)}>Ver más</Button>
                </Grid>
        </Grid>
        </Paper>
    );

    const results = searchResults.filter(result => result.classState === "Publicada").map((result) => 
    <div><SimpleClass
    name={result.className}
    subject={result.subject}
    price={result.cost}
    rating={result.rating}
    frequency={result.frecuency}
    duration={result.duration}
    />
    <br /></div>
    )

    function goToClass(className, classSubject) {
        router.push({
            pathname: "/classDetails",
        query: {
            'className': className,
            'classSubject': classSubject
        }},
        "/classDetails")
    }

    async function performSearch(query) {
        axios.get(`http://localhost:3001/classes/search/${query}`, {
            headers: {
                'authorization': localStorage.getItem("token")
            }
        })
        .then(function (response) {
            console.log(response.data)
            setNoResults(false)
            setSearchResults(response.data.class)
        })
        .catch(function (error) {
            console.log(error)
            console.log(error.response)
            switch (error.response.status) {
                case 401:
                    window.alert("Su sesión ha expirado. Por favor, vuelva a ingresar al sistema.")
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    localStorage.removeItem("fullName");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("email");
                    window.location.href = "/signIn";
                    break;
                case 404:
                    setNoResults(true)
                    break;
                default:
                    window.alert("Ocurrió un error.")
                    break;
            }
        })
    }

    if (noResults || results.length === 0) {
        return(<Container component="main">
        <CssBaseline />
            <h1>No hay resultados que coincidan con la búsqueda</h1>
        </Container>)
    } else {
        return (
            <Container
            component = "main"
            style={{ alignItems: "center", justifyContent: "center" }}
            >
                <CssBaseline />
                <h1>Resultados de la búsqueda</h1>
                <Grid container spacing={{xs: 2, md: 0}} direction={{xs: "column", md: "row"}}>
                    <Grid item xs={3}>
                        <FilterSelector />
                    </Grid>
                    <Grid item xs={9}>
                        <List disablePadding style={{paddingTop:0, marginLeft:15}}>
                            {results}
                        </List>
                    </Grid>
                </Grid> 
            </Container> 
        )
    }
}
