import BasicDetails from "../subcomponent/Basicdetails";
import Coworkers from "../subcomponent/Coworkers";
import "../styling/basic.css";
export default function Main() {
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

      <div style={{ width: "50%", backgroundColor: "	 #e6e6e6" }}></div>
    </div>
  );
}
