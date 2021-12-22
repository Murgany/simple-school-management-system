import React, { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navbar";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollToTop from "./components/Scroller";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const App = () => {
  const { t, i18n } = useTranslation();
  const loggedInSession = sessionStorage.getItem("token");

  useEffect(() => {
    //userInfo()
    document.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <Container className="App bg-dark" fluid>
      <Row className="bg-dark">
        <Router>
          <Row className="bg-dark m-0 p-0">
            <Navigation />
          </Row>

          {!loggedInSession ? (
            <Container className="bg-dark">
              <Row className="main-text-color justify-content-center">
                <Row className="blu-b blu-bg pt-5" style={{ height: "100%" }}>
                  <h3 className="center-text text-dark header-font">
                    A&nbsp; SIMPLE&nbsp; STUDENT&nbsp; MANAGEMENT&nbsp; SYSTEM
                  </h3>
                  <h6 className="center-text text-dark header-fon">
                    ...that actually works
                  </h6>
                  {/*<img
                    src="Screenshot.png"
                    alt="screenshot"
                    style={{
                      width: "88%",
                      height: "70",
                      borderRadius: "3px",
                      marginTop: "4%",
                    }}
                  />*/}
                </Row>

                <Row className="mt-4" style={{ width: "88%" }}>
                  <h4 className="main headers text-light">
                    {t("hello_and_welcome")}
                  </h4>
                  <p>{t("welcome_msg")}</p>
                </Row>

                <div className="main-text-color custom-view mt-4">
                  <h5 className="center-text">
                    <strong className="headers text-light">
                      {t("intro_h")}
                    </strong>
                  </h5>

                  <p>
                    {t("intro_msg")}
                    <a
                      href="/LoginForm"
                      id="navSwitch"
                      style={{ textDecoration: "None" }}
                    >
                      {" "}
                      {t("login")}{" "}
                    </a>{" "}
                    {t("or")}{" "}
                    <a href="LoginForm" id="navSwitch">
                      {" "}
                      {t("signup")}.
                    </a>{" "}
                    {t("intro_2")}{" "}
                    <a
                      className="App-link"
                      href="mailto:virtua_web@outlook.com"
                    >
                      <strong>{t("contact_us")}</strong>
                    </a>
                  </p>
                </div>
                <br />

                <Row className="main-text-color custom-view mt-4">
                  <h5 className="text-light center-text">
                    <strong className="headers">
                      {t("authentication_and_permissions")}
                    </strong>
                  </h5>

                  <div
                    className="col-sm-4 rounded"
                    style={{ border: "1px solid grey" }}
                  >
                    <p>
                      <strong id="navSwitch">{t("admin_users")}</strong> <br />
                      <br />
                      <br />
                      {t("admin_username")}
                      <br />
                      <br />
                      {t("admin_pw")}
                      <br />
                      <br />
                      {t("admin_perms")}
                    </p>
                  </div>

                  <div
                    className="col-sm-4 rounded"
                    style={{ border: "1px solid grey" }}
                  >
                    <p>
                      <strong id="navSwitch">{t("staff_users")}</strong>
                      <br />
                      <br />
                      {t("staff_username")}
                      <br />
                      <br />
                      {t("staff_pw")}
                      <br />
                      <br />
                      {t("permissions")}
                    </p>
                  </div>

                  <div
                    className="col-sm-4 rounded"
                    style={{ border: "1px solid grey" }}
                  >
                    <p>
                      <strong id="navSwitch">{t("none_staff_users")}</strong>
                      <br />
                      <br />
                      {t("none_Staff_perms")}
                    </p>
                  </div>
                </Row>
                <br />

                <div className=" main-text-color custom-view mt-5">
                  <h5 className="text-light main">
                    <strong className="headers">{t("tech_used")}</strong>
                  </h5>
                  <p>
                    <a
                      id="navSwitch"
                      href="https://reactjs.org/"
                      target="blank_"
                    >
                      React JS
                    </a>{" "}
                    {t("ui")}
                  </p>

                  <p>
                    <a
                      id="navSwitch"
                      href="https://www.djangoproject.com/"
                      target="blank_"
                    >
                      Djnago
                    </a>{" "}
                    {t("backend")}
                  </p>

                  <p>
                    <a
                      id="navSwitch"
                      href="https://www.django-rest-framework.org/"
                      target="blank_"
                    >
                      Django REST Framework
                    </a>{" "}
                    {t("drf")}
                  </p>

                  <p>
                    <a
                      id="navSwitch"
                      href="https://james1345.github.io/django-rest-knox/"
                      target="blank_"
                    >
                      Django-Rest-Knox
                    </a>{" "}
                    {t("knox")}
                  </p>

                  <p>
                    <a
                      id="navSwitch"
                      href="https://www.axios.com/"
                      target="blank_"
                    >
                      Axios
                    </a>{" "}
                    {t("axios")}
                  </p>

                  <p>
                    <a
                      id="navSwitch"
                      href="https://getbootstrap.com/"
                      target="blank_"
                    >
                      Bootstrap
                    </a>{" "}
                    {t("and")}{" "}
                    <a
                      id="navSwitch"
                      href="https://react-bootstrap.github.io/"
                      target="blank_"
                    >
                      React-bootstrap
                    </a>{" "}
                    {t("responsive")}
                  </p>

                  <p>
                    <a
                      id="navSwitch"
                      href="https://www.w3.org/Style/CSS/Overview.en.html"
                      target="blank_"
                    >
                      CSS
                    </a>{" "}
                    {t("css")}
                  </p>

                  <p>
                    <a
                      id="navSwitch"
                      href="https://reactjs.org/docs/introducing-jsx.html"
                      target="blank_"
                    >
                      JSX
                    </a>{" "}
                    {t("jsx")}
                  </p>

                  <p>
                    <a
                      id="navSwitch"
                      href="https://react.i18next.com/"
                      target="blank_"
                    >
                      i18next
                    </a>{" "}
                    {t("i18next")}
                  </p>
                </div>
              </Row>
              <br />

              <Row className="blu-bg justify-content-center">
                <ScrollToTop />
              </Row>
              <br />

              <footer className="center-text">
                <div>
                  <>
                    <small>{t("page_disappear")}</small>{" "}
                  </>
                </div>
                <hr />
                <small>Copy right 2022 Virtua</small>
              </footer>
            </Container>
          ) : (
            <></>
          )}
        </Router>
      </Row>
    </Container>
  );
};

export default App;
