import React, { useState } from "react";
import ThemeButton from "../common/ThemeButton";
import styles from "./MyDesignList.module.scss";
import { Deleteicon, DoneIcon, EditIcon } from "../../assets/svg/icons";
import CommonModal from "../common/modal";

const MyDesignCard = ({ title, status, img }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  return (
    <div className={styles.designCard}>
      <div className={styles.imgContainer}>
        <div className={styles.actionBtn}>
          <span
            onClick={() => {
              setOpenDelete(true);
            }}
          >
            <Deleteicon />
          </span>
          {!!!status && (
            <span>
              <EditIcon />
            </span>
          )}
        </div>
        <img src={img} alt="" />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.btnWrap}>
        <ThemeButton
          color={status ? "#D8FFF1" : ""}
          textColor={status ? "#07CD86" : ""}
          onClick={() => {
            !!!status && setOpenStatus(true);
          }}
        >
          <span>
            {!!status && <DoneIcon />}{" "}
            {status ? "Completed" : "Mark as Completed"}
          </span>
        </ThemeButton>
      </div>
      
      {/* modal for delete */}
      <CommonModal
        open={openDelete}
        setOpen={setOpenDelete}
        modalIcon={<Deleteicon />}
        title="Delete Design"
        subTitle="Are you sure you want to delete this design?"
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            padding: 5,
          }}
        >
          <ThemeButton
            variant="outlined"
            onClick={() => {
              setOpenDelete(false);
            }}
          >
            Cancel
          </ThemeButton>
          <ThemeButton
            onClick={() => {
              setOpenDelete(false);
            }}
          >
            Delete
          </ThemeButton>
        </div>
      </CommonModal>

      {/* modal for status update */}
      <CommonModal
        open={openStatus}
        setOpen={setOpenStatus}
        modalIcon={<DoneIcon />}
        title="Mark as Completed"
        subTitle="Are you sure you want to mark this design as completed?"
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            padding: 5,
          }}
        >
          <ThemeButton
            variant="outlined"
            onClick={() => {
              setOpenStatus(false);
            }}
          >
            Cancel
          </ThemeButton>
          <ThemeButton
            onClick={() => {
              setOpenStatus(false);
            }}
          >
            Yes
          </ThemeButton>
        </div>
      </CommonModal>
    </div>
  );
};

export default MyDesignCard;
