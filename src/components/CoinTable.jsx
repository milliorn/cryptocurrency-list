const CoinTable = (props) => {
  const { coin } = props;

  const data = [
    coin.market_data?.price_change_percentage_1h_in_currency ? (
      <p>
        {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}
        %
      </p>
    ) : null,
    coin.market_data?.price_change_percentage_24h_in_currency ? (
      <p>
        {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
          1
        )}
        %
      </p>
    ) : null,
    coin.market_data?.price_change_percentage_7d_in_currency ? (
      <p>
        {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}
        %
      </p>
    ) : null,
    coin.market_data?.price_change_percentage_14d_in_currency ? (
      <p>
        {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
          1
        )}
        %
      </p>
    ) : null,
    coin.market_data?.price_change_percentage_30d_in_currency ? (
      <p>
        {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
          1
        )}
        %
      </p>
    ) : null,
    coin.market_data?.price_change_percentage_1y_in_currency ? (
      <p>
        {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}
        %
      </p>
    ) : null,
  ];

  return (
    <tr>
      {data.map((e, i) => (
        <td
          key={i}
          className="p-2 text-center border-x-2	border-solid	border-zinc-700 text-xs"
        >
          {e}
        </td>
      ))}
    </tr>
  );
};

export default CoinTable;
