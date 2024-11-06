import { FaUser } from "react-icons/fa";
import { useState } from "react";
export default function Header() {
  let loggedInUserName = JSON.parse(localStorage.getItem("loggedInUser"));
  const [click, setClick] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#4d79ff",
        margin: "0",
      }}
    >
      <div>
        <i>
          <b>Tech Global</b>
        </i>
      </div>

      <div onChange={() => setClick(!click)}>
        <FaUser size={10} /> {loggedInUserName.name}
        {click && "logout"}
      </div>
    </div>
  );
}
