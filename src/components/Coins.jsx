import React from "react";
import { Link } from "react-router-dom";

import Coin from "../routes/Coin";
import CoinItem from "./CoinItem";

const styles = {
  heading:
    "flex justify-between items-center bg-zinc-800 shadow-2xl	shadow-zinc-900 rounded-lg	my-8 mx-1 py-3 px-4 font-bold",
  hidden1: "hidden md:contents",
  hidden2: "hidden lg:contents",
};

const Coins = (props) => (
  <div className="coins-container">
    <div className={styles.heading}>
      <p>#</p>
      <p>Coin</p>
      <p>Price</p>
      <p>24h</p>
      <p className={styles.hidden1}>Volume</p>
      <div>
        <p className={styles.hidden2}>Market Cap</p>
      </div>
    </div>

    {props.coins.map((coins) => {
      return (
        <Link to={`/coin/${coins.id}`} element={<Coin />} key={coins.id}>
          <CoinItem coins={coins} />
        </Link>
      );
    })}
  </div>
);

export default Coins;
