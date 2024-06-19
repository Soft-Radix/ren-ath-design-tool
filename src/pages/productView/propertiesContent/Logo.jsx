import React, { useEffect, useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./properties.module.scss";
import { useProductStore } from "../../../store";
import { useDropzone } from "react-dropzone";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { UploadIcon } from "../../../assets/svg/icons";

const Logo = () => {
  const { updateLogo, id, updatedLogos, setUpdatedLogos } = useProductStore(
    (state) => state
  );

  const [logos, setLogos] = useState([]);
  // const [updatedLogos, setUpdatedLogos] = useState({});
  const [logoPositions, setLogoPositions] = useState({});
  const [logoScales, setLogoScales] = useState({});
  const [logoAngles, setLogoAngles] = useState({});
  const [images, setImages] = useState({
    front: "",
    back: "",
    chest_left: "",
    chest_right: "",
  });

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
    const newLogo = acceptedFiles[0]
      ? URL.createObjectURL(acceptedFiles[0])
      : null;
    updateLogo(acceptedFiles[0]);
    const logoKey = `image${logos.length + 1}`;
    setLogos([...logos, newLogo]);
    setUpdatedLogos({
      ...updatedLogos,
      [logoKey]: { 1: [], 2: [], 3: [], 4: [] },
    });
    setLogoPositions({ ...logoPositions, [logoKey]: null });
    setLogoScales({ ...logoScales, [logoKey]: 1 });
    setLogoAngles({ ...logoAngles, [logoKey]: 0 });
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

  useEffect(() => {
    const loadImages = async () => {
      try {
        const front = (
          await import(
            `../../../assets/images/products/placement/${id}/front.png`
          )
        ).default;
        const back = (
          await import(
            `../../../assets/images/products/placement/${id}/back.png`
          )
        ).default;
        const chest_left = (
          await import(
            `../../../assets/images/products/placement/${id}/left.png`
          )
        ).default;
        const chest_right = (
          await import(
            `../../../assets/images/products/placement/${id}/right.png`
          )
        ).default;
        const images = { front, back, chest_left, chest_right };
        setImages({ ...images });
      } catch (error) {
        // Handle error
      }
    };
    loadImages();
  }, [id]);

  const updateLogosWithPosition = (key, logo, logoKey) => {
    const newLogos = { ...updatedLogos };

    // Ensure logoKey exists
    if (!newLogos[logoKey]) {
      newLogos[logoKey] = { 1: [], 2: [], 3: [], 4: [] };
    }

    // Remove logo from other keys
    Object.keys(newLogos[logoKey]).forEach((k) => {
      if (k !== String(key)) {
        newLogos[logoKey][k] = newLogos[logoKey][k].filter((l) => l !== logo);
      }
    });

    // Add logo to the specified key if it doesn't exist
    if (!newLogos[logoKey][key].includes(logo)) {
      newLogos[logoKey][key] = [...newLogos[logoKey][key], logo];
    }

    // Update the position state for this logo
    const newLogoPositions = { ...logoPositions, [logoKey]: key };

    setUpdatedLogos(newLogos);
    setLogoPositions(newLogoPositions);
  };

  const updateLogoScale = (logoKey, scale) => {
    setLogoScales({ ...logoScales, [logoKey]: scale });
  };

  const updateLogoAngle = (logoKey, angle) => {
    setLogoAngles({ ...logoAngles, [logoKey]: angle });
  };

  return (
    <div className={`${styles.numberWrap} ${styles.logoWrap}`}>
      {logos?.map((logo, index) => {
        const logoKey = `image${index + 1}`;

        return (
          <Accordion key={index + 1}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <img
                src={logo}
                alt={`${index}-${logo}`}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <div
                className={`${styles.textLayerWrap} ${styles.addNumberWrap}`}
              >
                <div className={styles.layers}>
                  <div
                    className={`${styles.imgWrap} ${
                      logoPositions[logoKey] === 1 ? styles.selected : ""
                    }`}
                    onClick={() => {
                      updateLogosWithPosition(1, logo, logoKey);
                    }}
                  >
                    <img src={images.front} alt="" />
                  </div>
                  <div
                    className={`${styles.imgWrap} ${
                      logoPositions[logoKey] === 2 ? styles.selected : ""
                    }`}
                    onClick={() => {
                      updateLogosWithPosition(2, logo, logoKey);
                    }}
                  >
                    <img src={images.back} alt="" />
                  </div>
                  <div
                    className={`${styles.imgWrap} ${
                      logoPositions[logoKey] === 3 ? styles.selected : ""
                    }`}
                    onClick={() => {
                      updateLogosWithPosition(3, logo, logoKey);
                    }}
                  >
                    <img src={images.chest_left} alt="" />
                  </div>
                  <div
                    className={`${styles.imgWrap} ${
                      logoPositions[logoKey] === 4 ? styles.selected : ""
                    }`}
                    onClick={() => {
                      updateLogosWithPosition(4, logo, logoKey);
                    }}
                  >
                    <img src={images.chest_right} alt="" />
                  </div>
                </div>
              </div>
              <h3>Scale</h3>
              <div className={styles.sliderWrap}>
                <Slider
                  min={0.3}
                  max={1.2}
                  step={0.01}
                  value={logoScales[logoKey]}
                  onChange={(e) => updateLogoScale(logoKey, e)}
                />
              </div>
              <h3>Angle</h3>
              <div className={styles.sliderWrap}>
                <Slider
                  min={0}
                  max={360}
                  step={1}
                  value={logoAngles[logoKey]}
                  onChange={(e) => updateLogoAngle(logoKey, e)}
                />
                <span>
                  {logoAngles[logoKey] || 0}
                  <sup>°</sup>
                </span>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
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
    </div>
  );
};

export default Logo;
