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
    <p>{props.coin.market_cap_rank ?? "N/A"}</p>
    <div className={styles.imgSymbol}>
      <div className={styles.img}>
        <LazyLoadImage
          alt={props.coin.symbol?.toLowerCase() ?? ""}
          className={styles.img}
          effect="blur"
          placeholderSrc={`${process.env.PUBLIC_URL}/logo192.png`}
          src={props.coin.image}
        />
      </div>
      <p>{props.coin.symbol?.toUpperCase() ?? "N/A"}</p>
    </div>
    <p>{props.coin.current_price?.toFixed(2) ?? "N/A"}</p>
    <p>{props.coin.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%</p>
    <p className={styles.hidden1}>
      {props.coin.total_volume?.toLocaleString() ?? "N/A"}
    </p>
    <div>
      <p className={styles.hidden2}>
        {props.coin.market_cap?.toLocaleString() ?? "N/A"}
      </p>
    </div>
  </div>
);

export default CoinItem;
