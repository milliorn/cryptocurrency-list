const RetryButton = ({ onClick }) => (
  <button
    className="mt-2 bg-slate-600 border-2 border-slate-600 border-solid rounded-lg shadow-md shadow-slate-600 px-3 py-1 hover:bg-slate-500"
    onClick={onClick}
  >
    Retry
  </button>
);

export default RetryButton;
