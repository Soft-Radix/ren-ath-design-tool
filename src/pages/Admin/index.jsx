import React from "react";
import { InputField } from "../../components/common/InputField/InputField";
import ThemeButton from "../../components/common/ThemeButton";
import styles from "../../scss/pages/auth.module.scss";
import AuthLayout from "../../components/Layouts/AuthLayout";

const Login = () => {
  return (
    <AuthLayout
      title="Log In"
      subtitle="Please fill in the details below to log-in to your account."
    >
      <div>
        <form>
          <div className={styles.form_wrapper}>
            <div className={styles.field_wrapper}>
              <InputField
                required
                label="Email"
                placeholder="Enter email"
                name="email"
              />
              <InputField
                required
                label="Password"
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
