import React, { useEffect, useMemo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./properties.module.scss";
import back from "../../../assets/images/products/placement/W1/back.png";
import front from "../../../assets/images/products/placement/W1/front.png";
import { useProductStore } from "../../../store";
import { useDropzone } from "react-dropzone";
import crossImg from "../../../assets/images/crossImg.png";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { UploadIcon } from "../../../assets/svg/icons";

const Logo = () => {
  const {
    logo,
    updateLogo,
    logoPosition,
    updateLogoPosition,
    logoScale,
    updateLogoScale,
    logoAngle,
    updateLogoAngle,
  } = useProductStore((state) => state);

  // Drag drop input styles start

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 10px",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    marginTop: "20px",
    cursor: "grab",
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

  const onDropAccepted = (acceptedFiles) => {
    updateLogo(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDropAccepted, accept: { "image/*": [] }, multiple: false });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  // Drag drop input styles end

  return (
    <div className={`${styles.numberWrap} ${styles.logoWrap}`}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          + Add Logo Place
        </AccordionSummary>
        <AccordionDetails>
          <div className={`${styles.textLayerWrap} ${styles.addNumberWrap}`}>
            <div className={styles.layers}>
              <div
                className={`${styles.imgWrap} ${
                  logoPosition === 1 ? styles.selected : ""
                }`}
                onClick={() => updateLogoPosition(1)}
              >
                <img src={front} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  logoPosition === 2 ? styles.selected : ""
                }`}
                onClick={() => updateLogoPosition(2)}
              >
                <img src={back} alt="" />
              </div>
            </div>
          </div>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <span className={styles.uploadWrap}>
              <UploadIcon />
              <span className={styles.textWrap}>
                <span className={styles.text1}>Upload logo</span>
                <span className={styles.text2}>
                  Max size 10MB, JPG, PNG, SVG, PDF
                </span>
              </span>
            </span>
          </div>
          {logo && (
            <div className={styles.imageWrap}>
              <img src={logo} alt="" className={styles.selectedImg} />
              <img
                onClick={() => updateLogo(null)}
                src={crossImg}
                alt=""
                className={styles.crossImg}
              />
            </div>
          )}
        </AccordionDetails>
      </Accordion>
      {logo && (
        <>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Scale
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.sliderWrap}>
                <Slider
                  min={0.3}
                  max={1.2}
                  step={0.01}
                  value={logoScale}
                  onChange={(e) => updateLogoScale(e)}
                />
              </div>
            </AccordionDetails>
          </Accordion>{" "}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Angle
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.sliderWrap}>
                <Slider
                  min={0}
                  max={360}
                  step={1}
                  value={logoAngle}
                  onChange={(e) => updateLogoAngle(e)}
                />
                <span>
                  {logoAngle || 0}
                  <sup>°</sup>
                </span>
              </div>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default Logo;
