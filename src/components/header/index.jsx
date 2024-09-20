import { Container } from "@mui/material";
import mainLogo from "../../assets/images/mainLogo.png";
import ThemeButton from "../common/ThemeButton";
import styles from "./header.module.scss";
import ModalLayout from "../common/ModalLayout/ModalLayout";
import { useContext, useState } from "react";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import ForgotPassword from "../../pages/ForgotPassword";
import { AuthContext } from "../../contexts/AuthContext";
import AccountMenu from "../common/AccountMenu";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("login"); // login, signUp, forgot-password
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className={styles.mainWrap}>
      <Container maxWidth="xl">
        <div className={styles.innerWrap}>
          <img src={mainLogo} alt="" className={styles.mainLogo} />
          <div className={styles.buttonsWrap}>
            {user ? (
              <AccountMenu />
            ) : (
              <>
                <ThemeButton
                  onClick={() => {
                    setIsOpen(true);
                    setActiveModal("login");
                  }}
                >
                  Log In
                </ThemeButton>
                <ThemeButton
                  variant="outlined"
                  onClick={() => {
                    setIsOpen(true);
                    setActiveModal("signUp");
                  }}
                >
                  Sign Up
                </ThemeButton>
              </>
            )}
          </div>
        </div>
      </Container>
      <ModalLayout isOpen={isOpen} onClose={handleClose}>
        <div className={styles.logoWrapper}>
          <img src={mainLogo} alt="" />
          <div className={styles.headerTitle}>
            <h2>
              {activeModal === "login"
                ? "Login to REN Athletics"
                : activeModal === "signUp"
                ? "Sign Up"
                : activeModal === "forgot-password"
                ? "Forgot Password"
                : ""}
            </h2>
            <p>
              {activeModal === "login"
                ? "Please fill the below details to login your account."
                : activeModal === "signUp"
                ? "Please fill the below to continue."
                : activeModal === "forgot-password"
                ? "Please fill the email below and we will send you a link to reset your password."
                : ""}
            </p>
          </div>
        </div>
        {activeModal === "login" ? (
          <Login setIsOpen={setIsOpen} />
        ) : activeModal === "signUp" ? (
          <SignUp setIsOpen={setIsOpen} />
        ) : activeModal === "forgot-password" ? (
          <ForgotPassword setIsOpen={setIsOpen} />
        ) : (
          ""
        )}
        <div className={styles.footerModal}>
          {activeModal === "login" ? (
            <a
              onClick={() => {
                setActiveModal("forgot-password");
              }}
            >
              Forgot Password?
            </a>
          ) : (
            ""
          )}
        </div>
      </ModalLayout>
    </div>
  );
};

export default Header;
