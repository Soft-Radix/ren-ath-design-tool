import { Modal } from "@mui/material";
import React from "react";
import styles from "./modalLayout.module.scss";
const ModalLayout = ({ children, isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modalContent}>{children}</div>
    </Modal>
  );
};

export default ModalLayout;
