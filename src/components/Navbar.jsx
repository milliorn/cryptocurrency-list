import React from "react";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";

const styles = {
  navbar: "flex justify-center items-center text-3xl shadow-2xl	shadow-zinc-900",
  purple: "text-violet-700",
};

const Navbar = () => {
  return (
    <Link to="/">
      <div className={styles.navbar}>
        <FaCoins className={styles.purple} />
        <h1>
          Crypto <span className={styles.purple}>Watch</span>
        </h1>
      </div>
    </Link>
  );
};

export default Navbar;
