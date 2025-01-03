import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filterDesiredUser } from "../services/filteringUsers";
import { RiEditFill } from "react-icons/ri";
import UpdatePassword from "../Modal/UpdatePassword";
export default function BasicDetails() {
  const { id } = useParams();
  const fetchDesiredUser = useSelector((state) => state.user.data);
  const detailsPageUser = filterDesiredUser(fetchDesiredUser, id);
  const loggedIn = useSelector((state) => state.loggedIn);
  const editPasswordAllowance = detailsPageUser[0].id === loggedIn.id;

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
            border: "1px solid gray",
            justifyContent: "space-evenly",
          }}
        >
          <div className="BasicDetails">
            <div>
              <b>Name</b>{" "}
            </div>
            <div>{detailsPageUser[0].name}</div>
          </div>
          <div className="BasicDetails">
            <div>
              <b>Employee ID</b>{" "}
            </div>
            <div>{detailsPageUser[0].id}</div>
          </div>
          <div className="BasicDetails">
            <div>
              <b>Email</b>{" "}
            </div>
            <div>{detailsPageUser[0].email}</div>
          </div>
          <div className="BasicDetails">
            <div>
              <b>Password </b>
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: "120px",
              }}
            >
              <div>*******</div>
              {editPasswordAllowance ? (
                <div>
                  {" "}
                  <UpdatePassword
                    size="10px"
                    value={<RiEditFill />}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="BasicDetails">
            <div>
              <b>Age</b>{" "}
            </div>
            <div>{detailsPageUser[0].age}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
