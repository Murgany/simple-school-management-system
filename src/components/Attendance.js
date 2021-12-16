import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HomeButton from "./HomeButton";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);

  let config = {
    headers: {
      Authorization: "Token " + sessionStorage.getItem("token"),
      //"Accept-Language" : "ar",
    },
  };

  const getAttendance = async () => {
    try {
      const response = await axios.get("attendance", config);
      setAttendance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();
  const loggedInSession = sessionStorage.getItem("token");

  return (
    <Container
      className="main blu-bg"
      fluid
      style={{ height: "", padding: "" }}
    >
      {loggedInSession ? (
        <>
          <Row className="mb-3 mt-3 justify-content-between">
            <Col className="center-text col-5 " >
              <HomeButton />
            </Col>

            <Col className="col-5">
              <Button
                href={"https://simple-school-system.herokuapp.com/adminstudents/attendance/add/"}
                target="blank_"
                variant="dark"
                style={{ width: "100%" }}
                className="btn-sm main-text-color main"
              >
               {t("add_attendance")}
              </Button>
            </Col>
          </Row>

          <Row
            className="m-0 main-text-color bg-dark"
            style={{ border: "1px solid #333" }}
          >
            <h5 className="center-text headers m-2 App-link">
              <strong className="headers">{t("attendance")}</strong>
            </h5>
            <p>
              {t("attendance_explanation")}
            </p>
          </Row>

          <Table
            className="center-text text-dark"
            responsive="lg"
            bordered
            hover
            variant="info"
            style={{ border: "1px solid #333" }}
            size="sm"
          >
            <>
              <thead>
                <tr>
                  <th>{t("student_id")}</th>
                  <th>{t("status")}</th>
                  <th>{t("date")}</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((attendance, index) => {
                  return (
                    <tr key={index}>
                      <td>{attendance.student}</td>
                      <td>{attendance.status}</td>
                      <td>{attendance.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </>
          </Table>
        </>
      ) : (
        <>
          <Container style={{ height: "100%" }} fluid>
            <Row className="blu-bg m-4">
              <h3 className="text-dark center-text headers">
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
        </>
      )}
    </Container>
  );
};

export default Attendance;
