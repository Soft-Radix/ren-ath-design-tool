import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "../../../assets/svg/icons";
import { useProductStore } from "../../../store";
import styles from "./properties.module.scss";
import { toast } from "react-toastify";

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
    id,
    setLogos,
    logos,
  } = useProductStore((state) => state);
  const [images, setImages] = useState({
    front: "",
    back: "",
    chest_left: "",
    chest_right: "",
  });
  const [expanded, setExpanded] = React.useState(false > false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
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
    const image = acceptedFiles[0]
      ? URL.createObjectURL(acceptedFiles[0])
      : null;

    if (logos?.length < 4) {
      setLogos([...logos, image]);
    } else {
      toast.error("cannot upload images more than 4", {
        position: "top-right",
        autoClose: 3000,
      });
    }
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
        //console.log("🚀 ~ loadImages ~ front:", front);
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
        //console.error("Error loading images:", error);
      }
    };
    loadImages();
  }, [id]);

  return (
    <div className={`${styles.numberWrap} ${styles.logoWrap}`}>
      {logos?.length > 0 &&
        logos?.map((logo, index) => {
          return (
            <Accordion
              onChange={handleChange(logo + index)}
              expanded={expanded === logo + index}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <img
                  src={logo}
                  alt={"logo" + index + 1}
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
                        logoPosition[index] === 1 ? styles.selected : ""
                      }`}
                      onClick={() => {
                        // checkIfName();
                        updateLogo({
                          2: logo,
                        });
                        updateLogoPosition({ [index]: 1 });
                      }}
                    >
                      <img src={images.front} alt="" />
                    </div>
                    <div
                      className={`${styles.imgWrap} ${
                        logoPosition[index] === 2 ? styles.selected : ""
                      }`}
                      onClick={() => {
                        // checkIfName();
                        updateLogo({
                          3: logo,
                        });
                        updateLogoPosition({ [index]: 2 });
                      }}
                    >
                      <img src={images.back} alt="" />
                    </div>
                    <div
                      className={`${styles.imgWrap} ${
                        logoPosition[index] === 3 ? styles.selected : ""
                      }`}
                      onClick={() => {
                        // checkIfName();
                        updateLogo({
                          0: logo,
                        });
                        updateLogoPosition({ [index]: 3 });
                      }}
                    >
                      <img src={images.chest_left} alt="left sleeve" />
                    </div>
                    <div
                      className={`${styles.imgWrap} ${
                        logoPosition[index] === 4 ? styles.selected : ""
                      }`}
                      onClick={() => {
                        // checkIfName();
                        updateLogo({
                          1: logo,
                        });
                        updateLogoPosition({ [index]: 4 });
                      }}
                    >
                      <img src={images.chest_right} alt="right sleeve" />
                    </div>
                  </div>
                </div>
                <h3>scale</h3>
                <div className={styles.sliderWrap}>
                  <Slider
                    min={0.4}
                    max={1}
                    step={0.2}
                    value={logoScale[logoPosition[index] ?? 1]}
                    onChange={(e) =>
                      updateLogoScale({ [logoPosition[index]]: e })
                    }
                  />
                </div>
                <h3>angle</h3>
                <div className={styles.sliderWrap}>
                  <Slider
                    min={0}
                    max={360}
                    step={1}
                    value={logoAngle[logoPosition[index] ?? 1]}
                    onChange={(e) =>
                      updateLogoAngle({ [logoPosition[index]]: e })
                    }
                  />
                  <span>
                    {logoAngle[logoPosition[index]] || 0}
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
