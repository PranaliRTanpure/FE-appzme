import { Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface DeviceSuperUserProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

const DeviceSuperUser: React.FC<DeviceSuperUserProps> = ({
  anchorEl,
  open,
  handleClose,
}) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/admin/settings/profile");
    handleClose();
  };

  const handleAdminUsersClick = () => {
    navigate("/admin/settings/admin-users");
    handleClose();
  };

  const handleRoleAndResponsibilityClick = () => {
    navigate("/admin/settings/role-and-responsibility");
    handleClose();
  };

  return (
    <Menu
      id="admin-settings-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "admin-settings-button",
      }}
      slotProps={{
        paper: {
          sx: {
            mt: 1.5,
            "& .MuiMenuItem-root": {
              textAlign: "left",
            },
          },
        },
      }}
    >
      <MenuItem onClick={handleProfileClick}>
        <Typography>Availability</Typography>
      </MenuItem>
      <MenuItem onClick={handleAdminUsersClick}>
        <Typography>Inventory</Typography>
      </MenuItem>
      <MenuItem onClick={handleRoleAndResponsibilityClick}>
        <Typography>Manufacturers</Typography>
      </MenuItem>
    </Menu>
  );
};

export default DeviceSuperUser;
