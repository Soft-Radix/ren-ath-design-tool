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
  } = useProductStore((state) => state);
  console.log("🚀 ~ Number ~ id:", id);

  // const colorList = [
  //   "#D14E24",
  //   "#EF7E15",
  //   "#E9ED23",
  //   "#AED124",
  //   "#D1AB24",
  //   "#85D124",
  //   "#24D169",
  // ];

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
        console.log("🚀 ~ loadImages ~ front:", front);
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

  return (
    <div className={styles.numberWrap}>
      <Accordion>
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
              {/* <div
                className={`${styles.imgWrap} ${
                  numberPosition === 3 ? styles.selected : ""
                }`}
                onClick={() => updateNumberPosition(3)}
              >
                <img src={images.chest_left} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  numberPosition === 4 ? styles.selected : ""
                }`}
                onClick={() => updateNumberPosition(4)}
              >
                <img src={images.chest_right} alt="" />
              </div> */}
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
      </Accordion>

      <Accordion>
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
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Color & Outline
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.fontColorWrap}>
            <div className={styles.buttonWrap}>
              <ThemeButton
                onClick={() => setType(1)}
                variant={type === 2 ? "outlined" : "contained"}
              >
                Color
              </ThemeButton>
              <ThemeButton
                onClick={() => setType(2)}
                variant={type === 1 ? "outlined" : "contained"}
              >
                Outline
              </ThemeButton>
            </div>

            <div className={styles.colorPalletWrap}>
              <div
                className={styles.colorViewer}
                style={{ backgroundColor: "transparent" }}
                onClick={() =>
                  type === 1 ? updateNumberColor("") : updateNumberOutline("")
                }
              >
                <CrossIcon />
              </div>
              {colorList.map((itemColor, index) => (
                <div
                  key={index}
                  className={styles.colorViewer}
                  style={{ backgroundColor: itemColor }}
                  onClick={() =>
                    type === 1
                      ? updateNumberColor(itemColor)
                      : updateNumberOutline(itemColor)
                  }
                >
                  {type === 1
                    ? numberColor === itemColor && <TickIcon />
                    : numberOutline === itemColor && <TickIcon />}
                </div>
              ))}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Number;
