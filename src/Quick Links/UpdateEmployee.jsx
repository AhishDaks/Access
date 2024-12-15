import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { updateUser } from "../services/userdetails";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../services/userdetails";
import {
  addDesiredEmployee,
  addUser,
  fetchnoManagerEmployee,
  addLoggedIn,
} from "../store/store";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateEmployee({ value, data }) {
  const [render, setRender] = useState(false);
  const [open, setOpen] = useState(false);
  const [buttonInAddEmployee, setButtonInAddEmployee] = useState(false);
  let idUpdation = {};
  const [alert, setAlert] = useState(" ");

  const Dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
    setRender(!render);
  };
  const handleClose = () => {
    setAlert("");
    setButtonInAddEmployee(false);
    setOpen(false);
    setRender(!render);
  };

  const loggedIn = useSelector((state) => state.loggedIn);
  function handleChange(e) {
    e.preventDefault();
    if (idUpdation[e.target.value]) {
      delete idUpdation[e.target.value];
    } else {
      idUpdation[e.target.value] = e.target.id;
    }
  }

  async function updation() {
    let employeeId = Object.keys(idUpdation).map((a) => parseInt(a));
    if (!employeeId.length) {
      setAlert(
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="error"
        >
          select minimum 1 employee
        </Alert>,
      );
      return;
    }
    let existingEmployees =
      loggedIn.employees === null ? [] : loggedIn.employees;

    let apipatch = [];
    let update = Object.values(idUpdation);
    for (let i = 0; i < update.length; i++) {
      let apiPostData = { managerId: loggedIn.id };
      let updateEmployeeManager = Promise.resolve(
        updateUser(apiPostData, update[i]),
      );

      apipatch.push(updateEmployeeManager);
    }

    Promise.all(apipatch)
      .then(async () => {
        await updateUser(
          { employees: [...existingEmployees, ...employeeId] },
          loggedIn._id,
        );
        setAlert(
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
          >
            Succesfully assigned
          </Alert>,
        );
        handleClose();
        setButtonInAddEmployee(true);
        let userResult = await fetchUsers();
        let employeesData = userResult.filter(
          (a) => a.managerId === loggedIn.id,
        );
        let UpdatedLoggedInData = userResult.filter(
          (a) => a.id === loggedIn.id,
        );
        const noMangerEmployees = userResult.filter(
          (a) => a.managerId === null && !a.isManager,
        );
        Dispatch(addLoggedIn(...UpdatedLoggedInData));
        Dispatch(fetchnoManagerEmployee(noMangerEmployees));
        Dispatch(addUser(userResult));
        Dispatch(addDesiredEmployee(employeesData));
      })
      .catch(() => {
        setAlert(
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="error"
          >
            error in assigning
          </Alert>,
        );
      });
  }
  return (
    <div>
      <Button onClick={handleOpen}>{value}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          onChange={handleChange}
        >
          {alert}
          <center>
            {!data.length ? (
              <div style={{ fontSize: "large" }}>
                <div>
                  <b>no employees found</b>
                </div>
              </div>
            ) : (
              <div
                style={{
                  marginTop: "10px",
                  maxHeight: "500px",
                  overflow: "auto",
                }}
              >
                {data}
                <div style={{ marginTop: "20px" }}>
                  {buttonInAddEmployee === true ? (
                    <div>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                      >
                        continue
                      </Button>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "30%",
                      }}
                    >
                      <Button
                        onClick={updation}
                        variant="contained"
                      >
                        ADD
                      </Button>
                      <Button
                        style={{ marginLeft: "10px" }}
                        onClick={handleClose}
                        variant="contained"
                      >
                        CANCEL
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </center>
        </Box>
      </Modal>
    </div>
  );
}
