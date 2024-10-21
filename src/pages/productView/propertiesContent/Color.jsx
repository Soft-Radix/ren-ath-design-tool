import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useEffect } from "react";
import { Color as ParceColor } from "three";
import { CrossIcon, TickIcon } from "../../../assets/svg/icons";
import useGetColorPelleteList from "../../../hook/CustomHook/useGetColorPelleteList";
import { useProductStore } from "../../../store";
import {
  handleAddNewUniform,
  modelRotationValue,
} from "../../../utils/funtions";
import styles from "./properties.module.scss";

const Color = () => {
  const colorList = useGetColorPelleteList();
  const ref = useProductStore((state) => state.ref);
  const children = ref?.current?.children || [];
  const {
    color,
    updateColor,
    updateColorIndex,
    updateLayer,
    handleDesignColor,
    designColor,
    patternColor,
    handlePatternColor,
    handleIsDesignGradientEnabled,
    handleModelRotation,orbitalRef
  } = useProductStore((state) => state);

  const [expanded, setExpanded] = React.useState(false > false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    handleAddNewUniform("color", {
      color,
      designColor,
      patternColor,
    });
  }, [color, designColor, patternColor]);

  return (
    <div className={styles.colorWrap}>
      {children?.map((item, childIndex) => (
        <Accordion
          key={item.uuid}
          onChange={handleChange(item?.uuid)}
          expanded={expanded === item?.uuid}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() => {
              orbitalRef.current.reset();
              const camera = orbitalRef.current.object;
              camera.zoom /= 1.1; // Adjust zoom factor as needed
              camera.updateProjectionMatrix();
              orbitalRef.current.update();
              handleModelRotation(modelRotationValue(childIndex));
              camera.position.set(0, 2, 8); // Set x, y, z positions
            }}
          >
            <div
              className={`${styles.colorViewer} ${styles.mainColorViewer}`}
              style={{ backgroundColor: color[childIndex] }}
            />
            {item.name}
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.colorPalletWrap}>
              <div
                className={styles.colorViewer}
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                  if (childIndex == 0 || childIndex % 2 === 0) {
                    item.material.color = new ParceColor(0xffffff);
                    children[childIndex + 1].material.color = new ParceColor(
                      0xffffff
                    );
                    updateColor({ [childIndex]: null, [childIndex + 1]: null });
                  } else {
                    updateColor({ [childIndex]: null });
                    item.material.color = new ParceColor(0xffffff);
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
                    updateColorIndex(childIndex);
                    // updateLayer(childIndex);
                    if (childIndex == 0 || childIndex % 2 === 0) {
                      updateColor({
                        [childIndex]: itemColor,
                        [childIndex + 1]: itemColor,
                      });
                      item.material.color = new ParceColor(itemColor);
                      children[childIndex + 1].material.color = new ParceColor(
                        itemColor
                      );
                    } else {
                      updateColor({
                        [childIndex]: itemColor,
                      });
                      item.material.color = new ParceColor(itemColor);
                    }
                  }}
                >
                  {color[childIndex] && color[childIndex] === itemColor && (
                    <TickIcon />
                  )}
                </div>
              ))}
            </div>

            <div className={styles.colorPalletWrap}>
              <div>
                <h4>Pattern Colors</h4>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  {colorList.map((itemColor, index) => (
                    <div
                      key={index}
                      className={styles.colorViewer}
                      style={{ backgroundColor: itemColor }}
                      onClick={() => {
                        handlePatternColor({ [childIndex]: itemColor });
                      }}
                    >
                      {patternColor[childIndex] &&
                        patternColor[childIndex] === itemColor && <TickIcon />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.colorPalletWrap}>
              <div>
                <h3>Design Color</h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  {colorList.map((itemColor, index) => (
                    <div
                      key={index}
                      className={styles.colorViewer}
                      style={{ backgroundColor: itemColor }}
                      onClick={() => {
                        handleDesignColor({ [childIndex]: itemColor });
                        handleIsDesignGradientEnabled(false);
                      }}
                    >
                      {designColor[childIndex] &&
                        designColor[childIndex] === itemColor && <TickIcon />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* <Accordion
        onChange={handleChange("design")}
        expanded={expanded === "design"}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div
            className={`${styles.colorViewer} ${styles.mainColorViewer}`}
            style={{ backgroundColor: "" }}
          />
          Design Colors
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.colorPalletWrap}>
            
            {colorList.map((itemColor, index) => (
              <div
                key={index}
                className={styles.colorViewer}
                style={{ backgroundColor: itemColor }}
                onClick={() => {
                  handleDesignColor(itemColor);
                  handleIsDesignGradientEnabled(false);
                }}
              >
                {designColor && designColor === itemColor && <TickIcon />}
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default Color;
