import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Coworkers() {
  const Navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.loggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      Navigate("/");
    }
  }, []);

  const { id } = useParams();
  let empUnderManager = useSelector((state) => state.employeeUnder);
  const fetchDesiredUser = useSelector((state) => state.user.data);
  let coWorkersList = useSelector((state) => state.coWorker);
  const pageUserData = fetchDesiredUser.filter((a) => a.id === parseInt(id));
  const ManagerName = fetchDesiredUser.find(
    (a) => a.id === pageUserData[0].managerId,
  );
  if (!coWorkersList && !empUnderManager) {
    return (
      <div
        style={{
          width: "95%",
          height: "300px",
          marginLeft: "35px",
          marginTop: "50px",
          border: "1px solid gray",
          borderRadius: "5px",
          backgroundColor: "#f5f5f0",
        }}
      >
        {" "}
        <center>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "130px",
              fontSize: "large",
            }}
          >
            <b> No coworkers or employees under him</b>
          </div>
        </center>
      </div>
    );
  }

  let employeesUnder;

  let coWorkers;
  if (isLoggedIn.isManager) {
    employeesUnder = empUnderManager.map((a) => {
      if (a.id !== parseInt(id)) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "3px",
              width: "80%",
              maxheight: "50px",
              border: "2px solid gray",
              borderRadius: "5px",
              padding: "10px",
              marginLeft: "40px",
            }}
            key={a.id}
          >
            <div
              style={{
                width: "15%",
                textAlign: "left",
                marginLeft: "0px",
                display: "flex",
              }}
            >
              <AccountCircleIcon />
              <div style={{ marginTop: "3px", marginLeft: "3px" }}>
                <b>{a.name}</b>
              </div>
            </div>
            <div>{a.id}</div>
            <Link
              className="link"
              to={`/main/${a.id}`}
            >
              <Button
                variant="contained"
                style={{ height: "30px" }}
              >
                {" "}
                View
              </Button>
            </Link>
          </div>
        );
      }
    });
  } else {
    let uu = coWorkersList.filter((a) => a.id !== parseInt(id));

    coWorkers = uu.map((o) => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "2px solid gray",
          width: "100%",
          marginTop: "10px",
          height: "50px",

          borderRadius: "5px",
        }}
        key={o.id}
      >
        <div style={{ display: "flex", marginTop: "15px" }}>
          <AccountCircleIcon />{" "}
          <div style={{ marginLeft: "3px", marginTop: "2px" }}>
            <b>{o.name}</b>
          </div>
        </div>
        <div
          style={{ color: "#4d79ff", marginTop: "12px", marginRight: "5px" }}
        >
          {" "}
          {o.id}
        </div>
      </div>
    ));
  }
  return (
    <div
      style={{
        width: "94%",
        height: "250px",
        overflowY: "auto",
        backgroundColor: " #f5f5f0",
        marginLeft: "5%",
        marginTop: "100px",
        border: "1px solid grey",
        borderRadius: "5px",
      }}
    >
      {!isLoggedIn.isManager ? (
        <div style={{ padding: "2px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "25px",
              marginRight: "25px",
              marginBottom: "10px",
            }}
          >
            <div>
              <b>Manager</b>
            </div>
            <div>
              <b>{ManagerName.name}</b>
            </div>
          </div>
          <b>CO-WORKERS</b>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              marginLeft: "50px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            ></div>
            {coWorkers}
          </div>
        </div>
      ) : (
        <div>
          <b style={{ display: "flex" }}>EMPLOYEES </b>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: "3%",
              height: "150px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "70%",
                  marginLeft: "10%",
                  marginBottom: "10px",
                }}
              ></div>
              <div>{employeesUnder}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
