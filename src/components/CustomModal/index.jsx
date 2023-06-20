import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const CustomModal = ({ open, handleClose, children }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: 0,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
