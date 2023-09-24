import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="recommendation">
        <p>
          <span>Recommendation</span> : Please do not refresh page after login while
          using and use{" "}
          <a href="https://support.gpsgate.com/hc/en-us/articles/360021934034-Change-to-Desktop-mode-on-your-mobile-browser">
            desktop mode{" "}
          </a>
          for better experience.
        </p>
      </div>
      <div className="footer_des">
        <p>
          Made with ❤ by <a>Bhavesh kumar</a>.
        </p>
        <p>All © reserved 2022-24.</p>
      </div>
    </footer>
  );
}

export default Footer;
