import React from "react";
import MyDesignCard from "./MyDesignCard";
import styles from "./MyDesignList.module.scss";

const MyDesignList = ({ designList, loadMyDesignListQuery }) => {
  return (
    <div className={styles.designWrap}>
      {designList?.list?.length > 0 &&
        designList?.list?.map((design, index) => {
          return (
            <MyDesignCard
              img={design.cover_photo ? design?.cover_photo : ""}
              status={design.is_finalized}
              title={design.design_name}
              key={design.id}
              id={design?.id}
              loadMyDesignListQuery={loadMyDesignListQuery}
            />
          );
        })}
    </div>
  );
};

export default MyDesignList;
