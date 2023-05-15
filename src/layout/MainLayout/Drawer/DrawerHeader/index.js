import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Chip, Typography } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
// import Logo from 'components/Logo';
import CompanyLogo from '../../../../assets/images/icons/logo_didox.svg';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
    const theme = useTheme();

    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open} style={{ justifyContent:'center'}} >
            <Stack direction="row" spacing={1} alignItems="center" >
            <img style={{width:'130px', justifyContent:'center'}}  alt="Didox" src={CompanyLogo} />
                {/* <Typography variant="h2">Didox</Typography> */}
                {/*                 <Chip
                    label={process.env.REACT_APP_VERSION}
                    size="small"
                    sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
                    component="a"
                    href="https://github.com/codedthemes/mantis-free-react-admin-template"
                    target="_blank"
                    clickable
                /> */}
            </Stack>
        </DrawerHeaderStyled>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;
