import React from "react";

import "../styles/Coins.css";

const styles = {
  coinRow:
    "flex cursor-pointer	justify-between	items-center bg-zinc-800 shadow-lg shadow-zinc-900 rounded-lg	my-8 mx-4 hover:scale-105	ease-in-out duration-300",
  imgSymbol: "flex items-center",
};

const CoinItem = (props) => {
  return (
    <div className={styles.coinRow}>
      <p>{props.coins.market_cap_rank}</p>
      <div className={styles.imgSymbol}>
        <img src={props.coins.image} alt="" />
        <p>{props.coins.symbol.toUpperCase()}</p>
      </div>
      <p>{props.coins.current_price.toLocaleString()}</p>
      <p>{props.coins.price_change_percentage_24h.toFixed(2)}%</p>
      <p className="hide-mobile">{props.coins.total_volume.toLocaleString()}</p>
      <p className="hide-mobile">{props.coins.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinItem;
