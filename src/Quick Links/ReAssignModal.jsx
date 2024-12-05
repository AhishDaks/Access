import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ReassignModal({ value, currentlyAssigned }) {
  const [open, setOpen] = useState(false);
  let [newDueDate, setNewDueDate] = useState("");
  const handleOpen = () => setOpen(true);
  const [name, setName] = useState("");
  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const employeeUnder = useSelector((state) => state.employeeUnder);

  const currentlyAssignedTaskEmployee = employeeUnder.filter(
    (a) => a.id !== currentlyAssigned,
  );

  const newAssigningEmployeeList = currentlyAssignedTaskEmployee.map((a) => {
    return <MenuItem value={a.name}>{a.name}</MenuItem>;
  });

  function handleChangeEmployee(e) {
    e.preventDefault();

    const currentDate = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;

    const newDue = `${newDueDate}`.split("-").reverse().join("-");

    if (parseInt(currentDate.split("-")[2]) < parseInt(newDue.split("-")[2])) {
      console.log("you can assign");
    } else if (
      parseInt(currentDate.split("-")[2]) === parseInt(newDue.split("-")[2])
    ) {
      if (
        parseInt(currentDate.split("-")[1]) < parseInt(newDue.split("-")[1])
      ) {
        console.log("you can assign");
      } else if (
        parseInt(currentDate.split("-")[1]) === parseInt(newDue.split("-")[1])
      ) {
        if (
          parseInt(currentDate.split("-")[0]) < parseInt(newDue.split("-")[0])
        ) {
          console.log("you can assign");
        } else {
          console.log("you cant assign");
        }
      } else {
        console.log("you cant assign");
      }
    } else {
      console.log("you cant assign");
    }

    console.log(currentDate.split("-"), newDue.split("-"));
  }
  return (
    <div>
      <Button onClick={handleOpen}>AssigN</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                  required
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
            <Button
              style={{ width: "80px", marginLeft: "35%", marginTop: "30px" }}
              variant="contained"
              onClick={handleChangeEmployee}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
