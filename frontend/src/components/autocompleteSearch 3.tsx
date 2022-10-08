import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

export default function SubjectSearchBar() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
            id="free-solo-2-demo"
            disableClearable
            options={subjects.map((option) => option.name).sort()}
            
            renderInput={(params) => (
            <TextField
                {...params}
                label="¿En qué materia necesitás ayuda?"
                InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                        <SearchIcon/>
                    ),
                    type: 'search',
                }}
            />
            )}
        />
    </Stack>
  );
}

// TODO: traer esto de la API
const subjects = [
    { name: 'Física' },
    { name: 'Matemática' },
    { name: 'Lengua y literatura' },
    { name: 'Inglés' },
    { name: 'Química' },
    { name: 'Historia' },
    { name: 'Biología' },
    { name: 'Informática' },
    { name: 'Programación' }
];
