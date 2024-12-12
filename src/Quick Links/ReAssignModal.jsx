import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { updateTask } from "../services/taskDetails";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import { addTask } from "../store/store";
import { useDispatch } from "react-redux";
import { fetchTask } from "../services/taskDetails";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: " auto",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ReassignModal({
  value,
  currentlyAssigned,
  modalClose,
}) {
  const [open, setOpen] = useState(false);

  let [newDueDate, setNewDueDate] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [successButton, setSuccessButton] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);

  const Dispatch = useDispatch();
  const handleCloseProgress = () => {
    setOpenProgress(false);
  };
  const handleOpenProgress = () => {
    setOpenProgress(true);
  };

  const handleOpen = () => setOpen(true);
  const [name, setName] = useState("");
  const handleClose = () => {
    setOpen(false);

    setAlertMsg("");
    setName("");
    setNewDueDate("");
    setSuccessButton(false);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const employeeUnder = useSelector((state) => state.employeeUnder);

  const currentlyAssignedTaskEmployee = employeeUnder.filter(
    (a) => a.id !== currentlyAssigned,
  );

  const newAssigningEmployeeList = currentlyAssignedTaskEmployee.map((a) => {
    return (
      <MenuItem
        key={a.id}
        value={a.id}
      >
        {a.name}
      </MenuItem>
    );
  });

  async function handleRecentChanges(e) {
    e.preventDefault();
    const newTasks = await fetchTask();
    Dispatch(addTask(newTasks));
    modalClose();
  }

  function handleChangeEmployee(e) {
    e.preventDefault();

    const currentDate = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;

    const newDue = `${newDueDate}`.split("-").reverse().join("-");
    const apiPostData = { assignedTo: name, dueDate: newDue };

    if (parseInt(currentDate.split("-")[2]) < parseInt(newDue.split("-")[2])) {
    } else if (
      parseInt(currentDate.split("-")[2]) === parseInt(newDue.split("-")[2])
    ) {
      if (
        parseInt(currentDate.split("-")[1]) < parseInt(newDue.split("-")[1])
      ) {
      } else if (
        parseInt(currentDate.split("-")[1]) === parseInt(newDue.split("-")[1])
      ) {
        if (
          parseInt(currentDate.split("-")[0]) < parseInt(newDue.split("-")[0])
        ) {
        } else {
          setAlertMsg(
            <Alert severity="error">Due Date should be an upcoming Date</Alert>,
          );

          return;
        }
      } else {
        setAlertMsg(
          <Alert severity="error">Due Date should be an upcoming Date</Alert>,
        );

        return;
      }
    } else {
      setAlertMsg(
        <Alert severity="error">Due Date should be an upcoming Date</Alert>,
      );

      return;
    }

    handleOpenProgress();
    Promise.resolve(updateTask(value, apiPostData))
      .then(async () => {
        setAlertMsg(
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
          >
            Reassigned successfully
          </Alert>,
        );
        handleCloseProgress();
        setSuccessButton(true);
      })
      .catch(() => {
        setAlertMsg(
          <Alert severity="error">Error in assigning.Try again later</Alert>,
        );
        handleCloseProgress();
      });
  }

  return (
    <div>
      <Button onClick={handleOpen}>Assign</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!currentlyAssignedTaskEmployee.length ? (
            <div>No Employee is available to reassign Task</div>
          ) : (
            <div>
              {alertMsg}
              {successButton ? (
                <Button
                  style={{ marginTop: "40px", marginLeft: "150px" }}
                  variant="contained"
                  onClick={handleRecentChanges}
                >
                  Continue
                </Button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>Assigned To:</div>
                      <div>{currentlyAssigned}</div>
                    </div>
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "35px",
                    }}
                  >
                    <div style={{ marginTop: "22px" }}>Choose new Employee</div>
                    <FormControl
                      sx={{ m: 1, minWidth: 180 }}
                      onSubmit={handleChangeEmployee}
                    >
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={name}
                        label="Name"
                        onChange={handleChange}
                      >
                        {newAssigningEmployeeList}
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ marginTop: "10px", width: "50%" }}>
                      New Due Date
                    </div>
                    <div style={{ width: "50%" }}>
                      <input
                        type="date"
                        style={{
                          width: "178px",
                          height: "55px",
                          border: "1px solid ",
                          borderRadius: "5px",
                          marginLeft: "12px",
                        }}
                        onChange={(e) => setNewDueDate(e.target.value)}
                      />
                    </div>
                  </div>
                  {name && newDueDate.length >= 1 ? (
                    <div>
                      <Button
                        onClick={handleChangeEmployee}
                        style={{
                          width: "80px",
                          marginLeft: "35%",
                          marginTop: "30px",
                        }}
                        variant="contained"
                      >
                        Submit
                      </Button>
                      <Backdrop
                        sx={(theme) => ({
                          color: "#fff",
                          zIndex: theme.zIndex.drawer + 1,
                        })}
                        open={openProgress}
                        onClick={handleCloseProgress}
                      >
                        <CircularProgress color="inherit" />
                      </Backdrop>
                    </div>
                  ) : (
                    <Button disabled>Submit</Button>
                  )}
                </div>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
