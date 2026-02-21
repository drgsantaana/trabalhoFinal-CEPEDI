const Display = ({ currentValue, previousValue, operator }) => {
  // Formatar números
  const formatNumber = (num) => {
    if (!num && num !== 0) return "";
    const stringNum = String(num);
    if (stringNum.length > 12) {
      return parseFloat(num).toExponential(4);
    }
    return stringNum;
  };

  return (
    <div className="bg-slate-950 p-6 rounded-xl mb-6 shadow-inner text-right h-28 flex flex-col justify-between border border-slate-800">
      <div className="text-slate-400 text-sm h-6 break-words font-medium">
        {previousValue != null
          ? `${formatNumber(previousValue)} ${operator}`
          : ""}
      </div>
      <div className="text-white text-4xl font-light tracking-wider overflow-hidden">
        {formatNumber(currentValue)}
      </div>
    </div>
  );
};

export default Display;
