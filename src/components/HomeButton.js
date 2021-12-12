import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeButton = () => {

  return (
    <Button
      as={Link}
      to="/students"
      variant="dark"
      className="btn-sm main-text-color main"
      style={{width: "100%" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        length="100px"
        fill="currentColor"
        className="bi bi-arrow-left main-text-color"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        />
      </svg>
    </Button>
  );
};

export default HomeButton;
