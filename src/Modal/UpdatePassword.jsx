import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Backdrop from "@mui/material/Backdrop";
import EnteringNewPasswordModal from "./EnteringNewPasswordModal";
import ErrorIcon from "@mui/icons-material/Error";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "auto",
  bgcolor: "background.paper",
  p: 4,
};

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  height: "180px",
  bgcolor: "background.paper",
  borderRadius: "10px",
  p: 4,
};
export default function UpdatePassword({ value }) {
  const [newPassword, SetnewPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [password, setPassword] = useState("");
  const [progress, Setprogress] = useState(false);
  const [alertPassword, SetAlertPassword] = useState(false);
  const [alertSamePassword, SetAlertSamePassword] = useState(false);
  const [changePassPage, SetchangePassPage] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
    setOpen(false);
    SetchangePassPage(false);
    SetAlertSamePassword(false);
  };
  const handleClose = () => {
    setOpen(false);
    SetAlertPassword(false);
    SetchangePassPage(false);
    SetAlertSamePassword(false);
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword1 = (event) => {
    event.preventDefault();
  };
  const loggedInUser = useSelector((state) => state.loggedIn);

  const alertMessageWrongPassword = (
    <Alert
      icon={<CheckIcon fontSize="medium" />}
      severity="error"
    >
      Wrong password.try again!
    </Alert>
  );

  const alertMessageIfSamePassword = (
    <Alert
      icon={<ErrorIcon fontSize="small" />}
      severity="error"
      style={{ marginTop: "0" }}
    >
      New password is same as old,try another!
    </Alert>
  );

  function verifyNewPassword(e) {
    e.preventDefault();

    if (loggedInUser.password === newPassword) {
      SetAlertSamePassword(true);
    } else {
      SetAlertSamePassword(false);
    }
  }

  function handlePasswordAuthenticate(e) {
    e.preventDefault();
    Setprogress(true);
    setTimeout(() => Setprogress(false), 2000);
    if (password !== loggedInUser.password) {
      SetAlertPassword(true);
    } else {
      setTimeout(() => {
        SetAlertPassword(false);
        SetchangePassPage(true);
        handleOpen1();
      }, 2000);
    }
  }
  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{
          height: "auto",
          width: "auto",
          padding: "1px",
          marginBottom: "3px",
        }}
      >
        {value}
      </Button>
      {changePassPage ? (
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style1}>
            <div>{alertSamePassword ? alertMessageIfSamePassword : ""}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div style={{ marginTop: "25px" }}>Enter new password</div>

                <form onSubmit={verifyNewPassword}>
                  <FormControl
                    sx={{ m: 1, width: "25ch", marginLeft: "30px" }}
                    variant="outlined"
                    onChange={(e) => SetnewPassword(e.target.value)}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword1 ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword1
                                ? "hide the password"
                                : "display the password"
                            }
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword1}
                            onMouseUp={handleMouseUpPassword1}
                            edge="end"
                          >
                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      required
                    />
                  </FormControl>
                </form>
              </div>
              {newPassword ? (
                <Button
                  onClick={verifyNewPassword}
                  variant="contained"
                  style={{
                    display: "flex",
                    marginLeft: "40%",
                    marginTop: "20px",
                    width: "100px",
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  disabled
                  variant="contained"
                  style={{
                    display: "flex",
                    marginLeft: "40%",
                    marginTop: "20px",
                    width: "100px",
                  }}
                >
                  Submit
                </Button>
              )}
            </div>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {progress ? (
            <Backdrop
              sx={(theme) => ({
                color: "#fff",
                zIndex: theme.zIndex.drawer + 1,
              })}
              open={progress}
            >
              <CircularProgress color="red" />
            </Backdrop>
          ) : (
            <Box
              sx={style}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <center>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Verify current password
                  </Typography>
                </center>
                <div style={{ marginTop: "10px", marginBottom: "0px" }}>
                  {alertPassword ? alertMessageWrongPassword : ""}
                </div>
                <form onSubmit={handlePasswordAuthenticate}>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      marginTop: "15px",
                      marginLeft: "10px",
                      textAlign: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ color: "#007acc" }}>Current password:</div>
                    </div>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showPassword
                                  ? "hide the password"
                                  : "display the password"
                              }
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
                  <center>
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        marginTop: "20px",

                        width: "50px",
                        textAlign: "center",
                      }}
                      type="submit"
                    >
                      Verify
                    </Button>
                  </center>
                </form>
              </div>
            </Box>
          )}
        </Modal>
      )}
    </div>
  );
}
