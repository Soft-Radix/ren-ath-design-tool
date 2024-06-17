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
  } = useProductStore((state) => state);
  const [expanded, setExpanded] = React.useState(false > false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [type, setType] = useState(1);
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

  const checkIfName = () => {
    if (modelName === "") {
      updateName("Last Name");
    } else {
      updateName(modelName);
    }
  };
  return (
    <div className={`${styles.numberWrap} ${styles.nameWrap}`}>
      <Accordion onChange={handleChange("tab1")} expanded={expanded === "tab1"}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          + Add Name
        </AccordionSummary>
        <AccordionDetails>
          <div className={`${styles.textLayerWrap} ${styles.addNumberWrap}`}>
            <div className={styles.layers}>
              <div
                className={`${styles.imgWrap} ${
                  namePosition === 1 ? styles.selected : ""
                }`}
                onClick={() => {
                  checkIfName();
                  updateNamePosition(1);
                }}
              >
                <img src={images.front} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  namePosition === 2 ? styles.selected : ""
                }`}
                onClick={() => {
                  checkIfName();
                  updateNamePosition(2);
                }}
              >
                <img src={images.back} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  namePosition === 3 ? styles.selected : ""
                }`}
                onClick={() => {
                  checkIfName();
                  updateNamePosition(3);
                }}
              >
                <img src={images.chest_left} alt="left sleeve" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  namePosition === 4 ? styles.selected : ""
                }`}
                onClick={() => {
                  checkIfName();
                  updateNamePosition(4);
                }}
              >
                <img src={images.chest_right} alt="right sleeve" />
              </div>
            </div>
          </div>
          <input
            className={styles.numberInput}
            placeholder="Enter name"
            value={modelName}
            onChange={(e) => updateName(e.target.value)}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion onChange={handleChange("tab2")} expanded={expanded === "tab2"}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Change Font
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.fontWrap}>
            <motion.div
              className={`${styles.fontItem1} ${
                nameFont === 1 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(1)}
              whileHover={{ scale: 1.02 }}
            >
              F1 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem2} ${
                nameFont === 2 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(2)}
              whileHover={{ scale: 1.02 }}
            >
              F2 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem3} ${
                nameFont === 3 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(3)}
              whileHover={{ scale: 1.02 }}
            >
              F3 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem4} ${
                nameFont === 4 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(4)}
              whileHover={{ scale: 1.02 }}
            >
              F4 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem5} ${
                nameFont === 5 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(5)}
              whileHover={{ scale: 1.02 }}
            >
              F5 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem6} ${
                nameFont === 6 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(6)}
              whileHover={{ scale: 1.02 }}
            >
              F6 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem7} ${
                nameFont === 7 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(7)}
              whileHover={{ scale: 1.02 }}
            >
              F7 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem8} ${
                nameFont === 8 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(8)}
              whileHover={{ scale: 1.02 }}
            >
              F8 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem9} ${
                nameFont === 9 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(9)}
              whileHover={{ scale: 1.02 }}
            >
              F9 2345567789
            </motion.div>{" "}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion onChange={handleChange("tab3")} expanded={expanded === "tab3"}>
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
              <div
                className={styles.gradientViewer}
                style={{
                  background: isNameGradientColor
                    ? `linear-gradient(0deg, ${nameColor || "transparent"}, ${
                        nameGradientColor || "transparent"
                      })`
                    : nameColor,
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
                  type === 1
                    ? updateNameColor("")
                    : type === 3
                    ? updateNameGradient("")
                    : updateNameOutline("");

                  if (type === 3) {
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
                    if (type === 3) {
                      updateIsNameGradient(true);
                    }
                    type === 1
                      ? updateNameColor(itemColor)
                      : type === 3
                      ? updateNameGradient(itemColor)
                      : updateNameOutline(itemColor);
                  }}
                >
                  {type === 1
                    ? nameColor === itemColor && <TickIcon />
                    : type === 3
                    ? nameGradientColor === itemColor && <TickIcon />
                    : nameOutline === itemColor && <TickIcon />}
                </div>
              ))}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Name;
