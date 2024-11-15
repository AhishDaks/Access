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
  let PageDataUser = true;
  if (isLoggedInManager.employees) {
    PageDataUser = isLoggedInManager.employees.includes(parseInt(id));
  }
  console.log(PageDataUser, id);

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
  let overAllTasksforManager;
  if (!PageDataUser) {
    overAllTasksforManager = overAllTaskLists.filter((a) =>
      isLoggedInManager.employees.includes(a.assignedTo),
    );
  }
  const listOftasks = tasksList.map((s) => (
    <div
      style={{
        marginLeft: "0px",
        marginRight: "10px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        border: "2px solid gray",
        borderRadius: "5px",
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
        overflowX: "hidden",
        maxHeight: "490px",
        overflow: "auto",
        border: "1px solid gray",
        borderRadius: "5px",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <b>Tasks</b>
      </div>
      {PageDataUser === false ? (
        <ToggleTask value={overAllTasksforManager} />
      ) : (
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
      )}
    </div>
  );
}
