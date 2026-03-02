const periods = [
  { label: "1h", key: "price_change_percentage_1h_in_currency" },
  { label: "24h", key: "price_change_percentage_24h_in_currency" },
  { label: "7d", key: "price_change_percentage_7d_in_currency" },
  { label: "14d", key: "price_change_percentage_14d_in_currency" },
  { label: "30d", key: "price_change_percentage_30d_in_currency" },
  { label: "1y", key: "price_change_percentage_1y_in_currency" },
];

const CoinTable = (props) => {
  const { coin } = props;

  return (
    <tr>
      {periods.map(({ label, key }) => (
        <td
          key={label}
          className="p-2 text-center border-x-2	border-solid	border-zinc-700 text-xs"
        >
          {coin.market_data?.[key]?.usd != null ? (
            <p>{coin.market_data[key].usd.toFixed(1)}%</p>
          ) : null}
        </td>
      ))}
    </tr>
  );
};

export default CoinTable;
