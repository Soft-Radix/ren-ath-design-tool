import React, { useContext, useEffect } from "react";
import styles from "./login.module.scss";
import { InputField } from "../../components/common/InputField/InputField";
import ThemeButton from "../../components/common/ThemeButton";
import { useFormik } from "formik";
import { loginValSchema } from "../../validations/AuthSchema";
import useFetch from "../../hook/CustomHook/usefetch";
import {
  getUserColorPelleteTemporary,
  setUserColorPellete,
  setUserLocalData,
} from "../../utils/common";
import { toast } from "react-toastify";
import LoadingBars from "../../components/common/loader/LoadingBars";
import { AuthContext } from "../../contexts/AuthContext";
import { useProductStore } from "../../store";
const Login = ({ setIsOpen }) => {
  const { setUser } = useContext(AuthContext);
  const [loadQuery, { response, loading, error, credentialsMatch }] = useFetch(
    "/auth/login",
    {
      method: "post",
    }
  );
  // fecth api to save user color pellete list
  const [saveColorPelleteQuery] = useFetch("/color-palette/add", {
    method: "post",
  });

  const [
    loadColorListQuery,
    { response: colorReponse, loading: colorLoading, error: colorError },
  ] = useFetch("/color-palette/detail", {
    method: "get",
  });
  const { handleUpdateCollorPellteCollection } = useProductStore(
    (store) => store
  );

  const handleUploadTempColorPellete = (preColors, TempColors) => {
    const combinedColor = [...preColors, ...TempColors];
    saveColorPelleteQuery({ color_palette: combinedColor.join(",") });
    localStorage.removeItem("colorPelleteCollectionTemporary");
    loadColorListQuery();
  };

  const handleLogin = (values) => {
    loadQuery(values);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  useEffect(() => {
    toast.dismiss();

    if (response) {
      setUserColorPellete(response?.data?.user?.color_palette);
      handleUpdateCollorPellteCollection(response?.data?.user?.color_palette);
      setUserLocalData(response.data);
      const getTempColors = getUserColorPelleteTemporary();
      if (getTempColors?.length > 0) {
        handleUploadTempColorPellete(
          response?.data?.user?.color_palette,
          getTempColors
        );
      }
      toast.error(credentialsMatch);
      setUser(response.data.user);
      toast.success(response.message);
      setIsOpen(false);
    }

    if (credentialsMatch) {
      toast.error(credentialsMatch);
    }

    if (error) {
      const toastId = toast.error(error.message);
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [response, error, credentialsMatch]);

  useEffect(() => {
    if (colorReponse?.data) {
      setUserColorPellete(colorReponse.data?.color_palette);
      handleUpdateCollorPellteCollection(colorReponse.data?.color_palette);
    }
  }, [colorReponse, colorError]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.loginWrapper}>
        <div className={styles.formControl}>
          <InputField
            label="Email"
            name="email"
            type="email"
            formik={formik}
            placeholder="Enter email"
            fullWidth
          />
        </div>
        <div className={styles.formControl}>
          <InputField
            label="Password"
            name="password"
            type="password"
            formik={formik}
            placeholder="Enter password"
            fullWidth
          />
        </div>
        <div className={styles.formControl}>
          <ThemeButton
            sx={{ width: "100%", alignItem: "center", display: "flex" }}
            type="submit"
            disabled={loading}
          >
            {loading && <LoadingBars />} Login Your Account
          </ThemeButton>
        </div>
      </div>
    </form>
  );
};

export default Login;
