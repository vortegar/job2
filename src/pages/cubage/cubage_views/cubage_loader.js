import { Box, Dialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '../../../../node_modules/@mui/material/index';

const CubageLoader = () => {
  const isLoading = useSelector((store) => store.cubageFormStates.isLoading);

  return (
    <div>
      <Dialog
        open={isLoading}
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: '#fff',
            boxShadow: 'none'
          }
        }}
      >
        <DialogContent>
        <Box
            sx={{
              position: 'absolute',
              top: '40%',
              left: '40%'
            }}
          >
          <Typography variant="h4" color="initial">
            Por favor espere unos segundos...
          </Typography>
        </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%'
            }}
          >
            <CircularProgress  size={50}/>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CubageLoader;
