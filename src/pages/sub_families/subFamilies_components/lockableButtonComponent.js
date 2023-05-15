// REACT IMPORTS
import Button from '@mui/material/Button';
import { useSelector } from '../../../../node_modules/react-redux/es/exports';

const LockableButtonComponent = ({ type, onClick, children, variant, color}) => {
    const disabledButton = useSelector(store => store.subFamiliesStates.disabledButton);
    return (
        <Button type={type} onClick={onClick}  disabled={disabledButton} variant={variant} color={color} sx={{ borderRadius: '14px', borderColor: {color}, border: 2}}>
            {children}
        </Button>
    );
}

export default LockableButtonComponent;