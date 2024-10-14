import React, { useContext, useEffect } from "react";
import { InputField } from "../../components/common/InputField/InputField";
import ThemeButton from "../../components/common/ThemeButton";
import styles from "../../scss/pages/auth.module.scss";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginValSchema } from "../../validations/AuthSchema";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAdminLocalInfo, setAdminLocalData } from "../../utils/common";
import useFetchAdmin from "../../hook/CustomHook/useFetchAdmin";
const Login = () => {
  const { setAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loadQuery, { response, loading, error, credentialsMatch }] =
    useFetchAdmin("/auth/login", {
      method: "post",
    });

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
      setAdminLocalData(response.data);
      setAdmin(response.data.user);
      toast.success("Admin login successfully");
        navigate("/admin/dashboard");
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

  const admin = getAdminLocalInfo();

  useEffect(() => {
    if (admin && admin.role_id === 1) {
      navigate("/admin/dashboard");
    }
  }, []);

  return (
    <AuthLayout
      title="Log In"
      subtitle="Please fill in the details below to log-in to your account."
    >
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.form_wrapper}>
            <div className={styles.field_wrapper}>
              <InputField
                required
                label="Email"
                placeholder="Enter email"
                type="email"
                formik={formik}
                name="email"
              />
              <InputField
                required
                label="Password"
                formik={formik}
                type="password"
                placeholder="Enter password"
                name="password"
              />
            </div>
            <div className={styles.btn_wrap}>
              <ThemeButton fullWidth type="submit">
                {/* {loading && <LoadingBars />} */}
                Log In
              </ThemeButton>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
