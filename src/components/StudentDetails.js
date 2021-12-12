import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import StudentService from "./StudentService";
import { useTranslation } from "react-i18next";
import DeleteButton from "./DeleteButton";
import HomeButton from "./HomeButton";
import EditButton from "./EditButton";

const SingleStudent = (props) => {
  const [single_student, setSingle_student] = useState([]);
  const staffStatus = sessionStorage.getItem("staffStatus");

  const { t } = useTranslation();

  const config = {
    headers: {
      Authorization: "Token " + sessionStorage.getItem("token"),
    },
  };

  const deleteStudent = async (id) => {
    const deleteConfirm = window.confirm("Delete parmanently?");
    if (deleteConfirm) {
      StudentService.deleteStudent(`${id}`);
      alert("Successfully Deleted!!!");
    }
  };

  //get single student by id
  const viewStudent = async () => {
    let res = await axios.get(`student_info/${props.match.params.id}`, config);
    setSingle_student(res.data);
  };

  useEffect(() => {
    viewStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loggedInSession = sessionStorage.getItem("token");

  return (
    <Container className="blu-bg main" fluid>
      <Row className="mb-3 mt-3 justify-content-between">
        <Col className="center-text col-sm-">
          <HomeButton />
        </Col>

        <Col className="text-dar  col-4">
          <h5 className="text-dar center-text bg-dark btn-sm">
            <strong className="headers main-text-color">
              {t("student_details")}
            </strong>
          </h5>
        </Col>
      </Row>

      {loggedInSession ? (
        <>
          {" "}
          <Row
            className="m-0 main-text-color bg-dark"
            style={{ border: "1px solid #333" }}
            variant="info"
          >
            <h5 className="center-text headers m-2 App-link">
              <strong className="headers">{t("detailed_student_info")}</strong>
            </h5> 
           
          </Row>
          <Row className="justify-content-center ml-1 center-text">
            <Table
              responsive
              bordered
              hover
              variant="info"
              size="sm"
              className="main-text-colo text-dark main"
            >
              <thead>
                <tr>
                  <th>{t("id")}</th>
                  <th>{t("name")}</th>
                  <th>{t("age")}</th>
                  <th>{t("class")}</th>
                  <th>{t("gender")}</th>
                  <th>{t("section")}</th>
                  <th>{t("shift")}</th>
                  <th>{t("admission_date")}</th>
                  <th>{t("academic_year")}</th>
                  <th>{t("guardian")}</th>
                  <th>{t("phone")}</th>
                  <th>{t("email")}</th>
                  {staffStatus === "ADMINS" ? <th>{t("action")}</th> : <></>}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{single_student.id}</td>
                  <td>{single_student.name}</td>
                  <td>{single_student.age}</td>
                  <td>{single_student.class_type}</td>
                  <td>{single_student.gender}</td>
                  <td>{single_student.section}</td>
                  <td>{single_student.shift_name}</td>
                  <td>{single_student.admission_date}</td>
                  <td>{single_student.academic_year}</td>
                  <td>{single_student.guardian_name}</td>
                  <td>{single_student.emergency_phone}</td>
                  <td>{single_student.guardian_email}</td>

                  {staffStatus === "ADMINS" ? (
                    <td>
                      <Row className="m-0 bg-dark justify-content-center">
                        <Col className="col-sm-6 justify-content-center m-0 p-0">
                          {["bottom"].map((placement) => (
                            <OverlayTrigger
                              key={placement}
                              placement={placement}
                              overlay={
                                <Tooltip id={`tooltip-${placement}`}>
                                  {t("edit_student")}
                                </Tooltip>
                              }
                            >
                              <span className="d-inline-block">
                                <Button
                                  as={Link}
                                  to={"/editstudent/" + single_student.id}
                                  className="btn-sm"
                                  variant="none" 
                                >
                                  <EditButton />
                                </Button>
                              </span>
                            </OverlayTrigger>
                          ))}
                        </Col>

                        <Col className="col-sm-6 justify-content-center center-text m-0 p-0">
                          {["bottom"].map((placement) => (
                            <OverlayTrigger
                              key={placement}
                              placement={placement}
                              overlay={
                                <Tooltip id={`tooltip-${placement}`}>
                                  {t("delete_student")}
                                </Tooltip>
                              }
                            >
                              <span className="d-inline-block">
                                <Button
                                  className="btn-sm"
                                  variant=""
                                  onClick={() =>
                                    deleteStudent(single_student.id)
                                  }
                                >
                                  <DeleteButton />
                                </Button>
                              </span>
                            </OverlayTrigger>
                          ))}
                        </Col>
                      </Row>{" "}
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
              </tbody>
            </Table>
          </Row>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default withRouter(SingleStudent);
