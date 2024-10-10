import React from "react";
import styles from "./MyDesignList.module.scss";
import mydesign1 from "../../assets/images/myDesign1.png";
import mydesign2 from "../../assets/images/myDesign2.png";
import MyDesignCard from "./MyDesignCard";
const myDesignDataList = [
  {
    name: "Long Sleeve Hitting Tees with Hood",
    img: mydesign1,
    status: 1,
  },
  {
    name: "Long Sleeve Hitting Tees with Hood",
    img: mydesign2,
    status: 0,
  },
  {
    name: "Long Sleeve Hitting Tees with Hood",
    img: mydesign1,
    status: 1,
  },
  {
    name: "Long Sleeve Hitting Tees with Hood",
    img: mydesign2,
    status: 0,
  },
  {
    name: "Long Sleeve Hitting Tees with Hood",
    img: mydesign1,
    status: 0,
  },
  {
    name: "Long Sleeve Hitting Tees with Hood",
    img: mydesign2,
    status: 0,
  },
];

const MyDesignList = ({ designList }) => {
  console.log("🚀 ~ MyDesignList ~ designList:", designList);
  return (
    <div className={styles.designWrap}>
      {designList?.list?.length > 0 &&
        designList?.list?.map((design, index) => {
          return (
            <MyDesignCard
              img={mydesign1}
              status={design.is_finalized}
              title={design.design_name}
              key={design.id}
              id={design?.id}
            />
          );
        })}
    </div>
  );
};

export default MyDesignList;
