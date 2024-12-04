import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import ReassignModal from "./ReAssignModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  maxHeight: "400px",
  overflowY: "auto",
  overflowX: "hidden",
  border: "1px solid gray",
  borderRadius: "10px",
  boxShadow: 20,
  p: 4,
};

export default function ReassigningTask({ value }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const tasks = useSelector((state) => state.task.taskData);
  const loggedIn = useSelector((state) => state.loggedIn);
  const employeesUnder = loggedIn.employees;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();

  const incompletedTasks = tasks.filter((a) => {
    if (employeesUnder.includes(a.assignedTo)) {
      if (a.status !== "COMPLETED") {
        let duedate = a.dueDate.split("-");

        if (parseInt(duedate[2]) <= currentYear) {
          if (parseInt(duedate[1]) < currentMonth) {
            return a;
          } else if (parseInt(duedate[1]) === currentMonth) {
            if (parseInt(duedate[0]) < currentDate) {
              return a;
            }
          }
        }
      }
    }
  });

  const incompletedTasksListsForDisplaying = incompletedTasks.map((a) => (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "50px",
        border: "1px solid gray",
        borderRadius: "5px",
        marginBottom: "5px",
      }}
    >
      <div
        style={{
          width: "80%",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      >
        {a.title}
      </div>
      <div
        style={{
          width: "20%",
          marginLeft: "100px",
          marginTop: "10px",
        }}
      >
        <ReassignModal
          value={a.description}
          currentyAssigned={a.assignedTo}
        />
      </div>
    </div>
  ));
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
          <div
            style={{
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            <b>TASKS INCOMPLETED IN DUETIME</b>
          </div>
          {incompletedTasksListsForDisplaying}
        </Box>
      </Modal>
    </div>
  );
}
