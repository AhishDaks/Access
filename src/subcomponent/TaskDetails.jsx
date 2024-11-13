import { useSelector } from "react-redux";
import ToggleTask from "./ToggleTask";
import { useParams } from "react-router-dom";
import { useState } from "react";
import DetailsModal from "../Modal/ModalForTaskDesc";
export default function TaskDetails() {
  const [open, setOpen] = useState();
  const { id } = useParams();
  const overAllTaskLists = useSelector((state) => state.task.taskData);
  const isLoggedInManager = useSelector((state) => state.loggedIn);

  if (overAllTaskLists === null) {
    return (
      <div
        style={{
          backgroundColor: "#f5f5f0",
          marginTop: "13%",
          marginLeft: "10%",
          marginRight: "3%",
          borderRadius: "10px",
          width: "70%",
          height: "450px",
        }}
      >
        <b>NOTHING TO DISPLAY</b>
      </div>
    );
  }
  const tasksList = overAllTaskLists.filter(
    (a) => a.assignedTo === parseInt(id),
  );
  const listOftasks = tasksList.map((s) => (
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
            onClick={(s) => setOpen(s._id)}
            id={s._id}
            desc={s}
          />
        </div>
      </div>
    </div>
  ));
  return (
    <div
      style={{
        backgroundColor: "#f5f5f0",
        marginTop: "13%",
        marginLeft: "10%",
        marginRight: "3%",
        width: "70%",
        height: "440px",
        overflow: "auto",
      }}
    >
      {isLoggedInManager.isManager === true ? <ToggleTask /> : <p></p>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        {listOftasks}
      </div>
    </div>
  );
}
