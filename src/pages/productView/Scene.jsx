import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Model as M1 } from "../../../public/models/M1/Flex-custom-board-shorts";
import { Model as M6 } from "../../../public/models/M6/Sleeveless-jersey";
import { Model as W1 } from "../../../public/models/W1/Long-sleeve-hitting-tees-with-hood";
import { Model as W2 } from "../../../public/models/W2/Long-sleeve-hitting-tees-without-hood";
import { Model as W4 } from "../../../public/models/W4/Short-sleeve-hitting-tee";
import { Model as W6 } from "../../../public/models/W6/Sleeveless-jersey-with-sleeve";
import { Model as W7 } from "../../../public/models/W7/Sleeveless-jersey-without-sleeve";
import { Model as W8 } from "../../../public/models/W8/Sleeve-only";
import { Model as W3 } from "../../../public/models/W3/Long-sleeve-jersey2";
import loaderGif from "../../assets/gif/loader.gif";
import { useProductStore } from "../../store";

const Scene = () => {
  const productId = useProductStore((state) => state.id);
  // console.log("🚀 ~ Scene ~ productId:", productId);

  const Loader = () => {
    return (
      <div className="modelLoader">
        <img src={loaderGif} alt="" />
      </div>
    );
  };

  return (
    <Suspense fallback={<Loader />}>
      <Canvas>
        {productId === "W1" || productId === "M2" ? (
          <W1 />
        ) : productId === "W2" || productId === "M3" ? (
          <W2 />
        ) : productId === "W4" || productId === "M4" ? (
          <W4 />
        ) : productId === "W6" ? (
          <W6 />
        ) : productId === "W7" ? (
          <W7 />
        ) : productId === "W8" ? (
          <W8 />
        ) : productId === "M1" ? (
          <M1 />
        ) : productId === "M6" ? (
          <M6 />
        ) : productId === "W3" ? (
          <W3 />
        ) : null}

        {/* <Grid position={[0, -0.01, 0]} args={[15, 15]} />
        <axesHelper args={[8]} /> */}

        {/* <ambientLight intensity={6} />
        <OrbitControls
          minPolarAngle={Math.PI * 0.35}
          maxPolarAngle={Math.PI * 0.55}
          enableZoom={false}
        /> */}
      </Canvas>
    </Suspense>
  );
};

export default Scene;
