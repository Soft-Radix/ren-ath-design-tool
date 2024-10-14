import { useNavigate } from "react-router-dom";
import styles from "./../../scss/layout/Sidebar.module.scss";
import SidebarMenuList from "./sidebarMenu";
import mainLogo from "../../assets/images/mainLogo.png";
import {
  dashboardIcon,
  DesignsIcon,
  menuToggleClose,
  UserIcon,
} from "../../assets/icons/icons";

/**
 *
 * @param role 1 For Admin, 2 For Sales Representative and 3 For (Club Owner or Director)
 * @returns
 */
const Sidebar = () => {
  const navigate = useNavigate();
  const initialData = [
    {
      id: 1,
      title: "Dashboard",
      icon: dashboardIcon,
      path: "/admin/dashboard",
      opened: false,
      subMenu: [],
    },
    {
      id: 2,
      title: "Users",
      icon: <UserIcon />,
      path: "/admin/users",
      opened: false,
    },
    {
      id: 3,
      title: "Designs",
      icon: <DesignsIcon />,
      path: "/admin/designs",
      opened: false,
    },
  ];

  const handleSideBarToggle = () => {};

  return (
    <div className={styles.sidebarList}>
      <div className={styles.logo}>
        <img
          src={mainLogo}
          alt="logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/dashboard")}
        />
        <div className={styles.toggleSidebar}>
          <button onClick={handleSideBarToggle} className={styles.btnClose}>
            {menuToggleClose}
          </button>
        </div>
      </div>
      <SidebarMenuList ListData={initialData} />
    </div>
  );
};

export default Sidebar;
