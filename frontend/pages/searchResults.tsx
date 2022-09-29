import * as React from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Grid from '@mui/material/Grid'
import SimpleClass from '../src/components/simpleClass'
import FilterSelector from '../src/components/filterSelector'

export default function SearchResults() {
    return (
        <Container
        component = "main"
        style={{ alignItems: "center", justifyContent: "center" }}
        >
            <CssBaseline />
            <h1>Resultados de la búsqueda</h1>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <FilterSelector />
                </Grid>
                <Grid item xs={9}>
                    <List disablePadding style={{paddingTop:0, marginTop:-7}}>
                        <ListItem>
                            <SimpleClass name="Introducción a trigonometría" subject="Matemática" price='45.00' rating={5} frequency="Semanal" duration="2" />
                        </ListItem>
                        <ListItem>
                            <SimpleClass name="MRU, MRUV, Tiro vertical" subject="Física" price='20.00' rating={3} frequency="Único" duration="3" />
                        </ListItem>
                        <ListItem>
                            <SimpleClass name="Entendiendio el Martín Fierro" subject="Lengua y Literatura" price='30.00' rating={2} frequency="Único" duration="6" />
                        </ListItem>
                        <ListItem>
                            <SimpleClass name="Uniones covalentes" subject="Química" price='65.00' rating={4} frequency="Mensual" duration="2" />
                        </ListItem>
                        <ListItem>
                            <SimpleClass name="Redes y Telecomunicaciones 1" subject="Matemática" price='150.00' rating={1} frequency="Semanal" duration="4" />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            
        </Container> 
    )
}