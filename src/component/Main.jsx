import BasicDetails from "../subcomponent/Basicdetails";
import Coworkers from "../subcomponent/Coworkers";
import TaskDetails from "../subcomponent/TaskDetails";
import "../styling/basic.css";
import QuickLink from "../subcomponent/QuickLinks";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export default function Main() {
  const { id } = useParams();
  const isLogged = useSelector((state) => state.loggedIn);
  return (
    <div
      className="userDetails"
      style={{ height: `${window.innerHeight}px` }}
    >
      <div
        style={{ width: "50%", backgroundColor: "#e6e6e6", height: "100vh" }}
      >
        <BasicDetails />
        <Coworkers />
      </div>
      <div
        style={{ width: "50%", backgroundColor: "	 #e6e6e6", display: "flex" }}
      >
        <TaskDetails />
        {isLogged.isManager && parseInt(id) === isLogged.id ? (
          <QuickLink />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
