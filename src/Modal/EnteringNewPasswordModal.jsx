import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";
import { updateUser } from "../services/userdetails";
import Backdrop from "@mui/material/Backdrop";
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: "10px",
  p: 4,
};
export default function EnteringNewPasswordModal({ closeModal }) {
  const [newPassword, SetnewPassword] = useState("");
  const [open1, setOpen1] = useState(true);
  const [progress, Setprogress] = useState(false);
  const [alertSamePassword, SetAlertSamePassword] = useState(false);
  const [successPasswordUpdation, SetsuccessPasswordUpdation] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const loggedInUser = useSelector((state) => state.loggedIn);

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword1 = (event) => {
    event.preventDefault();
  };
  const alertMessageIfSamePassword = (
    <Alert
      icon={<ErrorIcon fontSize="small" />}
      severity="error"
      style={{ marginTop: "0" }}
    >
      New password is same as old,try another!
    </Alert>
  );

  const successAlert = (
    <Alert
      icon={<CheckIcon fontSize="small" />}
      severity="success"
      style={{ marginTop: "0" }}
    >
      Successfully Updated!
    </Alert>
  );
  const handleClose1 = () => {
    SetAlertSamePassword(false);
    setOpen1(false);
    closeModal();
  };

  async function verifyNewPassword(e) {
    e.preventDefault();
    Setprogress(true);
    setTimeout(() => Setprogress(false), 2000);
    if (loggedInUser.password === newPassword) {
      SetAlertSamePassword(true);
    } else {
      SetAlertSamePassword(false);
      SetsuccessPasswordUpdation(true);
      await updateUser({ password: `${newPassword}` }, loggedInUser._id);
    }
  }
  return (
    <Modal
      open={open1}
      onClose={handleClose1}
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
        <Box sx={style1}>
          <div>{alertSamePassword ? alertMessageIfSamePassword : ""}</div>
          {successPasswordUpdation ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>{successAlert}</div>

              <Button
                style={{
                  width: "90px",
                  marginLeft: "40%",
                  marginTop: "10px",
                  height: "25px",
                  backgroundColor: "green",
                }}
                variant="contained"
                onClick={handleClose1}
              >
                Continue
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
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
          )}
        </Box>
      )}
    </Modal>
  );
}
