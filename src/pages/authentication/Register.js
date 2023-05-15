import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import FirebaseRegister from './auth-forms/AuthRegister';
import AuthWrapper from './AuthWrapper';

// ================================|| REGISTER ||================================ //

const Register = () => (
    <>
    <div style={{ overFlow: 'hidden' }} id="container">
      <div style={{ float: 'left', width: '65%' }} id="item">
        <AuthWrapper></AuthWrapper>
      </div>
      <div style={{ float: 'left', width: '20%', position: 'relative', top: '200px', left: '7%' }} id="item">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              {/* <img style={{ display: 'block', margin: 'auto', width: '140px' }} src={companyLogo} alt="BigCo Inc. logo" /> */}
            </Stack>
          </Grid>
          <Grid item xs={12}>
          <FirebaseRegister />
            <br />
            <Typography style={{justifyContent:'center', display:'flex'}} component={Link} to="/" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Volver
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
   </>
);

export default Register;
