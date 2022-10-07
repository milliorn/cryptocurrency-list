import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const styles = {
  coinRow:
    "flex cursor-pointer	justify-between	items-center bg-zinc-800 shadow-lg shadow-zinc-900 rounded-lg	my-8 mx-4 hover:scale-105	ease-in-out duration-300",
  hidden1: "hidden md:contents",
  hidden2: "hidden lg:contents",
  img: "h-12	mr-2 w-auto	",
  imgSymbol: "flex items-center",
};

const CoinItem = (props) => (
  <div className={styles.coinRow}>
    <p>{props.coins.market_cap_rank}</p>
    <div className={styles.imgSymbol}>
      <div className={styles.img}>
        <LazyLoadImage
          alt={props.coins.symbol.toLowerCase()}
          className={styles.img}
          effect="blur"
          height={props.coins.image.height}
          placeholderSrc="../../public/logo192.png"
          src={props.coins.image}
          width={props.coins.image.width}
        />
      </div>
      <p>{props.coins.symbol.toUpperCase()}</p>
    </div>
    <p>{props.coins.current_price.toFixed(2)}</p>
    <p>{props.coins.price_change_percentage_24h.toFixed(2)}%</p>
    <p className={styles.hidden1}>
      {props.coins.total_volume.toLocaleString()}
    </p>
    <div>
      <p className={styles.hidden2}>
        {props.coins.market_cap.toLocaleString()}
      </p>
    </div>
  </div>
);

export default CoinItem;
