import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function SimpleClass({name, subject, price, rating, frequency, duration}) {
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
              <Typography variant="subtitle1" component="div" style={{textAlign: "right"}}>
                $ {price}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Rating name="read-only" value={rating} readOnly />
            </Grid>
            <Grid item xs={4} style={{display: "flex"}}>
              <Button style={{marginLeft: "auto"}}>Ver más</Button>
            </Grid>
      </Grid>
    </Paper>
  );
}
