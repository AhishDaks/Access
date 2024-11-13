import { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fetchUsers } from "../services/userdetails";
import { fetchTask } from "../services/taskDetails";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterDesiredUser } from "../services/filteringUsers";
import "@fontsource/roboto/500.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  addUser,
  addLoggedIn,
  addTask,
  addDesiredEmployee,
} from "../store/store";
import Signup from "../subcomponent/Signup";
export default function Login() {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [render, setRender] = useState(false);
  const [loader, setLoader] = useState(false);
  const Dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loggedIn);

  const Navigate = useNavigate();

  async function Authentication(e) {
    setLoader(true);
    e.preventDefault();

    const userResult = await fetchUsers();
    const taskResult = await fetchTask();
    Dispatch(addUser(userResult));
    Dispatch(addTask(taskResult));

    setRender(!render);

    const t = userResult.filter(
      (a) => a.email === mail && a.password === password,
    );

    if (!t.length) {
      setLoader(false);
      setError(true);
    } else {
      setTimeout(() => setLoader(false), 5000);
      setError(false);

      Dispatch(addLoggedIn(...t));
      if (t[0].isManager === true) {
        let employeesData = t[0].employees.map((a) =>
          filterDesiredUser(userResult, a),
        );

        Dispatch(addDesiredEmployee(employeesData));
      }

      Navigate(`/main/${t[0].id}`);
    }
  }

  return (
    <div>
      {loader ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            marginTop: "25%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="loginBody">
          {isLoggedIn ? (
            <div style={{ marginTop: "18%", width: "50%" }}>
              <div style={{ marginLeft: "0px" }}>
                <div
                  style={{
                    fontSize: "medium",

                    height: "auto",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  <div>
                    Already logged in as <b>{isLoggedIn.name}</b>
                  </div>
                  <br></br>
                  <b>click here to continue</b>

                  <div>
                    <br></br>
                    <Button
                      style={{ width: "80px", height: "20px" }}
                      variant="contained"
                      onClick={() => Navigate(`main/${isLoggedIn.id}`)}
                    >
                      continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
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

              <Signup />
            </div>
          )}
          <div className="secondHalf">
            <div className="logoTech">
              <i>
                <b>TECH GLOBAL</b>
              </i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
