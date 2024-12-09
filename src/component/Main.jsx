import BasicDetails from "../subcomponent/Basicdetails";
import Coworkers from "../subcomponent/Coworkers";
import TaskDetails from "../subcomponent/TaskDetails";
import "../styling/basic.css";
import QuickLink from "../Quick Links/QuickLinks";

export default function Main() {
  return (
    <div className="userDetails">
      <div className="MainPageFirstHalf">
        <BasicDetails />
        <Coworkers />
      </div>
      <div className="MainPageSecondHalf">
        <TaskDetails />
        <QuickLink />
      </div>
    </div>
  );
}
