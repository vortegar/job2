import {Typography, Box} from '@mui/material';


const TitleComponent = ({children}) => {

    return(
        <Box
        sx={{
            p: 0,
            m: 1, display: 'inline-flex', flexGrow: 1
        }} >
            <Typography variant='h3' gutterBottom align={'center'}>
                {children}
            </Typography>
        </Box>
    )

}

export default TitleComponent;