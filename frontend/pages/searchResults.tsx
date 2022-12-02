import * as React from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Grid from '@mui/material/Grid'
import SimpleClass from '../src/components/simpleClass'
import FilterSelector from '../src/components/filterSelector'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function SearchResults() {
    const router = useRouter()
    const data = router.query

    const [noResults, setNoResults] = useState(false)

    const [searchResults, setSearchResults] = useState({})

    useEffect(() => {performSearch(data.searchTerm)}, [])

    async function performSearch(query) {
        axios.get(`http://localhost:3001/className/${query}`, {
            headers: {
                'authorization': localStorage.getItem("token")
            }
        })
        .then(function (response) {
            console.log(response.data)
            setNoResults(false)
            setSearchResults(response.data.class)
            // this.setState({ searchResults: response.data.class })
        })
        .catch(function (error) {
            console.log(error)
            console.log(error.response)
            switch (error.response.status) {
                case 401:
                    window.alert("Por favor, vuelva a iniciar sesión.")
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

    const listResult = (result) => (
    <ListItem><SimpleClass name={result.name} subject={result.subject} price={result.price} rating={result.rating} frequency={result.frecuency} duration={result.duration} /></ListItem>
    )

    if (noResults) {
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
                        <List disablePadding style={{paddingTop:0, marginTop:-7}}>
                            {/* TODO: listar resultados */}
                            Se encontraron resultados pero todavía no se como listarlos
                        </List>
                    </Grid>
                </Grid> 
            </Container> 
        )
    }
}
