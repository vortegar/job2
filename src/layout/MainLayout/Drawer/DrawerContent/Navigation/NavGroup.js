import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// material-ui
import { Box, List, Typography, Collapse, ListItemButton, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { DashboardOutlined, ShopOutlined, GitlabFilled, GoldOutlined, AppstoreAddOutlined, UserOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

// project import
import NavItem from './NavItem';
import { useState } from 'react';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const menu = useSelector((state) => state.menu);
    const [open, setOpen] = useState(false)
    const { drawerOpen } = menu;

    const [count, setCount] = useState(1);

    const handleClick = () => {
        setOpen(!open);
    };

    const navCollapse = item.children?.map((menuItem) => {
        switch (menuItem.type) {
            case 'collapse':
                return (
                    <div key={menuItem.id}>
                        <Collapse in={open} key={menuItem.id} timeout="auto" unmountOnExit>
                            <List component="div" key={menuItem.id}  disablePadding sx={{ml:2}}>
                                <NavItem key={menuItem.id} item={menuItem} level={1} />
                            </List>
                        </Collapse>
                    </div>
                );
            case 'item':
                return <NavItem key={menuItem.id} item={menuItem} level={1} />;
            default:
                return (
                    <Typography key={menuItem.id} variant="h6" color="error" align="center">
                        Fix - Group Collapse or Items
                    </Typography>
                );
        }
    });

    return (
        <List
            subheader={
                item.title &&
                drawerOpen && (
                    <Box sx={{ pl: 3, mb: 1.5 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            {item.title}
                        </Typography>
                    </Box>
                )
            }
            sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
        >
            <ListItemButton onClick={handleClick} sx={{
                zIndex: 1201,
                pl: '28px',
                py: 1.25,

                '&:hover': {
                    bgcolor: 'primary.lighter'
                },
                '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    borderRight: `2px solid `,

                    '&:hover': {

                        bgcolor: 'primary.lighter'
                    }
                }


            }}>
                &nbsp;&nbsp;&nbsp;Materiales&nbsp;&nbsp;&nbsp;
                {open ? <UpOutlined /> : <DownOutlined />}

            </ListItemButton>
            {navCollapse}
        </List>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
