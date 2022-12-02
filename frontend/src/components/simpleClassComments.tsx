import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function SimpleClass({text, publisher}) {
  return (
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
            <Grid item xs={12}>
            <Typography gutterBottom variant="subtitle1" component="div">
                {publisher}
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography gutterBottom variant="body2" component="div">
                {text}
              </Typography>
            </Grid>
      </Grid>
    </Paper>
  );
}