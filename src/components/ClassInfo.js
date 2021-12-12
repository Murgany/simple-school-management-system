import React, { useState, useEffect } from "react";
import { Container, Table, Row } from "react-bootstrap";
import StudentService from "./StudentService";
import { useTranslation } from "react-i18next";
import HomeButton from "./HomeButton";
import { Link } from "react-router-dom";

const ClassInfo = () => {
  const [class_count, setClassCount] = useState([]);
  const { t } = useTranslation();
  const loggedInSession = sessionStorage.getItem("token");

  const getAllStudents = async () => {
    StudentService.getAllStudents().then((response) => {
      // get all class info & filter out duplicates
      const classes = response.data
        .map((Item) => Item.class_type)
        .filter(
          (classType, index, array) => array.indexOf(classType) === index
        );

      // get class names and student count in each class
      const count = classes.map((class_name) => ({
        Class_name: class_name,
        Class_count: response.data.filter(
          (item) => item.class_type === class_name
        ).length,
      }));

      setClassCount(count);
    });
  };

  useEffect(() => {
    getAllStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="blu-bg" fluid style={{ height: "100%" }}>
      {loggedInSession ? (
        <>
          <Row className="justify-content-center mt-3 mb-3 main ">
            <div className="center-text col-3">
              <HomeButton />
            </div>
          </Row>

          <Row
            className="m-0 main-text-color bg-dark"
            style={{ border: "1px solid #333" }}
            variant="info"
          >
            <h5 className="center-text headers m-2 App-link">
              <strong className="headers">{t("class_info")}</strong>
            </h5>
            <p>
              {t("the_student_count_automatically_increases")}{" "}
              <a
                className="dark-hove"
                id="navSwitch"
                target="blank_"
                href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Admin_site#:~:text=The%20Django%20admin%20application,detail%20about%20the%20models."
              >{" "}
                {t("django_admin_here")}
              </a>{" "}
              . {t("to_admin_dashboard")} {t("please")}
              <a
                id="navSwitch"
                target="blank_"
                href="https://simple-school-system.herokuapp.com/admin"
              > {t("login")}{" "}
               
              </a> {t("admin_dashboard")}.
            </p>
          </Row>

          <Row className="justify-content-center ml-1">
            <Table
              responsive
              bordered
              variant="info"
              className="center-text text-dark"
              style={{ border: "1px solid #333" }}
            >
              <thead>
                <tr>
                  <th>{t("class")}</th>
                  <th>{t("student_count")}</th>
                </tr>
              </thead>

              <tbody>
                {class_count.map((Cls_info, index) => (
                  <tr key={index}>
                    <td>Senior {Cls_info.Class_name}</td>
                    <td>{Cls_info.Class_count}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </>
      ) : (
        <Container style={{ height: "100%" }} fluid>
          <Row className="blu-bg">
            <h5 className="p-1 text-dark headers center-text mt-5">
              {t("restricted")} <br /> {t("please")}
              <Link to="/LoginForm" id="dark-hover" className="text-dark">
                <strong id="dark-hover"> {t("login")} </strong>
              </Link>
              <>{t("or")}</>
              <Link to="/SignupForm" id="dark-hover" className="text-dark">
                <strong id="dark-hover"> {t("signup")} </strong>
              </Link>
            </h5>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default ClassInfo;
