import React from "react";

const styles = {
  coinRow:
    "flex cursor-pointer	justify-between	items-center bg-zinc-800 shadow-lg shadow-zinc-900 rounded-lg	my-8 mx-4 hover:scale-105	ease-in-out duration-300",
  hidden: "hidden md:contents",
  img: "h-10	mr-2 w-auto	",
  imgSymbol: "flex items-center",
};

const CoinItem = (props) => {
  return (
    <div className={styles.coinRow}>
      <p>{props.coins.market_cap_rank}</p>
      <div className={styles.imgSymbol}>
        <img src={props.coins.image} alt="" className={styles.img} />
        <p>{props.coins.symbol.toUpperCase()}</p>
      </div>
      <p>{props.coins.current_price.toLocaleString()}</p>
      <p>{props.coins.price_change_percentage_24h.toFixed(2)}%</p>
      <p className={styles.hidden}>
        {props.coins.total_volume.toLocaleString()}
      </p>
      <p className={styles.hidden}>{props.coins.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinItem;
