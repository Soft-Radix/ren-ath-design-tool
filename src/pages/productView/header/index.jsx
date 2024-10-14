import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BackButtonIcon,
  ShareButton
} from "../../../assets/svg/icons";
import CustomDrawer from "../../../components/common/drawer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BackButtonIcon, ShareButton } from "../../../assets/svg/icons";
import CommonModal from "../../../components/common/modal";
import ThemeButton from "../../../components/common/ThemeButton";
import useFetch from "../../../hook/CustomHook/usefetch";
import { useProductStore } from "../../../store";
import { getUpdatedUniformData, mergeObjects } from "../../../utils/funtions";
import styles from "./header.module.scss";
import { InputField } from "../../../components/common/InputField/InputField";

const Header = () => {
  const productName = useProductStore((state) => state.name);
  const [openDesignName, setOpenDesignName] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  const {
    editedDesignId,
    editDesignData,
    handleCallSnapShotFunc,
    snapShotImg,
  } = useProductStore((state) => state);
  const [designName, setDesignName] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [
    saveUniformQuery,
    { response: saveResponse, saveLoading, error: saveError },
  ] = useFetch("/design/add", {
    method: "post",
  });

  const [
    editUniformQuery,
    { response: editResponse, editLoading, error: editError },
  ] = useFetch(`/design/edit/${editedDesignId}`, {
    method: "post",
  });

  const [currentSnapShotImg, setCurrentSnapShotImg] = useState(snapShotImg);

  useEffect(() => {
    // Update local snapshot image state when snapShotImg changes
    setCurrentSnapShotImg(snapShotImg);
  }, [snapShotImg]);

  useEffect(() => {
    if (currentSnapShotImg && confirmSave) {
      handleSaveUniform();
    }
  }, [currentSnapShotImg, editedDesignId, confirmSave]);

  const handleSaveUniform = () => {
    if (editedDesignId) {
      const updatedData = getUpdatedUniformData();
      const mergedData = mergeObjects(updatedData, editDesignData);
      for (let key in mergedData) {
        if (typeof mergedData[key] === "string") {
          mergedData[key] = mergedData[key];
        } else {
          mergedData[key] = JSON.stringify(mergedData[key]);
        }
      }

      editUniformQuery({
        ...mergedData,
        style_code: "10052",
        cover_photo: currentSnapShotImg, // Use the current snapshot image
      });
    } else {
      const saveData = getUpdatedUniformData(true);
      saveUniformQuery({
        ...saveData,
        design_name: designName,
        style_code: "10052",
        cover_photo: currentSnapShotImg, // Use the current snapshot image
      });
    }
  };

  // Handle API response
  useEffect(() => {
    toast.dismiss();
    if (saveResponse) {
      toast.success(saveResponse.message);
      navigate("/");
    }

    if (saveError) {
      const toastId = toast.error(saveError.message);
      return () => {
        toast.dismiss(toastId);
      };
    }
    if (editResponse) {
      toast.success(editResponse.message);
      navigate("/my-design");
    }

    if (editError) {
      const toastId = toast.error(editError.message);
      return () => {
        toast.dismiss(toastId);
      };
    }
    setConfirmSave(false);
    setDesignName("");
  }, [saveResponse, saveError, editResponse, editError]);

  useEffect(() => {
    setDesignName(editDesignData?.design_name);
  }, [editDesignData]);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };
  return (
    <div className={styles.mainWrap}>
      <div className={styles.leftWrap}>
        <span onClick={() => navigate(-1)}>
          <BackButtonIcon />
        </span>
        <span className={styles.title}>{productName}</span>
      </div>
      <div className={styles.rightWrap}>
        <Tooltip title="Add your own color palette">
          <img
            src="../../../../src/assets/svg/colorPallete.svg"
            alt=""
            style={{
              marginTop: 5,
              cursor: "pointer",
            }}
            onClick={toggleDrawer(true)}
          />
        </Tooltip>
        <CustomDrawer open={isOpen} toggleDrawer={toggleDrawer} />
        <ShareButton />
        <ThemeButton
          onClick={() => {
            setOpenDesignName(true);
            // handleCallSnapShotFunc(true); // This will trigger the snapshot update
          }}
        >
          Save
        </ThemeButton>
      </div>
      <CommonModal
        open={openDesignName}
        enDesignNameen={setOpenDesignName}
        // modalIcon={<Deleteicon />}
        title="Add Design Name"
        subTitle="Please add the below your design name"
      >
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: 10,
          }}
        >
          <InputField
            label="Design Name"
            name="design_name"
            type="test"
            valueData={designName}
            placeholder="Enter design name"
            fullWidth
            onChange={(e) => {
              setDesignName(e.target.value);
            }}
          />
          <ThemeButton
            onClick={() => {
              setConfirmSave(true);
              handleCallSnapShotFunc(true);
            }}
          >
            Save
          </ThemeButton>
        </div>
      </CommonModal>
    </div>
  );
};

export default Header;
