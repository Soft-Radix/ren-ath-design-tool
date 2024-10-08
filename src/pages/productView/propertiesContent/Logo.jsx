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
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Logo = () => {
  const {
    updateLogo,
    id,
    updatedLogos,
    setUpdatedLogos,
    logoScale,
    updateLogoScale,
    handleModelRotation,
    logos,
    setLogos,
  } = useProductStore((state) => state);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [logoPositions, setLogoPositions] = useState({});

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
    updateLogoScale({ ...logoScale });
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

  const updateLogoScales = (logoKey, scale) => {
    updateLogoScale({ ...logoScale, [logoKey]: scale });
  };

  const updateLogoAngle = (logoKey, angle) => {
    setLogoAngles({ ...logoAngles, [logoKey]: angle });
  };

  const handleDeleteLogo = (logoKey) => {
    const newLogos = logos.filter((logo) => logo !== logoKey);
    const { [logoKey]: _, ...remainingUpdatedLogos } = updatedLogos;
    const { [logoKey]: __, ...remainingLogoPositions } = logoPositions;
    const { [logoKey]: ___, ...remainingLogoScales } = logoScale;
    const { [logoKey]: ____, ...remainingLogoAngles } = logoAngles;

    setLogos(newLogos);
    setUpdatedLogos(remainingUpdatedLogos);
    setLogoPositions(remainingLogoPositions);
    updateLogoScale(remainingLogoScales);
    setLogoAngles(remainingLogoAngles);
  };

  return (
    <div className={`${styles.numberWrap} ${styles.logoWrap}`}>
      {logos?.map((logo, index) => {
        const logoKey = logo;

        return (
          <Accordion
            key={index + 1}
            onChange={handleChange(index + 1)}
            expanded={expanded === index + 1}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <img
                  src={logo}
                  alt={`${index}-${logo}`}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDeleteLogo(logoKey)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
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
                      handleModelRotation(0);
                      updateLogosWithPosition(1, logo, logoKey);
                    }}
                  >
                    Front
                    {/* <img src={images.front} alt="" /> */}
                  </div>
                  <div
                    className={`${styles.imgWrap} ${
                      logoPositions[logoKey] === 2 ? styles.selected : ""
                    }`}
                    onClick={() => {
                      handleModelRotation(180);
                      updateLogosWithPosition(2, logo, logoKey);
                    }}
                  >
                    Back
                    {/* <img src={images.back} alt="" /> */}
                  </div>
                  <div
                    className={`${styles.imgWrap} ${
                      logoPositions[logoKey] === 3 ? styles.selected : ""
                    }`}
                    onClick={() => {
                      handleModelRotation(270);
                      updateLogosWithPosition(3, logo, logoKey);
                    }}
                  >
                    Left
                    {/* <img src={images.chest_left} alt="" /> */}
                  </div>
                  <div
                    className={`${styles.imgWrap} ${
                      logoPositions[logoKey] === 4 ? styles.selected : ""
                    }`}
                    onClick={() => {
                      handleModelRotation(90);
                      updateLogosWithPosition(4, logo, logoKey);
                    }}
                  >
                    Right
                    {/* <img src={images.chest_right} alt="" /> */}
                  </div>
                </div>
              </div>
              <h3>Scale</h3>
              <div className={styles.sliderWrap}>
                <Slider
                  min={0.5}
                  max={1.5}
                  step={0.1}
                  value={logoScale[logoKey]}
                  defaultValue={0.3}
                  onChange={(e) => updateLogoScales(logoKey, e)}
                />
              </div>
              {/* <h3>Angle</h3> */}
              {/* <div className={styles.sliderWrap}>
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
              </div> */}
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
