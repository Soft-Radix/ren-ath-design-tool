import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import back from "../../../assets/images/products/placement/W1/back.png";
import front from "../../../assets/images/products/placement/W1/front.png";
import { CrossIcon, TickIcon } from "../../../assets/svg/icons";
import ThemeButton from "../../../components/common/ThemeButton";
import { useProductStore } from "../../../store";
import styles from "./properties.module.scss";
import { colorList } from "../../../components/data/colors";
import { TextField } from "@mui/material";
import Slider from "rc-slider";

const Name = () => {
  const {
    id,
    modelName,
    updateName,
    namePosition,
    updateNamePosition,
    nameFont,
    updateNameFont,
    nameColor,
    updateNameColor,
    nameOutline,
    updateNameOutline,
    nameGradientColor,
    isNameGradientColor,
    updateNameGradient,
    updateIsNameGradient,
    updateNameScale,
    nameScale,
    updateNameGradientScale,
    nameGradientScale,
    updateNameGradientAngle,
    nameGradientAngle,
  } = useProductStore((state) => state);
  const ref = useProductStore((state) => state.ref);

  const children = ref?.current?.children || [];

  const [expanded, setExpanded] = React.useState(false > false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [type, setType] = useState({ 0: 1, 1: 1, 2: 1, 3: 1 });
  const [images, setImages] = useState({
    front: "",
    back: "",
    chest_left: "",
    chest_right: "",
  });

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
        //console.error("Error loading images:", error);
      }
    };
    loadImages();
  }, [id]);

  const checkIfName = () => {
    if (modelName === "") {
      updateName("Last Name");
    } else {
      updateName(modelName);
    }
  };

  console.log("ty", type);
  return (
    <div className={`${styles.numberWrap} ${styles.nameWrap}`}>
      {children?.map((child, childIndex) => {
        if (
          childIndex === 2 ||
          childIndex === 3 ||
          childIndex === 0 ||
          childIndex === 1
        ) {
          return (
            <Accordion
              key={child.uuid}
              onChange={handleChange(child?.uuid)}
              expanded={expanded === child?.uuid}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {child.name}
              </AccordionSummary>
              <AccordionDetails>
                {(childIndex === 2 || childIndex === 3) && (
                  <div className={styles.scaleAngleWrap}>
                    <div className={styles.sliderWrap}>
                      <span>Scale</span>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={nameScale[childIndex]}
                        onChange={(e) => {
                          updateNameScale({ [childIndex]: e });
                        }}
                      />
                    </div>
                  </div>
                )}
                <h3>Enter Name</h3>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Enter name"
                  value={modelName[childIndex]}
                  onChange={(e) => updateName({ [childIndex]: e.target.value })}
                />
                <h3>Change Fonts</h3>

                <div className={styles.fontWrap}>
                  <motion.div
                    className={`${styles.fontItem1} ${
                      nameFont[childIndex] == 1 ? styles.selected : ""
                    }`}
                    onClick={() => updateNameFont({ [childIndex]: 1 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F1 2345567789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem2} ${
                      nameFont[childIndex] == 2 ? styles.selected : ""
                    }`}
                    onClick={() => updateNameFont({ [childIndex]: 2 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F2 2345567789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem3} ${
                      nameFont[childIndex] == 3 ? styles.selected : ""
                    }`}
                    onClick={() => updateNameFont({ [childIndex]: 3 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F3 2345567789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem4} ${
                      nameFont[childIndex] == 4 ? styles.selected : ""
                    }`}
                    onClick={() => updateNameFont({ [childIndex]: 4 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F4 2345567789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem5} ${
                      nameFont[childIndex] == 5 ? styles.selected : ""
                    }`}
                    onClick={() => updateNameFont({ [childIndex]: 5 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F5 2345567789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem6} ${
                      nameFont[childIndex] == 6 ? styles.selected : ""
                    }`}
                    onClick={() => updateNameFont({ [childIndex]: 6 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F6 2345567789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem7} ${
                      nameFont[childIndex] == 7 ? styles.selected : ""
                    }`}
                    onClick={() => updateNameFont({ [childIndex]: 7 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F7 2345567789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem8} ${
                      nameFont[childIndex] == 8 ? styles.selected : ""
                    }`}
                    onClick={() => updateNameFont({ [childIndex]: 8 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F8 2345567789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem9} ${
                      nameFont[childIndex] == 9 ? styles.selected : ""
                    }`}
                    onClick={() => updateNameFont({ [childIndex]: 9 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F9 2345567789
                  </motion.div>{" "}
                </div>
                <h3>Color & Outline</h3>
                <div className={styles.scaleAngleWrap}>
                  <div className={styles.sliderWrap}>
                    <span>Scale</span>
                    <Slider
                      min={0.1}
                      max={1}
                      step={0.01}
                      value={nameGradientScale[childIndex]}
                      onChange={(e) => {
                        updateNameGradientScale({ [childIndex]: e });
                      }}
                    />
                  </div>
                  <div className={styles.sliderWrap}>
                    <span>Rotate</span>
                    <Slider
                      min={0}
                      max={180}
                      step={5}
                      value={nameGradientAngle[childIndex]}
                      onChange={(e) => {
                        updateNameGradientAngle({ [childIndex]: e });
                      }}
                    />
                  </div>
                </div>
                <div className={styles.fontColorWrap}>
                  <div className={styles.buttonWrap}>
                    <ThemeButton
                      onClick={() => setType({ ...type, [childIndex]: 1 })}
                      variant={type[childIndex] != 1 ? "outlined" : "contained"}
                    >
                      Color
                    </ThemeButton>
                    <ThemeButton
                      onClick={() => setType({ ...type, [childIndex]: 3 })}
                      variant={type[childIndex] != 3 ? "outlined" : "contained"}
                    >
                      Gradient
                    </ThemeButton>
                    <ThemeButton
                      onClick={() => setType({ ...type, [childIndex]: 2 })}
                      variant={type[childIndex] != 2 ? "outlined" : "contained"}
                    >
                      Outline
                    </ThemeButton>
                    <div
                      className={styles.gradientViewer}
                      style={{
                        background: isNameGradientColor
                          ? `linear-gradient(0deg, ${
                              nameColor[childIndex] || "transparent"
                            }, ${
                              nameGradientColor[childIndex] || "transparent"
                            })`
                          : nameColor[childIndex],
                        height: 35,
                        width: 50,
                      }}
                      variant={"outlined"}
                    ></div>
                  </div>

                  <div className={styles.colorPalletWrap}>
                    <div
                      className={styles.colorViewer}
                      style={{ backgroundColor: "transparent" }}
                      onClick={() => {
                        type[childIndex] == 1
                          ? updateNameColor({ [childIndex]: "" })
                          : type[childIndex] == 3
                          ? updateNameGradient({ [childIndex]: "" })
                          : updateNameOutline({ [childIndex]: "" });

                        if (type[childIndex] == 3) {
                          updateIsNameGradient(false);
                        }
                      }}
                    >
                      <CrossIcon />
                    </div>
                    {colorList.map((itemColor, index) => (
                      <div
                        key={index}
                        className={styles.colorViewer}
                        style={{ backgroundColor: itemColor }}
                        onClick={() => {
                          if (type[childIndex] == 3) {
                            updateIsNameGradient(true);
                          }
                          type[childIndex] == 1
                            ? updateNameColor({ [childIndex]: itemColor })
                            : type[childIndex] == 3
                            ? updateNameGradient({ [childIndex]: itemColor })
                            : updateNameOutline({ [childIndex]: itemColor });
                        }}
                      >
                        {type[childIndex] == 1
                          ? nameColor[childIndex] === itemColor && <TickIcon />
                          : type[childIndex] == 3
                          ? nameGradientColor[childIndex] === itemColor && (
                              <TickIcon />
                            )
                          : nameOutline[childIndex] === itemColor && (
                              <TickIcon />
                            )}
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        }
      })}
    </div>
  );
};

export default Name;
