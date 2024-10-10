import { useNavigate } from "react-router-dom";
import { BackButtonIcon, ShareButton } from "../../../assets/svg/icons";
import ThemeButton from "../../../components/common/ThemeButton";
import { useProductStore } from "../../../store";
import { saveUniformDesign } from "../../../utils/funtions";
import styles from "./header.module.scss";
import useFetch from "../../../hook/CustomHook/usefetch";

const Header = () => {
  const productName = useProductStore((state) => state.name);
  const { editedDesignId, editDesignData } = useProductStore((state) => state);

  const navigate = useNavigate();
  const [saveUniformQuery, { saveResponse, saveLoading, saveError }] = useFetch(
    "/design/add",
    {
      method: "post",
    }
  );

  const [editUniformQuery, { editResponse, editLoading, editError }] = useFetch(
    `/design/edit/${editedDesignId}`,
    {
      method: "post",
    }
  );

  const handleSaveUniform = () => {
    const saveData = saveUniformDesign(editedDesignId ? editDesignData : "");
    if (editedDesignId) {
      editUniformQuery({
        ...saveData,
        style_code: "110052",
        cover_photo: "5521.png",
      });
    } else {
      saveUniformQuery({
        ...saveData,
        design_name: Math.random() + "design",
        style_code: "110052",
        cover_photo: "5521.png",
      });
    }
  };

  return (
    <div className={styles.mainWrap}>
      <div className={styles.leftWrap}>
        <span onClick={() => navigate(-1)}>
          <BackButtonIcon />
        </span>
        <span className={styles.title}>{productName}</span>
      </div>
      <div className={styles.rightWrap}>
        <ShareButton />
        <ThemeButton
          onClick={() => {
            handleSaveUniform();
            // navigate("/");
          }}
        >
          Save
        </ThemeButton>
      </div>
    </div>
  );
};

export default Header;
