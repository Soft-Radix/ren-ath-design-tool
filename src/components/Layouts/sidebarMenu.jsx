/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../scss/layout/sidebarMenu.module.scss";

const SidebarMenuList = ({ ListData, filled, type }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [listing, setListing] = useState([]);
  const activeMenu = (item) => {
    if (item?.path === pathname) {
      return styles.active;
    } else if (item?.path === pathname && item?.bgNone) {
      return styles.active1;
    } else {
      return "";
    }
  };
  useEffect(() => {
    const list = [...listing];
    list?.map((obj) => {
      const containsActive = obj?.subMenu?.length
        ? obj?.subMenu?.filter((data) => data?.path === pathname)
        : [];
      containsActive?.length ? (obj.opened = true) : (obj.opened = false);
    });
    setListing(list);
  }, []);

  useEffect(() => {
    setListing(ListData);
  }, [ListData]);
  return (
    <div className={type ? styles.menu_list1 : styles.menu_list}>
      {listing &&
        listing?.map((item, index) => (
          <div
            className={`${styles.menu} ${activeMenu(item)}  ${
              item.opened ? styles.opened : ""
            }`}
            key={item.id}
          >
            <div
              className={styles.menu_button}
              onClick={() => {
                navigate(item.path);
              }}
            >
              {item?.bgNone ? (
                <div className={styles.btn_content}>
                  <span className={item?.style ? "add_Icon_Style" : ""}>
                    {item.icon ? item?.icon : <img src={item?.img} alt="" />}
                  </span>
                  {item.title}
                </div>
              ) : (
                <div className={styles.btn_content1}>
                  <span>
                    {item.icon ? item?.icon : <img src={item?.img} alt="" />}
                  </span>
                  {item.title}
                </div>
              )}
              {filled ? (
                <span className={styles.dropIcon_filled}>{arrowDownIcon}</span>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SidebarMenuList;
