import { motion } from "framer-motion";
import { CrossIcon, TickIcon } from "../../../assets/svg/icons";
import ThemeButton from "../../../components/common/ThemeButton";
import { colorList } from "../../../components/data/colors";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Slider from "rc-slider";
import React, { useEffect, useState } from "react";
import { useProductStore } from "../../../store";
import styles from "./properties.module.scss";

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
    setUpdatedNames,
    updatedNames,
    handleModelRotation,
    setNames,
    names,
  } = useProductStore((state) => state);

  const [type, setType] = useState({ 0: 1, 1: 1, 2: 1, 3: 1 });
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");
  const [namePositions, setNamePositions] = useState({});
  const [nameScales, setNameScales] = useState({});
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
        setImages({ front, back, chest_left, chest_right });
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };
    loadImages();
  }, [id]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addName = () => {
    const newName = name.toLocaleLowerCase();
    if (!names.includes(newName)) {
      setNames([...names, newName]);
      setName("");
    }
  };

  const updateNamesWithPosition = (key, name, index) => {
    const newNamePositions = { ...namePositions, [name]: key };
    const newNames = { ...updatedNames };

    if (!newNames[name]) {
      newNames[name] = { 1: [], 2: [], 3: [], 4: [] };
    }

    Object.keys(newNames[name]).forEach((k) => {
      if (k !== String(key)) {
        newNames[name][k] = newNames[name][k].filter((n) => n !== name);
      }
    });

    if (!newNames[name][key].includes(name)) {
      newNames[name][key] = [...newNames[name][key], name];
    }

    setNamePositions(newNamePositions);
    setUpdatedNames(newNames);
  };

  const updateNameScales = (name, scale, index) => {
    setNameScales({ ...nameScales, [name]: scale });
  };

  const handleDeleteName = (name, index) => {
    const newNames = names.filter((n) => n !== name);
    const { [name]: _, ...remainingNamePositions } = namePositions;
    const { [name]: __, ...remainingNameScales } = nameScales;
    const newUpdatedNames = { ...updatedNames };

    delete newUpdatedNames[name];

    setNames(newNames);
    setNamePositions(remainingNamePositions);
    setNameScales(remainingNameScales);
    setUpdatedNames(newUpdatedNames);
  };

  return (
    <div className={`${styles.numberWrap} ${styles.nameWrap}`}>
      {names.map((name, index) => (
        <Accordion
          key={name}
          onChange={handleChange(name)}
          expanded={expanded === name}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="subtitle1"
                textTransform={"capitalize"}
                fontSize={20}
              >
                {name}
              </Typography>
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => handleDeleteName(name, index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.layers}>
              <div
                className={`${styles.imgWrap} ${
                  namePositions[name] === 1 ? styles.selected : ""
                }`}
                onClick={() => {
                  handleModelRotation(0);
                  updateNamesWithPosition(1, name, index);
                }}
              >
                <img src={images.front} alt="front" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  namePositions[name] === 2 ? styles.selected : ""
                }`}
                onClick={() => {
                  handleModelRotation(180);
                  updateNamesWithPosition(2, name, index);
                  updateNameScale({ [name]: 4 });
                }}
              >
                <img src={images.back} alt="back" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  namePositions[name] === 3 ? styles.selected : ""
                }`}
                onClick={() => {
                  handleModelRotation(90);
                  updateNamesWithPosition(3, name, index);
                }}
              >
                <img src={images.chest_left} alt="chest left" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  namePositions[name] === 4 ? styles.selected : ""
                }`}
                onClick={() => {
                  handleModelRotation(270);
                  updateNamesWithPosition(4, name, index);
                }}
              >
                <img src={images.chest_right} alt="chest right" />
              </div>
            </div>

            <>
              <h3>Scale</h3>
              <div className={styles.scaleAngleWrap}>
                <div className={styles.sliderWrap}>
                  <span>Scale</span>
                  <Slider
                    min={
                      namePositions[name] === 2
                        ? 4
                        : namePositions[name] === 3 || namePositions[name] === 4
                        ? 3
                        : 1
                    }
                    max={
                      namePositions[name] === 3 || namePositions[name] === 4
                        ? 5
                        : 10
                    }
                    step={1}
                    value={nameScale[name]}
                    onChange={(e) => {
                      updateNameScale({ [name]: e });
                    }}
                  />
                </div>
              </div>
            </>

            <h3>Add Fonts</h3>
            <div className={styles.fontWrap}>
              <motion.div
                className={`${styles.fontItem1} ${
                  nameFont[name] == 1 ? styles.selected : ""
                }`}
                onClick={() => updateNameFont({ [name]: 1 })}
                whileHover={{ scale: 1.02 }}
              >
                F1 2345567789
              </motion.div>
              <motion.div
                className={`${styles.fontItem2} ${
                  nameFont[name] == 2 ? styles.selected : ""
                }`}
                onClick={() => updateNameFont({ [name]: 2 })}
                whileHover={{ scale: 1.02 }}
              >
                F2 2345567789
              </motion.div>
              <motion.div
                className={`${styles.fontItem3} ${
                  nameFont[name] == 3 ? styles.selected : ""
                }`}
                onClick={() => updateNameFont({ [name]: 3 })}
                whileHover={{ scale: 1.02 }}
              >
                F3 2345567789
              </motion.div>
              <motion.div
                className={`${styles.fontItem4} ${
                  nameFont[name] == 4 ? styles.selected : ""
                }`}
                onClick={() => updateNameFont({ [name]: 4 })}
                whileHover={{ scale: 1.02 }}
              >
                F4 2345567789
              </motion.div>
              <motion.div
                className={`${styles.fontItem5} ${
                  nameFont[name] == 5 ? styles.selected : ""
                }`}
                onClick={() => updateNameFont({ [name]: 5 })}
                whileHover={{ scale: 1.02 }}
              >
                F5 2345567789
              </motion.div>
              <motion.div
                className={`${styles.fontItem6} ${
                  nameFont[name] == 6 ? styles.selected : ""
                }`}
                onClick={() => updateNameFont({ [name]: 6 })}
                whileHover={{ scale: 1.02 }}
              >
                F6 2345567789
              </motion.div>
              <motion.div
                className={`${styles.fontItem7} ${
                  nameFont[name] == 7 ? styles.selected : ""
                }`}
                onClick={() => updateNameFont({ [name]: 7 })}
                whileHover={{ scale: 1.02 }}
              >
                F7 2345567789
              </motion.div>
              <motion.div
                className={`${styles.fontItem8} ${
                  nameFont[name] == 8 ? styles.selected : ""
                }`}
                onClick={() => updateNameFont({ [name]: 8 })}
                whileHover={{ scale: 1.02 }}
              >
                F8 2345567789
              </motion.div>
              <motion.div
                className={`${styles.fontItem9} ${
                  nameFont[name] == 9 ? styles.selected : ""
                }`}
                onClick={() => updateNameFont({ [name]: 9 })}
                whileHover={{ scale: 1.02 }}
              >
                F9 2345567789
              </motion.div>
            </div>
            {namePositions[name] !== 3 && namePositions[name] !== 4 && (
              <>
                <h3>Color & Outline</h3>{" "}
                <div className={styles.scaleAngleWrap}>
                  <div className={styles.sliderWrap}>
                    <span>Scale</span>
                    <Slider
                      min={0.1}
                      max={1}
                      step={0.01}
                      value={nameGradientScale[name]}
                      onChange={(e) => {
                        updateNameGradientScale({ [name]: e });
                      }}
                    />
                  </div>
                  <div className={styles.sliderWrap}>
                    <span>Rotate</span>
                    <Slider
                      min={0}
                      max={180}
                      step={5}
                      value={nameGradientAngle[name]}
                      onChange={(e) => {
                        updateNameGradientAngle({ [name]: e });
                      }}
                    />
                  </div>
                </div>
              </>
            )}
            <div className={styles.fontColorWrap}>
              <div className={styles.buttonWrap}>
                <ThemeButton
                  onClick={() => setType({ ...type, [name]: 1 })}
                  variant={type[name] != 1 ? "outlined" : "contained"}
                >
                  Color
                </ThemeButton>
                {namePositions[name] !== 3 && namePositions[name] !== 4 && (
                  <>
                    <ThemeButton
                      onClick={() => setType({ ...type, [name]: 3 })}
                      variant={type[name] != 3 ? "outlined" : "contained"}
                    >
                      Gradient
                    </ThemeButton>
                    <ThemeButton
                      onClick={() => setType({ ...type, [name]: 2 })}
                      variant={type[name] != 2 ? "outlined" : "contained"}
                    >
                      Outline
                    </ThemeButton>
                  </>
                )}
                <div
                  className={styles.gradientViewer}
                  style={{
                    background: isNameGradientColor
                      ? `linear-gradient(0deg, ${
                          nameColor[name] || "transparent"
                        }, ${nameGradientColor[name] || "transparent"})`
                      : nameColor[name],
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
                    type[name] == 1
                      ? updateNameColor({ [name]: "" })
                      : type[name] == 3
                      ? updateNameGradient({ [name]: "" })
                      : updateNameOutline({ [name]: "" });

                    if (type[name] == 3) {
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
                      if (type[name] == 3) {
                        updateIsNameGradient(true);
                      }
                      type[name] == 1
                        ? updateNameColor({ [name]: itemColor })
                        : type[name] == 3
                        ? updateNameGradient({ [name]: itemColor })
                        : updateNameOutline({ [name]: itemColor });
                    }}
                  >
                    {type[name] == 1
                      ? nameColor[name] === itemColor && <TickIcon />
                      : type[name] == 3
                      ? nameGradientColor[name] === itemColor && <TickIcon />
                      : nameOutline[name] === itemColor && <TickIcon />}
                  </div>
                ))}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box
        sx={{
          height: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Enter name"
          sx={{ paddingLeft: 2 }}
          onChange={(e) => setName(e.target.value)}
          value={name}
          size="small"
        />
        <IconButton aria-label="add" size="large" onClick={addName}>
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>
    </div>
  );
};

export default Name;
