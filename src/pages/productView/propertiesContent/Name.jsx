import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { CrossIcon, TickIcon } from "../../../assets/svg/icons";
import ThemeButton from "../../../components/common/ThemeButton";
import { useProductStore } from "../../../store";
import styles from "./properties.module.scss";

const Name = () => {
  const {
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
  } = useProductStore((state) => state);

  const colorList = [
    "#D14E24",
    "#EF7E15",
    "#E9ED23",
    "#AED124",
    "#D1AB24",
    "#85D124",
    "#24D169",
  ];

  const [type, setType] = useState(1);

  return (
    <div className={`${styles.numberWrap} ${styles.nameWrap}`}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          + Add Name
        </AccordionSummary>
        <AccordionDetails>
          <input
            className={styles.numberInput}
            placeholder="Enter name"
            value={modelName}
            onChange={(e) => updateName(e.target.value)}
          />

          <FormControl className={styles.textLayerWrap}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={namePosition}
              onChange={(e) => updateNamePosition(Number(e.target.value))}
            >
              <FormControlLabel value={1} control={<Radio />} label="Front" />
              <FormControlLabel value={2} control={<Radio />} label="Back" />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="Left Sleeve"
              />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label="Right Sleeve"
              />
            </RadioGroup>
          </FormControl>
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
              F1 2345567789
            </motion.div>
            <motion.div
              className={`${styles.fontItem3} ${
                nameFont === 3 ? styles.selected : ""
              }`}
              onClick={() => updateNameFont(3)}
              whileHover={{ scale: 1.02 }}
            >
              F1 2345567789
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
                  type === 1 ? updateNameColor("") : updateNameOutline("")
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
                      ? updateNameColor(itemColor)
                      : updateNameOutline(itemColor)
                  }
                >
                  {type === 1
                    ? nameColor === itemColor && <TickIcon />
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
