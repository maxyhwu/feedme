import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { BiUserCircle } from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import { UseLoginContext } from "../Context/LoginCnt"
import { UseDataContext } from "../Context/useUserData"
import { removeUserData } from "../Cookies/cookies"

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {changeLogin} = UseLoginContext()
  const {changeData} = UseDataContext()
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = () => {
    navigate('/mypage')
  }
  const handleSettingClick = () => {
    navigate('/settings')
  }
  const handleLogoutClick = () => {
    changeLogin(false)
    changeData({})
    removeUserData()
  }
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <BiUserCircle id="userIcon" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Avatar/> Profile
        </MenuItem>
        <MenuItem onClick={handleSettingClick}>
          <Avatar/> Settings
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <Avatar/> Logout
        </MenuItem>
      </Menu>
    </>
  );
}