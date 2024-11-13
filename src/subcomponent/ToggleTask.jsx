import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSelector } from "react-redux";
import DetailsModal from "../Modal/ModalForTaskDesc";
export default function ToggleTask() {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const employeeUnder = useSelector((state) => state.employeeUnder);
  const tasks = useSelector((state) => state.task.taskData);
  let employeeTasks = {};
  for (let i = 0; i < employeeUnder.length; i++) {
    let a = tasks.filter((a) => a.assignedTo === employeeUnder[i].id);

    employeeTasks[employeeUnder[i].name] = [...a];
  }
  let listOftasks = [];
  for (let i = 0; i < Object.keys(employeeTasks).length; i++) {
    listOftasks.push(
      employeeTasks[Object.keys(employeeTasks)[i]].map((s) => (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid black",
            width: "100%",
            height: "auto",
            textAlign: "center",
          }}
          key={s._id}
        >
          <div style={{ width: "50%", marginTop: "8px", marginBottom: "20px" }}>
            {s.title}
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <b>{s.status}</b>
            </div>

            <div>
              <DetailsModal
                style={{
                  height: "20px",
                  width: "80px",
                  backgroundColor: "#4d79ff",
                  color: "#ebebe0",
                }}
                onClick={(s) => s._id}
                id={s._id}
                desc={s}
              />
            </div>
          </div>
        </div>
      )),
    );
  }
  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        style={{ height: "20px", marginTop: "10px" }}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="web">My Task</ToggleButton>
        <ToggleButton value="android">Employee Tasks</ToggleButton>
      </ToggleButtonGroup>
      <div>{listOftasks}</div>
    </div>
  );
}
