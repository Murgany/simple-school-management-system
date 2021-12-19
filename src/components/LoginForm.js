import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const [formValue, setformValue] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const { t } = useTranslation();

  const history = useHistory();
  const handleRoute = () => {
    history.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginFormData = new FormData();
    loginFormData.append("username", formValue.username);
    loginFormData.append("password", formValue.password);

    try {
      await axios({
        method: "POST",
        url: "login",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        console.log(response.data);
        sessionStorage.setItem("user", response.data.username);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("staffStatus", response.data.userGroup);
      });
      history.push({ pathname: "/students" });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      className="justify-content-center blu-bg Ap covers img-fluid"
      fluid
      style={{
        height: "100vh",
        width: "100vw"
      }}
    >

      <Row className="justify-content-center mt-5">
        <h5 className="text-dark text-center"><strong className="headers">{t("login")}</strong></h5>
      </Row>

      <Row className="justify-content-center m-1">
        <Form
          onSubmit={handleSubmit}
          className="form-container justify-content-center bg-dark m-1 p-3"
        >
          <Form.Group className="mb-3">
            <Form.Label
              htmlFor="username"
              style={{ textAlign: "left" }}
              className="main"
            >
              {t("username")}
            </Form.Label>
            <Form.Control
              type="username"
              name="username"
              placeholder="John Doe"
              autoComplete="username"
              className="main"
              onChange={handleChange}
            />

            <Form.Label
              htmlFor="password"
              style={{ textAlign: "left" }}
              className="main"
            >
              {t("password")}
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              className="main"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="info" className="m-2 main">
              {t("login")}
            </Button>
            <Button
              onClick={handleRoute}
              type="button"
              variant="info"
              className="m-2 main"
            >
              {t("cancel")}
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default withRouter(LoginForm);
