import Header from "../Header&Footer/Header";
import Footer from "../Header&Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styling/basic.css";
export default function Main() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.length <= 0) {
      Navigate("/login");
    }
  }, []);

  const { id } = useParams();

  const fetchDesiredUser = useSelector((state) => state.user.users);
  const detailsPageUser = fetchDesiredUser.filter((a) => a.id == id);
  const ManagerDetails = fetchDesiredUser.filter(
    (a) => a.id == detailsPageUser[0].managerId,
  );
  let employeesUnder;

  let coWorkers;
  if (detailsPageUser[0].isManager) {
    let name = detailsPageUser[0].employees.map((a) =>
      fetchDesiredUser.filter((b) => a == b.id),
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
  }

  return (
    <div style={{ width: "100%", backgroundColor: "#b3cccc", height: "100vh" }}>
      <Header />
      <div
        className="userDetails"
        style={{ height: `${window.innerHeight}px` }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ebebe0",
          }}
        >
          <div>
            <div
              style={{ marginTop: "10%", width: "150px", marginBottom: "5px" }}
            >
              <b>DETAILS</b>
            </div>
            <div
              style={{
                width: "auto",
                backgroundColor: "#f5f5f0",
                height: "200px",
                marginLeft: "5%",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3px",
                }}
              >
                <div>
                  <b>NAME</b>{" "}
                </div>
                <div>{detailsPageUser[0].name}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3px",
                }}
              >
                <div>
                  <b>EMPLOYEE ID</b>{" "}
                </div>
                <div>{detailsPageUser[0].id}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3px",
                }}
              >
                <div>
                  <b>EMAIL</b>{" "}
                </div>
                <div>{detailsPageUser[0].email}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3px",
                }}
              >
                <div>
                  <b>PASSWORD </b>
                </div>
                <div>{detailsPageUser[0].password}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3px",
                }}
              >
                <div>
                  <b>AGE</b>{" "}
                </div>
                <div>{detailsPageUser[0].age}</div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "auto",
              backgroundColor: "#f5f5f0",
              height: "auto",
              marginLeft: "5%",
              marginTop: "10%",
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
                <div>{ManagerDetails[0].name}</div>
              </div>
            )}
            {!detailsPageUser[0].isManager ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3px",
                }}
              >
                <div>
                  <b>CO-WORKERS:</b>{" "}
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
        </div>
        <div style={{ width: "50%", backgroundColor: "	 #ebebe0" }}></div>
      </div>
      <Footer />
    </div>
  );
}
