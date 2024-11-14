import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { useState } from "react";
const style = {
  display: "flex",
  flexDirection: "column",

  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DetailsModal({ id, desc }) {
  const [openId, setOpenId] = useState(null);

  const handleClose = () => setOpenId(null);

  return (
    <div>
      <Button onClick={() => setOpenId(id)}>Details</Button>
      <Modal
        open={openId === id}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            <b>{desc.title.toUpperCase()}</b>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <b>ASSIGNED TO:</b>
            {desc.assignedTo}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <b>DESCRIPTION:</b>
            {desc.description}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <b>ASSIGNED ON:</b>
            {desc.createdDate}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <b>DEADLINE :</b>
            {desc.dueDate}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <b>STATUS:</b>
            {desc.status}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
