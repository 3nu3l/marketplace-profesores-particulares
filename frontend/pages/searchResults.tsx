import * as React from 'react';
import SimpleClass from '../src/components/simpleClass'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';

export default function SearchResults() {
    return (
        <Container
        component = "main"
        style={{ alignItems: "center", justifyContent: "center" }}
        >
            <CssBaseline />
            <h1>Resultados de la búsqueda</h1>
            <List>
                <ListItem>
                    <SimpleClass name="Introducción a trigonometría" subject="Matemática" price='20' rating={5} frequency="Semanal" duration="2" />
                </ListItem>
                <ListItem>
                    <SimpleClass name="Introducción a trigonometría" subject="Matemática" price='20' rating={3} frequency="Semanal" duration="2" />
                </ListItem>
                <ListItem>
                    <SimpleClass name="Introducción a trigonometría" subject="Matemática" price='20' rating={2} frequency="Semanal" duration="2" />
                </ListItem>
                <ListItem>
                    <SimpleClass name="Introducción a trigonometría" subject="Matemática" price='20' rating={4} frequency="Semanal" duration="2" />
                </ListItem>
                <ListItem>
                    <SimpleClass name="Introducción a trigonometría" subject="Matemática" price='20' rating={1} frequency="Semanal" duration="2" />
                </ListItem>
            </List>
        </Container> 
    )
}