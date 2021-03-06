import React from "react";
import axios from "axios";
import SignUpForm from "./SignUpForm";
import Registration from "./Registration";
import EditStudent from "./EditStudent";
import LoginForm from "./LoginForm";
import ClassInfo from "./ClassInfo";
import Attendance from "./Attendance";
import SingleStudent from "./StudentDetails";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from "react-router-dom";
import StudentList from "./Students";
import { useTranslation } from "react-i18next";

const lngs = {
  en: { nativeName: "English" },
  ar: { nativeName: "عربي" },
};

const Navigation = () => {
  let userSession = sessionStorage.getItem("token");
  const loggedInUser = sessionStorage.getItem("user");

  const { t, i18n } = useTranslation();
  const history = useHistory();

  let config = {
    headers: {
      Authorization: "Token " + sessionStorage.getItem("token"),
    },
  };

  const logout = async () => {
    try {
      const response = await axios.post("logout", null, config);
      if (response) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("staffStatus");
        console.log("LOGGED OUT !!!");
        history.push("/");
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Container className="m-0 p-0" fluid>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid className="">
            <Navbar.Brand className="main" href="/Students">
              {t("student_management_system")}
            </Navbar.Brand>
            <Navbar.Toggle
              className="main"
              aria-controls="responsive-navbar-nav"
            />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="main" style={{ width: "100%" }}>
                <Nav.Link
                  as={Link}
                  to={"/Students"}
                  id="navSwitch"
                  className="col-sm-2"
                >
                  {t("student_list")}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to={"/Attendance"}
                  id="navSwitch"
                  className="col-sm-2"
                >
                  {t("attendance")}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to={"/ClassInfo"}
                  id="navSwitch"
                  className="col-sm-2"
                >
                  {t("class_info")}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to={"/Registration"}
                  id="navSwitch"
                  className="col-sm-2"
                >
                  {t("registration")}
                </Nav.Link>

                <NavDropdown
                  className="col-sm-2"
                  title={
                    loggedInUser ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>{" "}
                        {loggedInUser}
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>{" "}
                        {t("account")}
                      </>
                    )
                  }
                  menuVariant="dark"
                  id="navSwitch"
                >
                  {userSession ? (
                    <>
                      <NavDropdown.Item onClick={logout} id="navSwitch">
                        {t("logout")}
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        href={"http://simple-school-system.herokuapp.com/admin"}
                        id="navSwitch"
                        target="blank_"
                      >
                        {t("admin_dashboard_nav")}
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item
                        as={Link}
                        to={"/LoginForm"}
                        id="navSwitch"
                      >
                        {t("login")}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to={"/SignUpForm"}
                        id="navSwitch"
                      >
                        {t("signup")}
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>

                <NavDropdown
                  className="main col-sm-2"
                  title={
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-gear"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                      </svg>{" "}
                      {t("language")}
                    </>
                  }
                  menuVariant="dark"
                  id="navSwitch"
                >
                  {Object.keys(lngs).map((lng) => (
                    <NavDropdown.Item
                      key={lng}
                      style={{
                        fontWeight:
                          i18n.resolvedLanguage === lng ? "bold" : "normal",
                      }}
                      type="submit"
                      onClick={() => i18n.changeLanguage(lng)}
                      id="navSwitch"
                    >
                      {lngs[lng].nativeName}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>

      <Switch>
        <Route path="/students">
          <StudentList />
        </Route>

        <Route path="/attendance">
          <Attendance />
        </Route>

        <Route path="/classinfo">
          <ClassInfo />
        </Route>

        <Route path="/signupform">
          <SignUpForm />
        </Route>

        <Route path="/registration">
          <Registration />
        </Route>

        <Route path="/loginform">
          <LoginForm />
        </Route>

        <Route path="/studentdetails/:id">
          <SingleStudent />
        </Route>

        <Route path="/editstudent/:id">
          <EditStudent />
        </Route>
      </Switch>
    </Router>
  );
};

export default Navigation;
