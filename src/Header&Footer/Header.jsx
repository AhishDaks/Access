import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 80,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Header() {
  const [openModal, setOpenModal] = useState(false);

  const Navigate = useNavigate();

  const handleOpenModal = () => setOpenModal(true);
  function No() {
    setOpenModal(false);
    setAnchorEl(null);
  }

  function Yes() {
    localStorage.clear();
    Navigate("/login");
  }
  const handleCloseModal = () => setOpenModal(false);
  let loggedInUserName = JSON.parse(localStorage.getItem("loggedInUser"));

  const [anchorEl, setAnchorEl] = useState(null);
  const openDialog = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#4d79ff",
        margin: "0",
      }}
    >
      <div style={{ marginTop: "10px", fontSize: "large", color: "#ebebe0" }}>
        <i>
          <b>Tech Global</b>
        </i>
      </div>

      <div>
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
              >
                <div style={{ display: "flex" }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {loggedInUserName.name[0]}
                  </Avatar>
                  <div
                    style={{
                      marginTop: "7px",
                      marginLeft: "5px",
                      fontSize: "medium",
                      color: "#ebebe0",
                    }}
                  >
                    <b>{loggedInUserName.name}</b>
                  </div>
                </div>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openDialog}
            onClose={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 30,
                    height: 30,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 8,
                    height: 5,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <div>
                <Button onClick={handleOpenModal}>Logout</Button>
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <center>
                      <div>
                        <div style={{ color: "black", fontSize: "large" }}>
                          Are you sure want to log out?
                        </div>
                        <button
                          style={{
                            textDecoration: "none",
                            marginRight: "2px",
                            marginTop: "20px",
                            border: "1px solid gray",
                            borderRadius: "15px",
                            backgroundColor: "#4d79ff",
                            color: "white",
                          }}
                          onClick={Yes}
                        >
                          <div style={{ padding: "2px" }}>YES</div>
                        </button>
                        <button
                          style={{
                            textDecoration: "none",
                            border: "1px solid gray",
                            borderRadius: "15px",
                            backgroundColor: "#4d79ff",
                            color: "white",
                            marginLeft: "2px",
                          }}
                          onClick={No}
                        >
                          <div style={{ padding: "2px" }}> NO</div>
                        </button>
                      </div>
                    </center>
                  </Box>
                </Modal>
              </div>
            </MenuItem>
          </Menu>
        </>
      </div>
    </div>
  );
}
