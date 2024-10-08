import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./modal.module.scss";

export default function CommonModal({
  open,
  setOpen,
  title,
  subTitle,
  children,
  modalIcon,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={styles.modalIcon}>{modalIcon && modalIcon}</div>
      <p
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span className={styles.modalTitle}>{title}</span>
        <span className={styles.modalSubTitle}>{subTitle}</span>
      </p>
      {children}
    </Dialog>
  );
}
