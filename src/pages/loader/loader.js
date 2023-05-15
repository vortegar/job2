import React from "react";
import { Box, Dialog, DialogContent, CircularProgress, Typography} from '@mui/material';

const PageLoader = () => {
  return (
      <>
      <Dialog
        //open={isLoading}
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
      </>
  )
}

export default PageLoader;
