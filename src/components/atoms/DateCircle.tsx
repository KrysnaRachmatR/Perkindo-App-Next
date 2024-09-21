// components/atoms/DateCircle.js
const DateCircle = ({ date, isSelected, hasEvent, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer 
        ${hasEvent ? "bg-red-500 text-white" : "bg-[#161D6F] text-white"}
        ${isSelected && hasEvent ? "border-4 border-[#00BFFF]" : ""}
        ${isSelected && !hasEvent ? "border-4 border-[#00BFFF]" : ""}`}
    >
      {date}
    </div>
  );
};

export default DateCircle;
