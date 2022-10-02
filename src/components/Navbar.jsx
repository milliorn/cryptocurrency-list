import React from "react";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

const styles = {
  navbar: "flex justify-center items-center",
};

const Navbar = () => {
  return (
    <Link to="/">
      <div className={styles.navbar}>
        <FaCoins className="icon" />
        <h1>
          {" "}
          Crypto <span className="purple">Watch</span>
        </h1>
      </div>
    </Link>
  );
};

export default Navbar;
