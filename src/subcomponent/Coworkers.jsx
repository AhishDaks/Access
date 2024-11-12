import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { filterDesiredUser } from "../services/filteringUsers";
export default function Coworkers() {
  const Navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.loggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      Navigate("/");
    }
  }, []);

  const { id } = useParams();

  const fetchDesiredUser = useSelector((state) => state.user.data);
  if (!isLoggedIn.managerId && !isLoggedIn.employees) {
    return (
      <div
        style={{
          width: "95%",
          height: "300px",
          marginLeft: "5%",
          marginTop: "50px",

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
            }}
          >
            Nothing to show
          </div>
        </center>
      </div>
    );
  }
  const detailsPageUser = filterDesiredUser(fetchDesiredUser, id);

  const managerDetails = fetchDesiredUser.filter(
    (a) => a.id === detailsPageUser[0].managerId,
  );
  let employeesUnder;

  let coWorkers;
  if (detailsPageUser[0].isManager) {
    let name = detailsPageUser[0].employees.map((a) =>
      fetchDesiredUser.filter((b) => a === b.id),
    );

    employeesUnder = name.map((a) => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid gray",
          marginBottom: "3px",
          width: "80%",
          marginLeft: "10%",
        }}
        key={a[0].id}
      >
        <Link
          className="link"
          to={`/main/${a[0].id}`}
        >
          {a[0].name}
        </Link>
        <div>{a[0].id}</div>
      </div>
    ));
  } else {
    let u = managerDetails[0].employees.filter(
      (a) => a !== detailsPageUser[0].id,
    );
    let uu = u.map((a) => fetchDesiredUser.filter((b) => a === b.id));

    coWorkers = uu.map((o) => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid gray",
          width: "auto",
          marginTop: "3px",
        }}
        key={o[0].id}
      >
        <div>{o[0].name}</div>
        <div>{o[0].id}</div>
      </div>
    ));
  }
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#f5f5f0",
        height: "auto",
        marginLeft: "5%",
        marginTop: "100px",
        borderRadius: "5px",
      }}
    >
      {!detailsPageUser[0].isManager && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <b>MANAGER NAME:</b>{" "}
          </div>
          <div>{managerDetails[0].name}</div>
        </div>
      )}
      {!detailsPageUser[0].isManager ? (
        <div>
          <b>CO-WORKERS</b>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              marginLeft: "10%",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <b>NAME</b>
              </div>
              <div>
                <b>ID</b>
              </div>
            </div>
            {coWorkers}
          </div>
        </div>
      ) : (
        <div>
          <b style={{ display: "flex" }}>EMPLOYEES UNDER:</b>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: "3%",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  marginLeft: "10%",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <b>NAME</b>
                </div>
                <div>
                  <b>ID</b>
                </div>
              </div>
              <div>{employeesUnder}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
