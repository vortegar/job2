// REACT IMPORTS
import { Button, Zoom, Tooltip } from '@mui/material';

const ButtonComponent = ({ type, onClick, children, variant, color, disabled, tooltip }) => {

    if (tooltip !== undefined) {
        return (
            <Tooltip disabled={true} title={tooltip} TransitionComponent={Zoom} enterDelay={400} arrow>
                <Button type={type} disabled={disabled} onClick={onClick} variant={variant} color={color} sx={{ borderRadius: '14px', borderColor: { color }, border: 2 }}>
                    {children}
                </Button>
            </Tooltip>
        )
    } else {
        return (
            <Button type={type} disabled={disabled} onClick={onClick} variant={variant} color={color} sx={{ borderRadius: '14px', borderColor: { color }, border: 2 }}>
                {children}
            </Button>
        )
    }
}

export default ButtonComponent;