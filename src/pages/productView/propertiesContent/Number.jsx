import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import styles from "./properties.module.scss";
import { CrossIcon } from "../../../assets/svg/icons";
import front from "../../../assets/images/products/placement/front.png";
import back from "../../../assets/images/products/placement/back.png";
import chest_left from "../../../assets/images/products/placement/chest_left.png";
import chest_right from "../../../assets/images/products/placement/chest_right.png";
import { useProductStore } from "../../../store";
import "../../../assets/fonts/Roboto.ttf";
import "../../../assets/fonts/BebasNeue.ttf";
import "../../../assets/fonts/BungeeSpice.ttf";
import "../../../assets/fonts/TiltNeon.ttf";
import { motion } from "framer-motion";

const Number = () => {
  const {
    number,
    updateNumber,
    numberPosition,
    updateNumberPosition,
    font,
    updateFont,
  } = useProductStore((state) => state);

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
                <img src={front} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  numberPosition === 2 ? styles.selected : ""
                }`}
                onClick={() => updateNumberPosition(2)}
              >
                <img src={back} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  numberPosition === 3 ? styles.selected : ""
                }`}
                onClick={() => updateNumberPosition(3)}
              >
                <img src={chest_left} alt="" />
              </div>
              <div
                className={`${styles.imgWrap} ${
                  numberPosition === 4 ? styles.selected : ""
                }`}
                onClick={() => updateNumberPosition(4)}
              >
                <img src={chest_right} alt="" />
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
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Change Font
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.fontWrap}>
            <motion.div
              className={`${styles.fontItem1} ${
                font === 1 ? styles.selected : ""
              }`}
              onClick={() => updateFont(1)}
              whileHover={{ scale: 1.02 }}
            >
              F1 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem2} ${
                font === 2 ? styles.selected : ""
              }`}
              onClick={() => updateFont(2)}
              whileHover={{ scale: 1.02 }}
            >
              F1 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem3} ${
                font === 3 ? styles.selected : ""
              }`}
              onClick={() => updateFont(3)}
              whileHover={{ scale: 1.02 }}
            >
              F1 2345567789
            </motion.div>{" "}
            <motion.div
              className={`${styles.fontItem4} ${
                font === 4 ? styles.selected : ""
              }`}
              onClick={() => updateFont(4)}
              whileHover={{ scale: 1.02 }}
            >
              F1 2345567789
            </motion.div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Number;
