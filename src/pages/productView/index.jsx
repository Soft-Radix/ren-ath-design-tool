import { ThreeSixty, ZoomIn, ZoomOut } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Model as M1 } from "../../../public/models/M1/Flex-custom-board-shorts";
import { Model as M6 } from "../../../public/models/M6/Sleeveless-jersey";
import { Model as W1 } from "../../../public/models/W1/Long-sleeve-hitting-tees-with-hood";
import { Model as W2 } from "../../../public/models/W2/Long-sleeve-hitting-tees-without-hood";
import { Model as W3 } from "../../../public/models/W3/Long-sleeve-jersey2";
import { Model as W4 } from "../../../public/models/W4/Short-sleeve-hitting-tee";
import { Model as W6 } from "../../../public/models/W6/Sleeveless-jersey-with-sleeve";
import { Model as W7 } from "../../../public/models/W7/Sleeveless-jersey-without-sleeve";
import { Model as W8 } from "../../../public/models/W8/Sleeve-only";
import loaderGif from "../../assets/gif/loader.gif";
import { useProductStore } from "../../store";
import { handleZoomIn, handleZoomOut } from "../../utils/funtions";
import Header from "./header";
import styles from "./productView.module.scss";
import Color from "./propertiesContent/Color";
import Design from "./propertiesContent/Design";
import Gradient from "./propertiesContent/Gradient";
import Logo from "./propertiesContent/Logo";
import Name from "./propertiesContent/Name";
import Number from "./propertiesContent/Number";
import Pattern from "./propertiesContent/Pattern";
import Sidebar from "./sidebar";

// Component inside Canvas to handle snapshot capture
const CaptureControl = ({ captureRef }) => {
  const { gl, scene, camera } = useThree(); // Access Three.js renderer, scene, and camera
  const { updateSnapShotImage, callSnapShotFunc } = useProductStore(
    (store) => store
  );
  const capture = () => {
    gl.render(scene, camera); // Render the current scene

    // Capture the canvas as an image
    const imgData = gl.domElement.toDataURL("image/png");
    updateSnapShotImage(imgData);
    // // Trigger the download of the snapshot
    // const link = document.createElement("a");
    // link.href = imgData;
    // link.download = "snapshot.png";
    // link.click();
  };

  // Pass the capture function back through the ref
  useEffect(() => {
    captureRef.current = capture;
  }, [captureRef]);

  useEffect(() => {
    if (callSnapShotFunc) {
      capture();
    }
  }, [callSnapShotFunc]);
  
  return null; // No need to render anything, only logic here
};

const ProductView = () => {
  const orbitalRef = useRef();
  const captureRef = useRef(); // This ref will hold the capture function

  const { selectedSidebarItem, selectedSidebarItemName, modelLoading } =
    useProductStore((state) => state);
  const { id, updateOrbitalRef, modelRotation, handleModelRotation } =
    useProductStore((state) => state);

  const Loader = () => (
    <div className="modelLoader">
      <img src={loaderGif} alt="Loading..." />
    </div>
  );

  useEffect(() => {
    updateOrbitalRef(orbitalRef);
  }, [updateOrbitalRef]);

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.mainWrap}>
        <Sidebar />
        <div className={styles.rightWrap}>
          <Header />
          <div className={styles.contentWrap}>
            <div className={styles.propertiesWrap}>
              <div className={styles.title}>{selectedSidebarItemName}</div>
              <div className={styles.content}>
                {selectedSidebarItem === 0.9 ? (
                  <Design />
                ) : selectedSidebarItem === 1 ? (
                  <Color />
                ) : selectedSidebarItem === 1.1 ? (
                  <Pattern />
                ) : selectedSidebarItem === 2 ? (
                  <Number />
                ) : selectedSidebarItem === 3 ? (
                  <Name />
                ) : selectedSidebarItem === 5 ? (
                  <Logo />
                ) : selectedSidebarItem === 6 ? (
                  <Gradient />
                ) : null}
              </div>
            </div>
            <div className={styles.canvasWrap}>
              {modelLoading ? (
                <Loader />
              ) : (
                <Suspense fallback={<Loader />}>
                  <Canvas
                    style={{
                      backgroundColor: "#f0eeed",
                    }}
                  >
                    {/* Render different models based on the selected product ID */}
                    {id === "W1" || id === "M2" ? (
                      <W1 />
                    ) : id === "W2" || id === "M3" ? (
                      <W2 />
                    ) : id === "W4" || id === "M4" ? (
                      <W4 />
                    ) : id === "W6" ? (
                      <W6 />
                    ) : id === "W7" ? (
                      <W7 />
                    ) : id === "W8" ? (
                      <W8 />
                    ) : id === "M1" ? (
                      <M1 />
                    ) : id === "M6" ? (
                      <M6 />
                    ) : id === "W3" ? (
                      <W3 />
                    ) : null}
                    <ambientLight intensity={6} />
                    <OrbitControls
                      ref={orbitalRef}
                      minPolarAngle={Math.PI * 0.05}
                      maxPolarAngle={Math.PI * 0.55}
                      enableZoom={false}
                    />
                    {/* Add capture control inside the Canvas */}
                    <CaptureControl captureRef={captureRef} />
                  </Canvas>
                </Suspense>
              )}
              <ButtonGroup
                orientation="vertical"
                id="modelControls"
                aria-label="Vertical button group"
              >
                <Button
                  key="rotate"
                  className="btn1"
                  onClick={() => {
                    handleModelRotation(modelRotation + 20);
                  }}
                >
                  <ThreeSixty fontSize="large" />
                </Button>
                <Button
                  key="one"
                  className="btn2"
                  onClick={() => handleZoomIn(orbitalRef)}
                >
                  <ZoomIn fontSize="large" />
                </Button>
                <Button key="three" onClick={() => handleZoomOut(orbitalRef)}>
                  <ZoomOut fontSize="large" />
                </Button>
                {/* Capture button now works using the ref */}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
