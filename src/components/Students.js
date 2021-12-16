import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import StudentService from "./StudentService";
import { useTranslation } from "react-i18next";
import DeleteButton from "./DeleteButton";
import ViewButton from "./ViewButton";
import EditButton from "./EditButton";
//import axios from "axios";

const StudentList = () => {
  const [student_info, setStudent_info] = useState([]);
  const [searchValue, setNewValue] = useState("");
  const { t } = useTranslation();


  /*
  const config = {
    headers: {
      Authorization: "Token " + sessionStorage.getItem("token"),
    },
  };
  
  const userInfo = async () => {
    try {
      await axios.get("user_group", config).then((response) => {
        //console.log(response.data);
        // get all class info & filter out duplicates
        const groups = response.data
          .map((Item) => Item.name)
          .filter(
            (groupType, index, array) => array.indexOf(groupType) === index
          );
        console.log("grouppp", groups);

        //localStorage.setItem("admins", groups[0]);
        sessionStorage.setItem("staffs", groups);
      });
    } catch (err) {
      console.log(err);
    }
  };
 */

  const staffStatus = sessionStorage.getItem("staffStatus");

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = async () => {
    StudentService.getAllStudents().then((response) => {
      setStudent_info(response.data);
    });
  };

  const deleteStudent = async (id) => {
    const deleteConfirm = window.confirm("Delete parmanently?");
    if (deleteConfirm) {
      StudentService.deleteStudent(`${id}`);
      alert("Successfully Deleted!!!");
      getAllStudents();
    }
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  //search bar
  const newSearch = (e) => {
    setNewValue(e.target.value);
  };
  const filteredNames = student_info.filter((student_info) => {
    return student_info.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  //clear input
  const clearInput = () => {
    setNewValue("");
  };

  const displayClearBtn = searchValue.length > 0 && searchValue !== "Search";

  //used to keep user logged in for a given time already set up in the backend
  const loggedInSession = sessionStorage.getItem("token");

  return (
    <Container className="blu-bg" fluid>
      {loggedInSession ? (
        <>
          <Row className="mb-3 mt-3 justify-content-between">
            <Col className="col-4">
              {displayClearBtn && (
                <Button
                  onClick={clearInput}
                  variant="light"
                  style={{ fontSize: "12px", padding: "0.6%", margin: "0.4%" }}
                >
                  x
                </Button>
              )}

              <input
                value={searchValue}
                onChange={newSearch}
                type="text"
                className="form-control btn-sm search-box main"
                placeholder={t("search")}
              />
            </Col>

            <Col className="col-4">
              <Button
                href={"https://simple-school-system.herokuapp.com/admin"}
                target="blank_"
                variant="dark"
                style={{ width: "100%" }}
                className="btn-sm main-text-color main"
              >
                {t("admin_dashboard_nav")}
              </Button>
            </Col>

            <Col className="col-4">
              <Button
                style={{ float: "righ", width: "100%" }}
                variant="dark"
                onClick={refreshPage}
                className="btn-sm main"
              >
                {t("refresh_list")}
              </Button>
            </Col>
          </Row>

          <Row
            className="m-0 main-text-color bg-dark"
            style={{ border: "1px solid #333" }}
          >
            <h3 className="center-text App-link">
              <strong className="headers">{t("student_list")}</strong>
            </h3>
          </Row>

          <Row className="justify-content-center">
            <Table
              responsive
              bordered
              hover
              variant="dark"
              size="sm"
              className=" bg-light p-0 m-0"
            >
              <thead className="center-text">
                <tr>
                  <th>{t("id")}</th>
                  <th>{t("name")}</th>
                  <th>{t("age")}</th>
                  <th>{t("class")}</th>
                  <th>{t("gender")}</th>
                  <th>{t("section")}</th>
                  <th>{t("shift")}</th>
                  <th>{t("action")}</th>
                </tr>
              </thead>
              <tbody className="main-text-color">
                {filteredNames &&
                  filteredNames.map((student_info, id) => {
                    return (
                      <tr key={id}>
                        <td>{student_info.id}</td>
                        <td>{student_info.name}</td>
                        <td>{student_info.age}</td>
                        <td>{student_info.class_type}</td>
                        <td>{student_info.gender}</td>
                        <td>{student_info.section}</td>
                        <td>{student_info.shift_name}</td>
                        <td>
                          {staffStatus === "ADMINS" && (
                            <>
                              <Row className="p- justify-content-center">

                                <div className="col-sm-3 justify-content-center center-text m-0 p-0">
                                  {["bottom"].map((placement) => (
                                    <OverlayTrigger
                                      key={placement}
                                      placement={placement}
                                      overlay={
                                        <Tooltip id="tooltip-disabled">
                                          {t("view_student")}
                                        </Tooltip>
                                      }
                                    >
                                      <span className="d-inline-block">
                                        <Button
                                          as={Link}
                                          to={
                                            "studentdetails/" + student_info.id
                                          }
                                          className="btn-sm"
                                          variant="none"
                                        >
                                          <ViewButton />
                                        </Button>
                                      </span>
                                    </OverlayTrigger>
                                  ))}
                                </div>

                                <div className="col-sm-3 justify-content-center center-text m-0 p-0">
                                  {["bottom"].map((placement) => (
                                    <OverlayTrigger
                                      key={placement}
                                      placement={placement}
                                      overlay={
                                        <Tooltip
                                          id={`tooltip-${placement}`}
                                          //id="tooltip-disabled"
                                        >
                                          {t("edit_student")}
                                        </Tooltip>
                                      }
                                    >
                                      <span className="d-inline-block">
                                        <Button
                                          as={Link}
                                          to={"/editstudent/" + student_info.id}
                                          className="btn-sm"
                                          variant="none"
                                        >
                                          <EditButton />
                                        </Button>
                                      </span>
                                    </OverlayTrigger>
                                  ))}
                                </div>

                                <div className="col-sm-3 justify-content-center center-text m-0 p-0">
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
                                          variant="none"
                                          onClick={() =>
                                            deleteStudent(student_info.id)
                                          }
                                        >
                                          <DeleteButton />
                                        </Button>
                                      </span>
                                    </OverlayTrigger>
                                  ))}
                                </div>
                              </Row>
                            </>
                          )}

                          {staffStatus === "STAFFS" && (
                            <>
                              <Row className="justify-content-center">
                                <Col className="col-4 m-0 p-0">
                                  {["bottom"].map((placement) => (
                                    <OverlayTrigger
                                      key={placement}
                                      placement={placement}
                                      overlay={
                                        <Tooltip id="tooltip-disabled">
                                          {t("view_student")}
                                        </Tooltip>
                                      }
                                    >
                                      <span className="d-inline-block">
                                        <Button
                                          as={Link}
                                          to={
                                            "studentdetails/" + student_info.id
                                          }
                                          className="btn-sm m-aut"
                                          variant="none"
                                        >
                                          <ViewButton />
                                        </Button>
                                      </span>
                                    </OverlayTrigger>
                                  ))}
                                </Col>
                              </Row>
                            </>)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Row>
        </>
      ) : (
        <Container
          className="justify-content-center"
          style={{ height: "100%" }}
          fluid
        >
          <Row className="text-dark center-text m-4">
            <h5 className="text-dark center-text headers">
              {t("student_list_restricted")} <br /> {t("please")}
              <Link to="/LoginForm" className="text-dark">
                <strong id="dark-hover"> {t("login")} </strong>
              </Link>
              <>{t("or")}</>
              <Link to="/SignupForm" className="text-dark">
                <strong id="dark-hover"> {t("signup")} </strong>
              </Link>
            </h5>
          </Row>
        </Container>
      )}
      
    </Container>
  );
};

export default StudentList;
