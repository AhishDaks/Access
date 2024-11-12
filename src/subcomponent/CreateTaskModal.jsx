import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { addTask } from "../store/store";
import { useSelector } from "react-redux";
import { addNewTask } from "../services/taskDetails";
import { fetchTask } from "../services/taskDetails";
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

export default function CreateTaskModal({ value }) {
  const Dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const employeesForCurrentLoggedIn = useSelector(
    (state) => state.employeeUnder,
  );
  const dropDownEmployee = employeesForCurrentLoggedIn.map((a) => (
    <option
      value={[a._id, a.id]}
      key={a.id}
    >
      {a.name}
    </option>
  ));
  const [employee, setEmployee] = React.useState("");
  const [taskTitle, setTaskTitle] = React.useState("");
  const [taskDesc, setTaskDesc] = React.useState("");
  let [dueDate, setDueDate] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  async function uploadNewTask(e) {
    e.preventDefault();
    dueDate = `${dueDate.split("-").reverse().join("-")}`;
    const currentDate = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;
    let apiPostData = {
      title: taskTitle,
      description: taskDesc,
      assignedTo: employee.split(",")[1],
      status: "ASSIGNED",
      createdDate: currentDate,
      dueDate,
    };
    await addNewTask(apiPostData);
    let updatedtasks = await fetchTask();
    Dispatch(addTask(updatedtasks));
    handleClose();
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
        <Box sx={style}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <form onSubmit={uploadNewTask}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ marginTop: "15px" }}> ASSIGN TO:</div>
                <select
                  style={{
                    width: "210px",
                    height: "57px",
                    border: "1px solid gray",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => setEmployee(e.target.value)}
                >
                  <option>Choose Employee</option>
                  {dropDownEmployee}
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: "25px",
                }}
              >
                <div style={{ marginTop: "15px" }}>TASK TITLE:</div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  required
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: "25px",
                }}
              >
                <div style={{ marginTop: "15px" }}>TASK DESC:</div>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => setTaskDesc(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: "25px",
                }}
              >
                <div style={{ marginTop: "15px", marginLeft: "2px" }}>
                  DUE DATE:
                </div>
                <div>
                  <input
                    required
                    type="date"
                    style={{
                      width: "210px",
                      height: "57px",
                      border: "1px solid gray",
                      borderRadius: "5px",
                      marginLeft: "10px",
                    }}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
              <Button
                style={{ marginLeft: "150px", marginTop: "20px" }}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
