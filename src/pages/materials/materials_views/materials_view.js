//REACT IMPORTS
import * as React from 'react';

//MATERIAL UI IMPORTS
import { Dialog, DialogActions, DialogTitle, Box } from '@mui/material';

// CUSTOM COMPONENTS IMPORTS
import ButtonComponent from 'components/main_components/button_component/index';
import ViewTextComponent from '../../../components/main_components/viewText_component/index';

const ViewProduct = (props) => {

  // VARIABLE ASSIGNMENT OF PROPS RECEIVED
  const { abrir, closeModal, product } = props;


  const handleClose = () => {
    closeModal();
  };

  return (
    <div>
      <Dialog open={abrir} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: '14px' } }}>
        <DialogTitle sx={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: 'bold' }}>Visualizacion de Producto</DialogTitle>
        <Box
          component="form"
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
          noValidate
          autoComplete="off"
        >
          <ViewTextComponent id="title" label="Nombre" type="text" defaultValue={product[0].title} />
          <ViewTextComponent id="unit_cost" label="Costo Unitario" type="number" defaultValue={product[0].unit_cost} />
          <ViewTextComponent id="retail_sell_price" label="Costo Retail" type="number" defaultValue={product[0].retail_sell_price} />
          <ViewTextComponent id="wholesaler_sell_price" label="Costo Mayorista" type="number" defaultValue={product[0].wholesaler_sell_price} />
          <ViewTextComponent id="sku" label="SKU" type="text" defaultValue={product[0].sku} />
          <ViewTextComponent id="barcode" label="Codigo de barras" type="text" defaultValue={product[0].barcode} />
          <ViewTextComponent id="locked_stock" label="Stock Reservado" type="number" defaultValue={product[0].locked_stock} />
          <ViewTextComponent id="available_stock" label="Stock Disponible" type="number" defaultValue={product[0].available_stock} />
          <ViewTextComponent id="future_stock" label="Stock Futuro" type="number" defaultValue={product[0].future_stock} />
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}>
            <DialogTitle sx={{ fontSize: 15, fontFamily: 'Roboto', fontWeight: 'bold' }}>QR CODE</DialogTitle>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 233,
              }}
              alt="QR Code"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/QR_icon.svg/1200px-QR_icon.svg.png"
            />
            <DialogTitle sx={{ fontSize: 15, fontFamily: 'Roboto', fontWeight: 'bold' }}>BAR CODE</DialogTitle>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 233,
              }}
              alt="BarCode"
              src="https://svgsilh.com/svg/306926.svg"
            />
          </Box>
        </Box>
        <br />
        <DialogActions>
          <ButtonComponent onClick={handleClose}> Cerrar </ButtonComponent>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewProduct;