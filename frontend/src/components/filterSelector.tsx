import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid } from '@mui/material';

export default function FilterSelector() {
    const [minRating, setMinRating] = React.useState('');
    const [maxRating, setMaxRating] = React.useState('');

    const handleMinRatingChange = (event: SelectChangeEvent) => {
        setMinRating(event.target.value as string);
    };

    const handleMaxRatingChange = (event: SelectChangeEvent) => {
        setMaxRating(event.target.value as string);
    };

    return(
        <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 400,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}>
            <List style={{paddingTop: 0}}>
                <ListItem>
                    <Typography variant='h6'>Materia</Typography>
                </ListItem>

                <ListItem>
                    <TextField fullWidth placeholder='Matematica, Física...'/>
                </ListItem>

                <Divider variant='fullWidth' style={{paddingBottom: 20}}/>

                <ListItem>
                    <Typography variant='h6' paddingTop={1}>Tipo de clase</Typography>
                </ListItem>

                <ListItem>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Individual" />
                        <FormControlLabel control={<Checkbox />} label="Grupal" />
                    </FormGroup>
                </ListItem>

                <ListItem>
                    <Typography variant='h6'>Frecuencia</Typography>
                </ListItem>

                <ListItem>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Única" />
                        <FormControlLabel control={<Checkbox />} label="Semanal" />
                        <FormControlLabel control={<Checkbox />} label="Mensual" />
                    </FormGroup>
                </ListItem>

                <Divider variant='fullWidth' style={{paddingBottom: 10}} />

                <ListItem>
                    <Typography variant='h6' paddingTop={1}>Calificación</Typography>
                </ListItem>

                <ListItem>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Mín</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={minRating}
                                label="Sin mín."
                                onChange={handleMinRatingChange}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Máx</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={maxRating}
                                label="Sin máx."
                                onChange={handleMaxRatingChange}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </Paper>
    )
}