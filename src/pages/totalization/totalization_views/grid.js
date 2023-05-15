import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  boxShadow:'none',
  padding:'none'
}));

export default function BasicGrid(props) {
    
    const {data} = props;

    //console.log(data);

    return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        
        <Grid item xs={2}>
          <Item>
            <Typography style={{fontWeight: 'bold' }} variant="h5" display="block" >
              Proyecto : 
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            {data.nameProject}
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
          </Item>
        </Grid>

        <Grid item xs={2}>
          <Item>
            <Typography style={{fontWeight: 'bold' }} variant="h5" display="block" >
              Actividad : 
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            {data.actividad}
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
          </Item>
        </Grid>


        <Grid item xs={2}>
          <Item>
            <Typography style={{fontWeight: 'bold' }} variant="h5" display="block" gutterBottom>
              Fecha inicio : 
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            {data.f_inicio}
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
          </Item>
        </Grid>

        <Grid item xs={2}>
          <Item>
            <Typography style={{fontWeight: 'bold' }} variant="h5" display="block" gutterBottom>
              Fecha termino : 
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            {data.f_termino}
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
          </Item>
        </Grid>

        <Grid item xs={2}>
          <Item>
            <Typography style={{fontWeight: 'bold' }} variant="h5" display="block" gutterBottom>
              Cubicador : 
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            {data.nameProject}
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
          </Item>
        </Grid>

        <Grid item xs={2}>
          <Item>
            <Typography style={{fontWeight: 'bold' }} variant="h5" display="block" gutterBottom>
              Items : 
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            {data.items}
          </Item>
        </Grid>

      </Grid>
    </Box>
  );
}