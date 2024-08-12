import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { CrossIcon, TickIcon } from "../../../assets/svg/icons";
import ThemeButton from "../../../components/common/ThemeButton";
import { useProductStore } from "../../../store";
import styles from "./properties.module.scss";
import { colorList } from "../../../components/data/colors";
import { TextField } from "@mui/material";
import Slider from "rc-slider";
const Number = () => {
  const {
    number,
    updateNumber,
    numberPosition,
    updateNumberPosition,
    numberFont,
    updateNumberFont,
    numberColor,
    updateNumberColor,
    numberOutline,
    updateNumberOutline,
    id,
    numberGradientColor,
    updateNumberGradient,
    updateIsNumberGradient,
    isNumberGradientColor,
    numberScale,
    updateNumberScale,
    updateNumberAngle,
    numberAngle,
  } = useProductStore((state) => state);
  const ref = useProductStore((state) => state.ref);

  const [expanded, setExpanded] = React.useState(false > false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const children = ref?.current?.children || [];
  const [children, setChildren] = useState();

  useEffect(() => {
    const getChildren = sessionStorage.getItem("ref");
    setChildren(JSON.parse(getChildren));
  }, [ref]);

  const [type, setType] = useState({
    2: 1,
    3: 1,
  });
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
        // const chest_left = (await import(`../../../assets/images/products/placement/${id}/chest_left.png`)).default;
        // const chest_right = (await import(`../../../assets/images/products/placement/${id}/chest_right.png`)).default;
        const images = { front, back };
        setImages({ ...images });
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };
    loadImages();
  }, [id]);

  const handleBothLayersForNumber = (e, handleFunction, index) => {
    handleFunction({ [2]: e });
    handleFunction({ [3]: e });
  };

  return (
    <div className={styles.numberWrap}>
      {children?.map((child, childIndex) => {
        if (childIndex === 2 || childIndex === 3) {
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
                <h3>Enter Number</h3>
                <TextField
                  type="number"
                  variant="outlined"
                  placeholder="Enter a number"
                  value={number[childIndex]}
                  size="small"
                  onChange={(e) =>
                    e.target.value.length < 4 &&
                    updateNumber({ [childIndex]: e.target.value })
                  }
                />

                <h3>Change Fonts</h3>
                <div className={styles.fontWrap}>
                  <motion.div
                    className={`${styles.fontItem1} ${
                      numberFont[childIndex] == 1 ? styles.selected : ""
                    }`}
                    onClick={() => updateNumberFont({ [childIndex]: 1 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F1 0123456789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem2} ${
                      numberFont[childIndex] == 2 ? styles.selected : ""
                    }`}
                    onClick={() => updateNumberFont({ [childIndex]: 2 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F2 0123456789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem3} ${
                      numberFont[childIndex] == 3 ? styles.selected : ""
                    }`}
                    onClick={() => updateNumberFont({ [childIndex]: 3 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F3 0123456789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem4} ${
                      numberFont[childIndex] == 4 ? styles.selected : ""
                    }`}
                    onClick={() => updateNumberFont({ [childIndex]: 4 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F4 0123456789
                  </motion.div>{" "}
                  <motion.div
                    className={`${styles.fontItem5} ${
                      numberFont[childIndex] == 5 ? styles.selected : ""
                    }`}
                    onClick={() => updateNumberFont({ [childIndex]: 5 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F5 0123456789
                  </motion.div>{" "}
                  <motion.div
                    className={`${styles.fontItem6} ${
                      numberFont[childIndex] == 6 ? styles.selected : ""
                    }`}
                    onClick={() => updateNumberFont({ [childIndex]: 6 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F6 0123456789
                  </motion.div>{" "}
                  <motion.div
                    className={`${styles.fontItem7} ${
                      numberFont[childIndex] == 7 ? styles.selected : ""
                    }`}
                    onClick={() => updateNumberFont({ [childIndex]: 7 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F7 0123456789
                  </motion.div>{" "}
                  <motion.div
                    className={`${styles.fontItem8} ${
                      numberFont[childIndex] == 8 ? styles.selected : ""
                    }`}
                    onClick={() => updateNumberFont({ [childIndex]: 8 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F8 0123456789
                  </motion.div>
                  <motion.div
                    className={`${styles.fontItem9} ${
                      numberFont[childIndex] == 9 ? styles.selected : ""
                    }`}
                    onClick={() => updateNumberFont({ [childIndex]: 9 })}
                    whileHover={{ scale: 1.02 }}
                  >
                    F9 0123456789
                  </motion.div>{" "}
                </div>
                <h3>Color & Outline</h3>
                <div className={styles.scaleAngleWrap}>
                  <div className={styles.sliderWrap}>
                    <span>Scale</span>
                    <Slider
                      min={0.1}
                      max={1}
                      step={0.1}
                      value={numberScale[childIndex]}
                      onChange={(e) => {
                        handleBothLayersForNumber(
                          e,
                          updateNumberScale,
                          childIndex
                        );
                        // updateNumberScale({ [childIndex]: e });
                      }}
                    />
                  </div>
                  <div className={styles.sliderWrap}>
                    <span>Rotate</span>
                    <Slider
                      min={0}
                      max={270}
                      step={30}
                      value={numberAngle[childIndex]}
                      onChange={(e) => {
                        handleBothLayersForNumber(
                          e,
                          updateNumberAngle,
                          childIndex
                        );
                        // updateNumberAngle({ [childIndex]: e });
                      }}
                    />
                  </div>
                </div>
                <div className={styles.fontColorWrap}>
                  <div className={styles.buttonWrap}>
                    <ThemeButton
                      onClick={() => setType({ [childIndex]: 1 })}
                      variant={type[childIndex] != 1 ? "outlined" : "contained"}
                    >
                      Color
                    </ThemeButton>
                    <ThemeButton
                      onClick={() => setType({ [childIndex]: 3 })}
                      variant={type[childIndex] != 3 ? "outlined" : "contained"}
                    >
                      Gradient
                    </ThemeButton>
                    <ThemeButton
                      onClick={() => setType({ [childIndex]: 2 })}
                      variant={type[childIndex] != 2 ? "outlined" : "contained"}
                    >
                      Outline
                    </ThemeButton>
                    {isNumberGradientColor && (
                      <div
                        className={styles.gradientViewer}
                        style={{
                          background: isNumberGradientColor
                            ? `linear-gradient(0deg, ${
                                numberColor || "transparent"
                              }, ${
                                numberGradientColor[childIndex] || "transparent"
                              })`
                            : numberColor,
                          height: 35,
                          width: 50,
                        }}
                        variant={"outlined"}
                      ></div>
                    )}
                  </div>

                  <div className={styles.colorPalletWrap}>
                    <div
                      className={styles.colorViewer}
                      style={{ backgroundColor: "transparent" }}
                      onClick={() => {
                        type[childIndex] == 1
                          ? updateNumberColor({ [childIndex]: "" })
                          : type[childIndex] == 3
                          ? updateNumberGradient({ [childIndex]: "" })
                          : updateNumberOutline({ [childIndex]: "" });

                        if (type[childIndex] == 3) {
                          updateIsNumberGradient(false);
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
                            updateIsNumberGradient(true);
                          }
                          type[childIndex] == 1
                            ? handleBothLayersForNumber(
                                itemColor,
                                updateNumberColor,
                                childIndex
                              )
                            : type[childIndex] == 3
                            ? handleBothLayersForNumber(
                                itemColor,
                                updateNumberGradient,
                                childIndex
                              )
                            : handleBothLayersForNumber(
                                itemColor,
                                updateNumberOutline,
                                childIndex
                              );
                        }}
                      >
                        {type[childIndex] == 1
                          ? numberColor[childIndex] === itemColor && (
                              <TickIcon />
                            )
                          : type[childIndex] == 3
                          ? numberGradientColor[childIndex] === itemColor && (
                              <TickIcon />
                            )
                          : numberOutline[childIndex] === itemColor && (
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
      {/* <Accordion onChange={handleChange("tab1")} expanded={expanded === "tab1"}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          + Add Number
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.addNumberWrap}>
            <div
              className={styles.colorViewer}
              style={{ backgroundColor: "transparent" }}
              onClick={() => updateNumberPosition(0)}
            >
              <CrossIcon />
            </div>
            <div className={styles.layers}>
              <div
                className={`${styles.imgWrap} ${
                  numberPosition === 1 ? styles.selected : ""
                }`}
                onClick={() => updateNumberPosition(1)}
              >
                <img src={images.front} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  numberPosition === 2 ? styles.selected : ""
                }`}
                onClick={() => updateNumberPosition(2)}
              >
                <img src={images.back} alt="" />
              </div>
            </div>
          </div>
          <input
            type="number"
            className={styles.numberInput}
            max="999"
            placeholder="Enter a number"
            value={number}
            onChange={(e) =>
              e.target.value.length < 4 && updateNumber(e.target.value)
            }
          />
        </AccordionDetails>
      </Accordion> */}

      {/* <Accordion onChange={handleChange("tab2")} expanded={expanded === "tab2"}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Change Font
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.fontWrap}>
            <motion.div
              className={`${styles.fontItem1} ${
                numberFont === 1 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(1)}
              whileHover={{ scale: 1.02 }}
            >
              F1 0123456789
            </motion.div>
            <motion.div
              className={`${styles.fontItem2} ${
                numberFont === 2 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(2)}
              whileHover={{ scale: 1.02 }}
            >
              F2 0123456789
            </motion.div>
            <motion.div
              className={`${styles.fontItem3} ${
                numberFont === 3 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(3)}
              whileHover={{ scale: 1.02 }}
            >
              F3 0123456789
            </motion.div>
            <motion.div
              className={`${styles.fontItem4} ${
                numberFont === 4 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(4)}
              whileHover={{ scale: 1.02 }}
            >
              F4 0123456789
            </motion.div>{" "}
            <motion.div
              className={`${styles.fontItem5} ${
                numberFont === 5 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(5)}
              whileHover={{ scale: 1.02 }}
            >
              F5 0123456789
            </motion.div>{" "}
            <motion.div
              className={`${styles.fontItem6} ${
                numberFont === 6 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(6)}
              whileHover={{ scale: 1.02 }}
            >
              F6 0123456789
            </motion.div>{" "}
            <motion.div
              className={`${styles.fontItem7} ${
                numberFont === 7 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(7)}
              whileHover={{ scale: 1.02 }}
            >
              F7 0123456789
            </motion.div>{" "}
            <motion.div
              className={`${styles.fontItem8} ${
                numberFont === 8 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(8)}
              whileHover={{ scale: 1.02 }}
            >
              F8 0123456789
            </motion.div>
            <motion.div
              className={`${styles.fontItem9} ${
                numberFont === 9 ? styles.selected : ""
              }`}
              onClick={() => updateNumberFont(9)}
              whileHover={{ scale: 1.02 }}
            >
              F9 0123456789
            </motion.div>{" "}
          </div>
        </AccordionDetails>
      </Accordion> */}

      {/* <Accordion onChange={handleChange("tab3")} expanded={expanded === "tab3"}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Color & Outline
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.fontColorWrap}>
            <div className={styles.buttonWrap}>
              <ThemeButton
                onClick={() => setType(1)}
                variant={type !== 1 ? "outlined" : "contained"}
              >
                Color
              </ThemeButton>
              <ThemeButton
                onClick={() => setType(3)}
                variant={type !== 3 ? "outlined" : "contained"}
              >
                Gradient
              </ThemeButton>
              <ThemeButton
                onClick={() => setType(2)}
                variant={type !== 2 ? "outlined" : "contained"}
              >
                Outline
              </ThemeButton>
              {isNumberGradientColor && (
                <div
                  className={styles.gradientViewer}
                  style={{
                    background: isNumberGradientColor
                      ? `linear-gradient(0deg, ${
                          numberColor || "transparent"
                        }, ${numberGradientColor || "transparent"})`
                      : numberColor,
                    height: 35,
                    width: 50,
                  }}
                  variant={"outlined"}
                ></div>
              )}
            </div>

            <div className={styles.colorPalletWrap}>
              <div
                className={styles.colorViewer}
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                  type === 1
                    ? updateNumberColor("")
                    : type === 3
                    ? updateNumberGradient("")
                    : updateNumberOutline("");

                  if (type === 3) {
                    updateIsNumberGradient(false);
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
                    if (type === 3) {
                      updateIsNumberGradient(true);
                    }
                    type === 1
                      ? updateNumberColor(itemColor)
                      : type === 3
                      ? updateNumberGradient(itemColor)
                      : updateNumberOutline(itemColor);
                  }}
                >
                  {type === 1
                    ? numberColor === itemColor && <TickIcon />
                    : type === 3
                    ? numberGradientColor === itemColor && <TickIcon />
                    : numberOutline === itemColor && <TickIcon />}
                </div>
              ))}
            </div>
          </div>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default Number;
