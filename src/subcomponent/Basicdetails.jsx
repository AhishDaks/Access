import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export default function BasicDetails() {
  const { id } = useParams();
  const fetchDesiredUser = useSelector((state) => state.user.data);
  console.log(fetchDesiredUser);
  const detailsPageUser = fetchDesiredUser.filter((a) => a.id === parseInt(id));

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <div style={{ marginTop: "10%", width: "150px", marginBottom: "5px" }}>
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
            <div>
              <b>*********</b>
            </div>
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
    </div>
  );
}
