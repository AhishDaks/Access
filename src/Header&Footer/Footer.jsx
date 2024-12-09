import { BiSolidCopyright } from "react-icons/bi";
import "../styling/basic.css";
export default function Footer() {
  return (
    <div className="Footer">
      <div>
        {" "}
        <BiSolidCopyright
          size={17}
          style={{ marginTop: "2px" }}
        />
      </div>{" "}
      Copyrights-2024
    </div>
  );
}
