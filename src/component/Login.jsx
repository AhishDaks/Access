import { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fetchUsers } from "../services/userdetails";
import { fetchTask } from "../services/taskDetails";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "@fontsource/roboto/500.css";
import IconButton from "@mui/material/IconButton";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import {
  addUser,
  addLoggedIn,
  addTask,
  addDesiredEmployee,
  addLoggedInTask,
  addCoWorker,
  fetchnoManagerEmployee,
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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
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

    const noMangerEmployees = userResult.filter(
      (a) => a.managerId === null && !a.isManager,
    );

    Dispatch(fetchnoManagerEmployee(noMangerEmployees));

    if (!t.length) {
      setLoader(false);
      setError(true);
    } else {
      setTimeout(() => setLoader(false), 5000);
      setError(false);
      const loggedInTasks = taskResult.filter((a) => a.assignedTo === t[0].id);

      Dispatch(addLoggedIn(...t));
      Dispatch(addLoggedInTask(loggedInTasks));
      if (t[0].isManager === true) {
        let employeesData = userResult.filter((a) => a.managerId === t[0].id);

        Dispatch(addDesiredEmployee(employeesData));
      } else {
        let employeesData = userResult.filter(
          (a) => a.managerId === t[0].managerId && a._id !== t[0]._id,
        );
        if (employeesData.length) {
          Dispatch(addCoWorker(employeesData));
        }
      }

      Navigate(`/main/${t[0].id}`);
    }
  }

  return (
    <div>
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
                  <div className="WelcomeMsg">
                    <b>WELCOME</b>
                  </div>
                  {error && (
                    <p className="ErrorWrongLogIn">
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

                    <FormControl
                      required
                      sx={{ m: 1, width: "23.5ch" }}
                      variant="outlined"
                      onChange={(e) => setPassword(e.target.value)}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
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
                  <Backdrop
                    sx={(theme) => ({
                      color: "#fff",
                      zIndex: theme.zIndex.drawer + 1,
                    })}
                    open={loader}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
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
    </div>
  );
}
