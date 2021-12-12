import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { withRouter, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HomeButton from "./HomeButton";

const EditStudent = (props) => {
  const { t } = useTranslation();
  const [formValue, setformValue] = useState({
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
    edited_by: "",
  });

  const config = {
    headers: {
      Authorization: "Token " + sessionStorage.getItem("token"),
    },
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    let confirmUpdate = window.confirm("Update student infor?");
    if (confirmUpdate) {
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
      bodyFormData.append("edited_by", formValue.edited_by);

      try {
        const response = await axios.patch(
          `student_info/${props.match.params.id}`,
          bodyFormData,
          config
        );
        if (response) {
          alert("Updated successfully!");
          history.push("/students");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    //prepopulate page with data from selected table row
    async function fetchData() {
      const response = await axios.get(
        "student_info/" + props.match.params.id,
        config
      );
      setformValue(response.data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //input handler
  const handleChange = (e) => {
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  //route to another page onclick
  const history = useHistory();

  const handleRoute = () => {
    history.push("/students");
  };

  const loggedInUser = sessionStorage.getItem("user");

  return (
    <Container className="" fluid style={{ backgroundColor: "#61dafb" }}>
      <Row className="justify-content-center mt-3 mb-2 main ">
        <div className="center-text col-3">
          <HomeButton />
        </div>
      </Row>

      <Row className="justify-content-center p-1">
        <Form
          className="form bg-light p-2 m-2 rounded"
          onSubmit={handleUpdateStudent}
        >
          <h5 className="text-center m-3 headers">{t("update_student")}</h5>
          <hr />
          <Form.Group className="mb-3">
            <Row className="mb-3">
              <Col className="col-6">
                <Form.Label className="main">{t("admission_date")}</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formValue.admission_date}
                  name="admission_date"
                  placeholder="year/month/date"
                  className="main"
                />
              </Col>

              <Col className="col-6">
                <Form.Label className="main">{t("academic_year")}</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formValue.academic_year}
                  name="academic_year"
                  placeholder="2021/2022"
                  className="main"
                />
              </Col>
            </Row>

            <Form.Label className="main">{t("name")}</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formValue.name}
              placeholder="John Doe"
              name="name"
              className="main"
            />

            <Row>
              <Col>
                <Form.Label className="main">{t("age")}</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formValue.age}
                  name="age"
                  placeholder="18"
                  className="main"
                />
              </Col>

              <Col>
                <Form.Label className="main">{t("gender")}</Form.Label>
                <select
                  type="text"
                  value={formValue.gender}
                  onChange={handleChange}
                  className="form-control col-sm-5 main"
                  name="gender"
                  placeholder={t("gender")}
                >
                  <option className="main" defaultValue>
                    {t("gender")}
                  </option>
                  <option className="main" value="M">
                    Male
                  </option>
                  <option className="main" value="F">
                    Female
                  </option>
                  <option className="main" value="Other">
                    Other
                  </option>
                </select>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label className="main">{t("class")}</Form.Label>
                <select
                  //value={formValue.class_type}
                  onChange={handleChange}
                  className="form-control col-sm-5 main"
                  name="class_type"
                  //placeholder={t("gender")} {t("class")}
                >
                  <option className="main" defaultValue={formValue.class_type}>
                    {formValue.class_type}
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
                <Form.Label className="main">{t("section")}</Form.Label>
                <select
                  onChange={handleChange}
                  className="form-control main"
                  name="section"
                  //{t("section")}
                >
                  <option
                    className="main text-muted"
                    defaultValue={formValue.section}
                  >
                    {formValue.section}
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
                  className="form-control main "
                  name="shift_name"
                >
                  <option className="main text-muted" defaultValue>
                    {formValue.shift_name}
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

            <Form.Label className="main">{t("guardian")}</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              value={formValue.guardian_name}
              name="guardian_name"
              placeholder="John Doe"
              className="main"
            />

            <Row>
              <Col>
                <Form.Label className="main">{t("phone")}</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formValue.emergency_phone}
                  name="emergency_phone"
                  placeholder="+1 555 555 555"
                  className="main"
                />
              </Col>

              <Col>
                <Form.Label className="main">{t("email")}</Form.Label>
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  value={formValue.guardian_email}
                  name="guardian_email"
                  placeholder="example@example.com"
                  className="main"
                />
              </Col>
            </Row>

            <Form.Label>{t("updated_by")}</Form.Label>
            <Form.Control
              className="main text-muted"
              name="updated_by"
              value={loggedInUser}
              readOnly
            />

            <Form.Text className="text-muted">
              {t("please_enter_all_informations")}
            </Form.Text>
          </Form.Group>

          <div className="text-center">
            <Button className="btn-sm m-2 main" type="submit" variant="info">
              {t("update")}
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

export default withRouter(EditStudent);
