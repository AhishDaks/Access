import AddTaskIcon from "@mui/icons-material/AddTask";
import { GrUpdate } from "react-icons/gr";
import CreateTaskModal from "../Modal/CreateTaskModal";
import UpdateEmployee from "../Modal/UpdateEmployee";
import { useSelector } from "react-redux";
export default function QuickLink() {
  const employeeTasks = useSelector((state) => state.employeeUnder);
  if (employeeTasks === null) {
    return <div></div>;
  }
  return (
    <div
      style={{
        backgroundColor: "#f5f5f0",
        width: "25%",
        height: "450px",
        marginTop: "97px",
        marginRight: "30px",
      }}
    >
      <b>QUICK LINKS</b>
      <div
        style={{
          margin: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CreateTaskModal value={<AddTaskIcon />} />

        <div style={{ marginTop: "10px" }}>Create Task</div>
      </div>
      <div
        style={{
          margin: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <UpdateEmployee value={<GrUpdate size="20" />} />
        <div style={{ marginTop: "10px" }}>Update Employee</div>
      </div>
    </div>
  );
}
