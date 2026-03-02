import { Link } from "react-router-dom";

import CoinItem from "./CoinItem";

const styles = {
  heading:
    "flex justify-between items-center bg-zinc-800 shadow-2xl	shadow-zinc-900 rounded-lg	my-8 mx-1 py-3 px-4 font-bold",
  hidden1: "hidden md:contents",
  hidden2: "hidden lg:contents",
};

const Coins = ({ coins = [] }) => (
  <div className="coins-container m-auto">
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

    {coins.length === 0 ? (
      <p className="text-center my-8">No coins to display.</p>
    ) : (
      coins.map((coin) => {
        return (
          <Link to={`/coin/${coin.id}`} key={coin.id}>
            <CoinItem coins={coin} />
          </Link>
        );
      })
    )}
  </div>
);

export default Coins;
