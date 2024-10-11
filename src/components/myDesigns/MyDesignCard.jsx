import React, { useEffect, useState } from "react";
import ThemeButton from "../common/ThemeButton";
import styles from "./MyDesignList.module.scss";
import { Deleteicon, DoneIcon, EditIcon } from "../../assets/svg/icons";
import CommonModal from "../common/modal";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../store";
import { useUpdateUniformStates } from "../../hook/CustomHook/useUpdateUniformStates";
import useFetch from "../../hook/CustomHook/usefetch";
import { toast } from "react-toastify";

const MyDesignCard = ({ title, status, img, id, loadMyDesignListQuery }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const { updateEditedDesignId } = useProductStore((store) => store);
  // Call the custom hook at the top level of the component
  const updateUniformStates = useUpdateUniformStates();

  const [deleteDesignQuery, { response, loading, error }] = useFetch(
    `/design/delete/${deleteId}`,
    {
      method: "delete",
    }
  );

  const handleClick = () => {
    updateUniformStates(id);
    updateEditedDesignId(id);
  };

  const handleDeleteDesign = () => {
    if (deleteId) {
      deleteDesignQuery();
    }
  };

  // handle api response
  useEffect(() => {
    toast.dismiss();
    if (response) {
      toast.success(response.message);
      loadMyDesignListQuery();
    }

    if (error) {
      const toastId = toast.error(error.message);
      return () => {
        toast.dismiss(toastId);
      };
    }
    setDeleteId(null);
    setOpenDelete(false);
  }, [response, error]);

  return (
    <div className={styles.designCard}>
      <div className={styles.imgContainer}>
        <div className={styles.actionBtn}>
          <span
            onClick={() => {
              setOpenDelete(true);
              setDeleteId(id);
            }}
          >
            <Deleteicon />
          </span>
          {!!!status && (
            <span onClick={handleClick}>
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
            // handleClick();
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
          <ThemeButton onClick={handleDeleteDesign}>Delete</ThemeButton>
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
