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
const MyDesignList = () => {
  return (
    <div className={styles.designWrap}>
      {myDesignDataList?.map((design, index) => {
        return (
          <MyDesignCard
            img={design.img}
            status={design.status}
            title={design.name}
            key={design.name + index}
          />
        );
      })}
    </div>
  );
};

export default MyDesignList;
