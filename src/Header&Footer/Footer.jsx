import { BiSolidCopyright } from "react-icons/bi";

export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        backgroundColor: "#4d79ff",
        textAlign: "end",
        color: "#ebebe0",
      }}
    >
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
