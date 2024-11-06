import { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserDetails } from "../store/userdetails";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  UserDetails();
  const Navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  function Authentication(e) {
    e.preventDefault();

    const t = users.filter((a) => a.email == mail && a.password == password);

    if (!t.length) {
      setError(true);
    } else {
      setError(false);
      let loggedIn = JSON.stringify(t[0]);
      localStorage.setItem("loggedInUser", loggedIn);
      Navigate(`/main/${t[0].id}`);
    }
  }

  return (
    <div className="loginBody">
      <div className="firstHalf">
        <div className="login">
          <form onSubmit={(e) => Authentication(e, mail, password)}>
            <div className="loginform">
              <div
                style={{
                  marginLeft: "38%",
                  display: "flex",
                  flexDirection: "column",
                  width: "auto",
                }}
              >
                <b>WELCOME</b>
              </div>
              {error && (
                <p style={{ textAlign: "center", color: "red" }}>
                  <b>Invalid Username or password</b>
                </p>
              )}
              <br></br>
              <div className="loginTextField">
                <div>
                  <IoIosMail className="loginIcon" />
                </div>
                <TextField
                  required
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br></br>
              <div className="loginTextField">
                <div>
                  <RiLockPasswordFill className="loginIcon" />
                </div>
                <TextField
                  required
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <br></br>
              <Button
                variant="contained"
                type="submit"
                style={{ margin: "auto", backgroundColor: " #4d79ff" }}
              >
                {" "}
                LOG IN
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="secondHalf">
        <div className="logoTech">
          <i>
            <b>TECH GLOBAL</b>
          </i>
        </div>
      </div>
    </div>
  );
}
