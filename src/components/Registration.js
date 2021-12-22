import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Registration = () => {
  const [formValue, setformValue] = React.useState({
    name: "",
    age: "",
    class_type: "",
    gender: "",
    section: "",
    shift_name: "",
    admission_date: "",
    academic_year: "",
    guardian_name: "",
    guardian_email: "",
    emergency_phone: "",
    created_by: "",
  });

  //for site translation
  const { t } = useTranslation();

  const history = useHistory();

  let config = {
    headers: {
      Authorization: "Token " + sessionStorage.getItem("token"),
    },
  };

  //API request. user input form.
  const handleCreateStudent = async (e) => {
    e.preventDefault();

    const addNewStudent = window.confirm("Register new student ?");

    if (addNewStudent) {
      var bodyFormData = new FormData();

      bodyFormData.append("name", formValue.name);
      bodyFormData.append("age", formValue.age);
      bodyFormData.append("class_type", formValue.class_type);
      bodyFormData.append("admission_date", formValue.admission_date);
      bodyFormData.append("gender", formValue.gender);
      bodyFormData.append("section", formValue.section);
      bodyFormData.append("shift_name", formValue.shift_name);
      bodyFormData.append("guardian_name", formValue.guardian_name);
      bodyFormData.append("guardian_email", formValue.guardian_email);
      bodyFormData.append("emergency_phone", formValue.emergency_phone);
      bodyFormData.append("academic_year", formValue.academic_year);
      bodyFormData.append("edited_by", formValue.created_by);

      try {
        const response = await axios.post("student_info", bodyFormData, config);
        if (response) {
          alert("Student registered successfully!");
          history.push("/students");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  //on cancel button click, route to another page
  const handleRoute = () => {
    history.push("/Students");
  };

  //username used in navbar when user is loggedin
  const loggedInUser = sessionStorage.getItem("user");

  //used in logic below. showing form to users who are logged in only.
  const loggedInSession = sessionStorage.getItem("token");

  return (
    <Container
      className="blu-bg justify-content-center"
      fluid
    >
      {/* show form only for logged in users */}
      {loggedInSession ? (
        <>
          <Row className="mb-3 m- p- mt-3 justify-content-center center-text">
           

            <div className="col-sm-6">
              <Button
                href={"https://simple-school-system.herokuapp.com/adminstudents/studentinfo/add/"}
                target="blank_"
                variant="dark"
                style={{ width: "100%" }}
                className="btn-sm main-text-color main"
              >
               {t("add_in_dashboard")}
              </Button>
            </div>
          </Row>   

          <Row className="justify-content-center m-1"> 
            <Form
              className="form bg-light p-2 m-2 rounded"
              onSubmit={handleCreateStudent}
            >
              <h5 className="text-center m-1">
                <strong className="headers">{t("new_registration")}</strong>
              </h5>
              <hr />
              <Form.Group className="mb-3">
                <Row className="mb-3">
                  <Col className="col-6">
                    <Form.Label>{t("admission_date")}</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={handleChange}
                      name="admission_date"
                      placeholder={t("year_month_date")}
                      className="main col-6"
                    />
                  </Col>

                  <Col className="col-6">
                    <Form.Label>{t("academic_year")}</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="academic_year"
                      placeholder="2021/2022"
                      className="main"
                    />
                  </Col>
                </Row>

                <Form.Label>{t("name")}</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  placeholder={t("full_name")}
                  name="name"
                  required
                  className="main text-muted"
                />

                <Row>
                  <Col>
                    <Form.Label>{t("age")}</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="age"
                      placeholder="18"
                      className="col-sm-5 main"
                    />
                  </Col>

                  <Col>
                    <Form.Label>{t("gender")}</Form.Label>
                    <select
                      onChange={handleChange}
                      className="form-control col-sm-5 main text-muted"
                      name="gender"
                      placeholder={t("gender")}
                    >
                      <option className="main" defaultValue>
                        {t("gender")}
                      </option>
                      <option className="main text-dark" value="M">
                        Male
                      </option>
                      <option className="main text-dark" value="F">
                        Female
                      </option>
                      <option className="main text-dark" value="O">
                        Other
                      </option>
                    </select>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Label>{t("class")}</Form.Label>
                    <select
                      onChange={handleChange}
                      className="form-control col-sm-5 main"
                      name="class_type"
                      placeholder={t("gender")}
                    >
                      <option className="main" defaultValue="1">
                        {t("class")}
                      </option>
                      <option className="main" value="1">
                        1
                      </option>
                      <option className="main" value="2">
                        2
                      </option>
                      <option className="main" value="3">
                        3
                      </option>
                    </select>
                  </Col>

                  <Col>
                    <Form.Label>{t("section")}</Form.Label>
                    <select
                      onChange={handleChange}
                      className="form-control col-sm-5 main"
                      name="section"
                    >
                      <option className="main text-muted" defaultValue>
                        {t("section")}
                      </option>
                      <option className="main" value={t("science")}>
                        {t("science")}
                      </option>
                      <option className="main" value={t("art")}>
                        {t("art")}
                      </option>
                    </select>
                  </Col>

                  <Col>
                    <Form.Label>{t("shift")}</Form.Label>
                    <select
                      onChange={handleChange}
                      className="form-control col-sm-5 main "
                      name="shift_name"
                    >
                      <option className="main text-muted" defaultValue>
                        {t("shift")}
                      </option>
                      <option className="main" value={t("morning")}>
                        {t("morning")}
                      </option>
                      <option className="main" value={t("afternoon")}>
                        {t("afternoon")}
                      </option>
                      <option className="main" value={t("evening")}>
                        {t("evening")}
                      </option>
                    </select>
                  </Col>
                </Row>
                <Row></Row>

                <Form.Label>{t("guardian")}</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="guardian_name"
                  placeholder={t("guardian_name")}
                  className="main"
                />

                <Row>
                  <Col>
                    <Form.Label>{t("phone")}</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="emergency_phone"
                      placeholder={t("phone")}
                      className="main"
                    />
                  </Col>

                  <Col>
                    <Form.Label>{t("email")}</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={handleChange}
                      name="guardian_email"
                      placeholder="example@example.com"
                      className="main"
                    />
                  </Col>
                </Row>

                <Form.Label>{t("registered_by")}</Form.Label>
                <Form.Control
                  className="main text-muted"
                  name="created_by"
                  value={loggedInUser}
                  readOnly
                />

                <Form.Text className="text-muted">
                  {t("please_enter_all_informations")}
                </Form.Text>
              </Form.Group>

              <div className="text-center">
                <Button
                  className="btn-sm m-2 main"
                  type="submit"
                  variant="info"
                >
                  {t("register")}
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
        </>
      ) : (
        <Container style={{ height: "100" }} fluid>
          <Row className="blu-bg m-4">
            <h3 className="p-1 text-dark center-text headers">
              {t("restricted")} <br /> {t("please")}
              <Link to="/LoginForm" className="text-dark">
                <strong id="dark-hover"> {t("login")} </strong>
              </Link>
              <>{t("or")}</>
              <Link to="/SignupForm" className="text-dark">
                <strong id="dark-hover"> {t("signup")} </strong>
              </Link>
              {t("to_register_new_students")}{" "}
            </h3>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Registration;
