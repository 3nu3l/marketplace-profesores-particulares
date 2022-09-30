import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';

export default function SubjectSearchBar() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
            <TextField
                placeholder="Buscá materias y clases..."
                InputProps={{
                    startAdornment: (
                        <SearchIcon style={{marginRight: 10}}/>
                    ),
                    type: 'search',
                }}
            />
    </Stack>
  );
}
