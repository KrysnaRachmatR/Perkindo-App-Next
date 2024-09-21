// components/molecules/Calendar.js
import DateCircle from "../atoms/DateCircle";

const Calendar = ({ days, selectedDate, events, onDateClick }) => {
  return (
    <div className="grid grid-cols-7 gap-6 mt-10 mr- bg-white w-[30rem] p-6 rounded-lg">
      {days.map((day, index) => {
        const hasEvent = events.includes(day); // Tanggal ini punya event?
        return (
          <DateCircle
            key={index}
            date={day}
            isSelected={day === selectedDate}
            hasEvent={hasEvent}
            onClick={() => onDateClick(day)}
          />
        );
      })}
    </div>
  );
};

export default Calendar;
