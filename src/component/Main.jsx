import Header from "../Header&Footer/Header";
import Footer from "../Header&Footer/Footer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styling/basic.css";
export default function Main() {
  const { id } = useParams();

  const fetchDesiredUser = useSelector((state) => state.user.users);
  const detailsPageUser = fetchDesiredUser.filter((a) => a.id == id);
  console.log(detailsPageUser[0]);

  console.log(fetchDesiredUser);
  if (!detailsPageUser) {
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
            backgroundColor: "#809fff",
          }}
        >
          <div
            style={{
              width: "auto",
              backgroundColor: "#99b3ff",
              height: "200px",
              marginLeft: "20%",
              marginTop: "10%",
              marginRight: "20%",
              borderRadius: "5px",
              border: "1px solid  #b3c6ff",
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
              <div>{detailsPageUser[0].name.toUpperCase()}</div>
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
          <div
            style={{
              width: "60%",
              backgroundColor: "#809fff",
              height: "200px",
              marginLeft: "20%",
              marginTop: "10%",
              borderRadius: "5px",
              border: "1px solid gray",
            }}
          ></div>
        </div>
        <div style={{ width: "50%", backgroundColor: " #b3c6ff" }}></div>
      </div>
      <Footer />
    </div>
  );
}
