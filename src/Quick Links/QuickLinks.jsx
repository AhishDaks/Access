import AddTaskIcon from "@mui/icons-material/AddTask";
import { GrUpdate } from "react-icons/gr";
import CreateTaskModal from "./CreateTaskModal";
import FormControlLabel from "@mui/material/FormControlLabel";
import UpdateEmployee from "./UpdateEmployee";
import Checkbox from "@mui/material/Checkbox";
import ReassigningTask from "./Reassig-Task";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { useSelector } from "react-redux";

export default function QuickLink() {
  const isLoggedin = useSelector((state) => state.loggedIn);
  const employeeTasks = useSelector((state) => state.employeeUnder);
  const addEmployee = useSelector((state) => state.noManagerEmployee);
  const tasks = useSelector((state) => state.task.taskData);
  let listOfNoManagerEmployees;
  if (addEmployee !== null) {
    listOfNoManagerEmployees = addEmployee.map((a) => (
      <div key={a.id}>
        <FormControlLabel
          label={a.name}
          control={
            <Checkbox
              value={a.id}
              id={a._id}
            />
          }
        />
      </div>
    ));
  }

  if (!isLoggedin.isManager) {
    return <div></div>;
  }
  return (
    <div
      style={{
        width: "25%",
        marginTop: "97px",
        marginRight: "30px",
      }}
    >
      <div>
        <b>QUICK LINKS</b>
        <div
          style={{
            margin: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {employeeTasks !== null ? (
            <div>
              <CreateTaskModal value={<AddTaskIcon />} />

              <div style={{ marginTop: "10px" }}>Create Task</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div>
        <div
          style={{
            marginTop: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <UpdateEmployee
            value={<GrUpdate size="20" />}
            data={listOfNoManagerEmployees}
          />
          <div>Add Employee</div>
        </div>
      </div>
      <div>
        {tasks !== null ? (
          <div
            style={{
              marginTop: "20%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ReassigningTask value={<TransferWithinAStationIcon />} />
            <div>Reassign Task</div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
