import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { addNewUser, fetchUsers } from "../services/userdetails";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLoggedIn, addUser, fetchnoManagerEmployee } from "../store/store";
export const Style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 460,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
export default function Signup() {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const Dispatch = useDispatch();
  const [password, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);

  const [show, setShow] = useState();

  const [employee, setEmployee] = useState(true);
  const [manager, setManager] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setShow("");
    setModalOpen(false);
  };

  async function newUser(e) {
    e.preventDefault();

    let randomId = Math.floor(Math.random() * 10000 - 1);
    let apiPostData = {
      name,
      password,
      email,
      age: parseInt(age),
      id: randomId,
      isManager: manager,
    };
    try {
      setOpen(true);
      await addNewUser(apiPostData);
      const result = await fetchUsers();
      Dispatch(addUser(result));
      let loggedInData = result.filter((A) => A.id === randomId);
      const noMangerEmployees = result.filter(
        (a) => a.managerId === null && !a.isManager,
      );

      Dispatch(fetchnoManagerEmployee(noMangerEmployees));
      setShow(
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
        >
          successfully added
        </Alert>,
      );
      setTimeout(() => {
        setOpen(false);
        Dispatch(addLoggedIn(...loggedInData));
        Navigate(`main/${randomId}`);
      }, 2000);
    } catch {
      setShow(
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="error"
        >
          error in assigning,Age should be Number
        </Alert>,
      );
      setTimeout(() => setOpen(false), 1000);
    }
  }

  function decide() {
    setEmployee(true);
    setManager(false);
  }

  function decide1() {
    setManager(true);
    setEmployee(false);
  }
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <center>
        <div
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            flexDirection: "column",
          }}
        >
          Don't have an account?
          <Button
            variant="text"
            style={{ height: "30px", marginTop: "0px", color: "black" }}
            onClick={handleOpen}
          >
            Sign up
          </Button>
        </div>
      </center>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Style}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                variant={employee ? "contained" : "outlined"}
                onClick={decide}
                style={{
                  height: "30px",
                  marginTop: "13px",
                  backgroundColor: `${employee ? "#4d79ff" : ""}`,
                }}
              >
                Employee
              </Button>
              <Button
                variant={manager ? "contained" : "outlined"}
                onClick={decide1}
                style={{
                  height: "30px",
                  marginTop: "13px",
                  backgroundColor: `${manager ? "#4d79ff" : "white"}`,
                }}
              >
                Manager
              </Button>
            </div>
            <br></br>
            <div>{show}</div>
            <br></br>
            <div>
              <form onSubmit={newUser}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginTop: "10px",
                  }}
                >
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    required
                    label="Name"
                  />
                  <br></br>
                  <TextField
                    onChange={(e) => setPassWord(e.target.value)}
                    required
                    label="Password"
                    type="password"
                  />
                  <br></br>
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    label="Email"
                    type="email"
                  />
                  <br></br>
                  <TextField
                    onChange={(e) => setAge(e.target.value)}
                    required
                    label="Age"
                  />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <Button
                        variant="outlined"
                        style={{
                          height: "30px",
                          marginTop: "13px",
                          color: "black",
                        }}
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Backdrop
                        sx={(theme) => ({
                          color: "#fff",
                          zIndex: theme.zIndex.drawer + 1,
                        })}
                        open={open}
                      >
                        <CircularProgress color="inherit" />
                      </Backdrop>
                    </div>
                    <Button
                      variant="outlined"
                      style={{
                        height: "30px",
                        marginTop: "13px",
                        marginLeft: "4px",
                        color: "black",
                      }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
