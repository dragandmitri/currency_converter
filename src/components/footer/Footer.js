import React, { memo } from "react";
import "./Footer.css";

const Footer = (props) => {
  return (
    <>
      <div className="footerWrapper">
        <div className="footerText">Last currency update:</div>
        <div>{props.updated}</div>
      </div>
    </>
  );
};

export default memo(Footer);
