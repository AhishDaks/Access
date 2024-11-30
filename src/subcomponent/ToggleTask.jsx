import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { useSelector } from "react-redux";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DetailsModal from "../Modal/ModalForTaskDesc";
import { useState } from "react";
export default function ToggleTask({ value }) {
  const [alignment, setAlignment] = useState("myTasks");
  const [detailsModal, setDetailsModal] = useState(false);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const managerTasks = useSelector((state) => state.loggedInTask);

  const listManagerTasks =
    managerTasks !== null ? (
      managerTasks.map((s) => (
        <div
          style={{
            marginLeft: "20px",
            marginRight: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            border: "2px solid gray",
            borderRadius: "5px",
            width: "90%",
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
                onClick={(s) => setDetailsModal(s._id)}
                id={s._id}
                desc={s}
              />
            </div>
          </div>
        </div>
      ))
    ) : (
      <div style={{ color: "gray" }}>No Tasks Assigned</div>
    );

  const overAllTasks =
    value !== null
      ? value.map((s) => (
          <div
            style={{
              marginLeft: "20px",
              marginRight: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              border: "2px solid gray",
              borderRadius: "5px",
              width: "90%",
              height: "auto",
              textAlign: "center",
            }}
            key={s._id}
          >
            <div
              style={{ width: "50%", marginTop: "8px", marginBottom: "20px" }}
            >
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
                  onClick={(s) => setDetailsModal(s._id)}
                  id={s._id}
                  desc={s}
                />
              </div>
            </div>
          </div>
        ))
      : "no";

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        style={{ height: "30px", marginTop: "10px" }}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="myTasks">My Task</ToggleButton>
        <ToggleButton value="overalltasks">Employee Tasks</ToggleButton>
      </ToggleButtonGroup>
      {alignment === "overalltasks" ? (
        <div style={{ marginTop: "20px" }}>{overAllTasks}</div>
      ) : (
        <div style={{ marginTop: "20px" }}>{listManagerTasks}</div>
      )}
    </div>
  );
}
