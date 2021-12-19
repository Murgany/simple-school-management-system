import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignUpForm = () => {
  const [formValue, setformValue] = useState({
    username: "",
    email: "",
    password: "",
  });

 
  const { t } = useTranslation();
  const history = useHistory();

  const handleRoute = ()=> {
    history.push("/")
  }

  const handleChange = (e) => {
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginFormData = new FormData();
    loginFormData.append("username", formValue.username);
    loginFormData.append("email", formValue.email);
    loginFormData.append("password", formValue.password);

    try {
      let response = await axios({
        method: "POST",
        url: "register",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response) {
        alert("Signed up successfully");
        history.push("/LoginForm");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      className="justify-content-center blu-bg App img-fluid"
      fluid
      style={{
        height: "100vh",
        width: "100%"}}
    >
      <Row className="justify-content-center mt-5">
        <h5 className="text-dark text-center"><strong className="headers">{t("new_signup")}</strong></h5>
      </Row>

    <Row className="justify-content-center m-1">
        <Form
          onSubmit={handleSubmit}
          className="form-container justify-content-center bg-dark m-1 p-3"
        >
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username" className="text-light">
              {t("username")}
            </Form.Label>
            <Form.Control
              type="username"
              name="username"
              placeholder="John Doe"
              className="main"
              onChange={handleChange}
            />

            <Form.Label htmlFor="email" className="text-light main">
              {t("email_2")}
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="example@example.com"
              className="main"
              onChange={handleChange}
            />

            <Form.Label htmlFor="password" className="text-light">
              {t("password")}
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="main"
            />
          </Form.Group>
         
          <div className="text-center">
              <Button className="btn-sm m-2 main" type="submit" variant="info">
                {t("signup")}
              </Button>

              <Button
                variant="info"
                className="btn-sm m-2 main"
                onClick={handleRoute}
              >
                {t("cancel")}
              </Button>
            </div>

        </Form>
      </Row>
    </Container>
  );
};

export default SignUpForm;
