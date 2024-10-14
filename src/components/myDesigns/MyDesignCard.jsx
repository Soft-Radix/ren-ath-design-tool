import React, { useEffect, useMemo, useState } from "react";
import ThemeButton from "../common/ThemeButton";
import styles from "./MyDesignList.module.scss";
import {
  CrossIconPatone,
  Deleteicon,
  DoneIcon,
  EditIcon,
  Plus,
  UploadIcon,
} from "../../assets/svg/icons";
import CommonModal from "../common/modal";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../store";
import { useUpdateUniformStates } from "../../hook/CustomHook/useUpdateUniformStates";
import useFetch from "../../hook/CustomHook/usefetch";
import { toast } from "react-toastify";
import {
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import modalStyles from "../common/modal/modal.module.scss";
import Cross from "../../assets/svg/cross.svg";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import LoadingBars from "../common/loader/LoadingBars";

const baseStyleFormat = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 10px",
  borderWidth: 2,
  borderRadius: 8,
  borderColor: "#0E2B3A",
  borderStyle: "dashed",
  backgroundColor: "#F2F4F5",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  marginTop: "20px",
  marginBottom: "20px",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  margin: 8,
  width: 50,
  height: 50,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};
const MyDesignCard = ({ title, status, img, id, loadMyDesignListQuery }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openMarkAsCompletedModal, setOpenMarkAsCompletedModal] =
    useState(false);
  const [files, setFiles] = useState([]);
  const [allFormatsFiles, setAllFormatsFiles] = useState([]);
  const [colorCode, setColorCode] = useState("");
  const [colorList, setColorList] = useState([]);
  const [resp, setResp] = useState(false);
  const [selectedOption, setSelectedOption] = useState("1");
  const [selectedColorOption, setSelectedColorOption] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
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

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  // Function to send the form data
  const uploadDesignData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("UniFormDesign_token");
    const formData = new FormData();

    // Append design_id
    formData.append("design_id", id.toString());

    // Append is_logo_upload
    formData.append("is_logo_upload", selectedOption);

    // Check if file should be uploaded
    if (selectedOption === "1") {
      files.forEach((file, index) => {
        formData.append(`files`, file); // Append each file with an indexed name
      });
    } else if (selectedOption === "2") {
      if (allFormatsFiles) {
        allFormatsFiles.forEach((file, index) => {
          formData.append(`files`, file); // Append each file with an indexed name
        });
      }
    } else {
      formData.append("files", "");
    }

    // Append is_pantone_info
    formData.append("is_pantone_info", selectedColorOption);

    // Check if pantone_info should be sent
    if (selectedColorOption === "1") {
      formData.append("pantone_info", colorList.join(","));
    } else {
      formData.append("pantone_info", ""); // Send empty if pantone_info is not required
    }

    try {
      // Send POST request
      const response = await instance.post("/design/mark-complete", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);
      setOpenMarkAsCompletedModal(false);
      setResp(true);
      // console.log("Success:", response.data);
    } catch (error) {
      // Handle error
      toast.error(error);
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Set loading to false once the request is complete
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setColorCode(e.target.value);
  };

  // Add color code to the list
  const handleAddColor = () => {
    if (colorCode && !colorList.includes(colorCode)) {
      setColorList([...colorList, colorCode]);
      setColorCode(""); // Clear the input
    }
  };

  // Remove color code from the list
  const handleRemoveColor = (code) => {
    setColorList(colorList.filter((color) => color !== code));
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleColorOptionChange = (event) => {
    setSelectedColorOption(event.target.value);
  };
  const handleClick = () => {
    updateUniformStates(id);
    updateEditedDesignId(id);
  };

  const handleDeleteDesign = () => {
    if (deleteId) {
      deleteDesignQuery();
    }
  };

  const {
    getRootProps: getVectorRootProps,
    getInputProps: getVectorInputProps,
    isFocused: isVectorFocused,
    isDragAccept: isVectorDragAccept,
    isDragReject: isVectorDragReject,
  } = useDropzone({
    accept: {
      "image/svg+xml": [], // SVG
      "application/postscript": [], // AI, EPS can fall under postscript
      "application/eps": [], // EPS
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyleFormat,
      ...(isVectorFocused ? focusedStyle : {}),
      ...(isVectorDragAccept ? acceptStyle : {}),
      ...(isVectorDragReject ? rejectStyle : {}),
    }),
    [isVectorFocused, isVectorDragAccept, isVectorDragReject]
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  // Clean up non-vector files' object URLs on unmount
  useEffect(() => {
    return () => {
      allFormatsFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [allFormatsFiles]);
  // Dropzone for all image formats (JPEG, PNG, PDF)
  const {
    getRootProps: getAllFormatsRootProps,
    getInputProps: getAllFormatsInputProps,
    isFocused: isAllFormatsFocused,
    isDragAccept: isAllFormatsDragAccept,
    isDragReject: isAllFormatsDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "application/pdf": [],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setAllFormatsFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const styleAll = useMemo(
    () => ({
      ...baseStyleFormat,
      ...(isAllFormatsFocused ? focusedStyle : {}),
      ...(isAllFormatsDragAccept ? acceptStyle : {}),
      ...(isAllFormatsDragReject ? rejectStyle : {}),
    }),
    [isAllFormatsFocused, isAllFormatsDragAccept, isAllFormatsDragReject]
  );

  const handleDeleteLogo = (key) => {
    const newFiles = files.filter((logo) => logo !== key);
    setFiles(newFiles);
  };

  const thumbs = files.map((file, index) => {
    const key = file;
    return (
      <div key={index} className="ModalImagePreviewContainer">
        <div onClick={() => handleDeleteLogo(key)}>
          <img src={Cross} alt="cross" className="cross-icon" />
        </div>
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img
              className="preview-img"
              src={file.preview}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </div>
        </div>
        <div className="preview_text_container">
          <p className="image-preview-text">{file.name}</p>
          <p className="image-preview-text">{file.type}</p>
        </div>
      </div>
    );
  });
  const allFormatsProps = getAllFormatsRootProps({ style: styleAll });

  const handleAllFormatDeleteLogo = (key) => {
    const newFiles = allFormatsFiles.filter((logo) => logo !== key);
    setAllFormatsFiles(newFiles);
  };
  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddColor();
    }
  };

  const allFormatPreview = allFormatsFiles.map((file, index) => {
    const key = file;
    return (
      <div key={index} className="ModalImagePreviewContainer">
        <div onClick={() => handleAllFormatDeleteLogo(key)}>
          <img src={Cross} alt="cross" className="cross-icon" />
        </div>
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img
              className="preview-img"
              src={file.preview}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </div>
        </div>
        <div className="preview_text_container">
          <p className="image-preview-text">{file.name}</p>
          <p className="image-preview-text">{file.type}</p>
        </div>
      </div>
    );
  });

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
          color={status || resp ? "#D8FFF1" : ""}
          textColor={status || resp ? "#07CD86" : ""}
          onClick={() => {
            !!!status && setOpenStatus(true);
            // handleClick();
          }}
        >
          <span>
            {!!(status || resp) && <DoneIcon />}{" "}
            {status || resp ? "Completed" : "Mark as Completed"}
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
              setOpenMarkAsCompletedModal(true);
            }}
          >
            Yes
          </ThemeButton>
        </div>
      </CommonModal>

      <Dialog
        open={openMarkAsCompletedModal}
        onClose={setOpenMarkAsCompletedModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          onClick={() => setOpenMarkAsCompletedModal(false)}
          className={modalStyles.modalCrossIcon}
        >
          <img src={Cross} alt="cross" />
        </div>
        <div style={{ paddingLeft: "50px" }} className={modalStyles.itemsStart}>
          <p className={modalStyles.itemsStart}>
            <span className={modalStyles.nestedModalTitle}>
              {"Add below details to Finalize Design"}
            </span>
          </p>

          <ol className={modalStyles.designList}>
            <li className={modalStyles.designListItems}>
              Logo Upload In Vector Format
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                <li>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={selectedOption}
                      onChange={handleOptionChange}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="1"
                        className={modalStyles.designRadioText}
                        control={<Radio color="default" />}
                        label="I have a logo or multiple logos to upload."
                      />
                      {selectedOption === "1" && (
                        <>
                          <div {...getVectorRootProps({ style })}>
                            <input {...getVectorInputProps()} />
                            <p className="image_drop_text">
                              Choose a file or drag an image here
                            </p>
                            <p className="image_drop_text_sub">
                              Please upload your logo(s) below in a vector
                              format
                            </p>
                            <p className="image_drop_text_sub_head">
                              (AI, EPS, SVG)
                            </p>
                          </div>
                          {files && files.length > 0 && (
                            <aside style={thumbsContainer}>{thumbs}</aside>
                          )}
                        </>
                      )}
                      <FormControlLabel
                        value="2"
                        className={modalStyles.designRadioText}
                        control={<Radio color="default" />}
                        label="I do not have a logo file in a vector format, but I can upload in JPEG, PNG, or PDF format."
                      />
                      {selectedOption === "2" && (
                        <div style={{ marginTop: "10px" }}>
                          <p className="image_drop_text">
                            <span className="image_drop_text font_bold">
                              Disclaimer:
                            </span>{" "}
                            While we offer the option to upload logos in these
                            formats, please note that these files may not result
                            in the same quality. Non-vector files can lose
                            clarity when resized or printed, and we cannot
                            guarantee they will appear as sharp or precise as
                            vector files.
                          </p>
                          <div {...allFormatsProps}>
                            <input {...getAllFormatsInputProps()} />
                            <p className="image_drop_text">
                              Choose a file or Drag image here
                            </p>
                          </div>
                          {allFormatsFiles && allFormatsFiles.length > 0 && (
                            <aside style={thumbsContainer}>
                              {allFormatPreview}
                            </aside>
                          )}
                        </div>
                      )}
                      <FormControlLabel
                        value="3"
                        className={modalStyles.designRadioText}
                        control={<Radio color="default" />}
                        label="I do not have a logo."
                      />
                    </RadioGroup>
                  </FormControl>
                </li>
              </ul>
            </li>
            <li>
              Pantone Color Information
              <FormControl sx={{ width: "100%" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedColorOption}
                  onChange={handleColorOptionChange}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="1"
                    className={modalStyles.designRadioText}
                    control={<Radio color="default" />}
                    label="I know my pantone color information."
                  />
                  {selectedColorOption === "1" && (
                    <div className="">
                      <div className="pantone-color-container">
                        <input
                          type="text"
                          className="pantone-color-input"
                          value={colorCode}
                          onChange={handleInputChange}
                          placeholder="Enter color code"
                          onKeyDown={handleKeyDown}
                        />

                        {/* Add button */}
                        <button
                          onClick={handleAddColor}
                          className="pantone-color-button"
                        >
                          <Plus />
                        </button>
                      </div>

                      {/* Display list of color codes */}
                      <div className="color_code_boxes">
                        {colorList.map((code, index) => (
                          <div key={index} className="added_patone_container">
                            <p className="added_patone_container_text">
                              {code}{" "}
                            </p>
                            <div
                              className="added_patone_cancel_icon"
                              onClick={() => handleRemoveColor(code)}
                            >
                              <CrossIconPatone />
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* <ul>
                        {colorList.map((code, index) => (
                          <li key={index}>
                            {code}
                            <button onClick={() => handleRemoveColor(code)}>
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul> */}
                    </div>
                  )}
                  <FormControlLabel
                    value="2"
                    className={modalStyles.designRadioText}
                    control={<Radio color="default" />}
                    label="I do not know my pantone color information."
                  />
                </RadioGroup>
              </FormControl>
            </li>
          </ol>
        </div>
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
            isDisable={isLoading}
            onClick={() => {
              setOpenMarkAsCompletedModal(true);
              uploadDesignData();
            }}
          >
            {isLoading ? <LoadingBars /> : " Finalized My Design"}
          </ThemeButton>
        </div>
      </Dialog>
      {/* <CommonModal
        open={openMarkAsCompletedModal}
        setOpen={setOpenMarkAsCompletedModal}
        modalIcon={<DoneIcon />}
        title="sdaaaaaaaaaaaaaaaaa"
        subTitle="asddddddddddd"
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
              setOpenStatus(true);
              setOpenMarkAsCompletedModal(false);
            }}
          >
            Cancel
          </ThemeButton>
          <ThemeButton
            onClick={() => {
            
              setOpenMarkAsCompletedModal(true);
            }}
          >
            Yes
          </ThemeButton>
        </div>
      </CommonModal> */}
    </div>
  );
};

export default MyDesignCard;
