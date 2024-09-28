import { format } from "date-fns";

export default function Calendar({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  agendas,
  selectedDate,
  setSelectedDate,
  setShowAgenda,
  setSelectedDay, // Menambahkan prop baru
}) {
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const monthName = format(currentMonth, "MMMM yyyy");

  const handleDateClick = (day) => {
    const dateString = format(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
      "yyyy-MM-dd"
    );
    const hasAgenda = agendas.some((agenda) => agenda.date === dateString);

    // Set selected date and selected day
    setSelectedDate(hasAgenda ? dateString : null);
    setShowAgenda(hasAgenda);
    setSelectedDay(hasAgenda ? format(new Date(dateString), "EEEE") : ""); // Menetapkan nama hari
  };

  return (
    <div className="bg-white p-6 rounded-lg drop-shadow-xl">
      <div className="flex items-center justify-center mb-4">
        <button className="mr-4" onClick={onPrevMonth}>
          ←
        </button>
        <h2 className="text-lg font-semibold">{monthName}</h2>
        <button className="ml-4" onClick={onNextMonth}>
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center mt-6">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-black">
            {day}
          </div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateString = format(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
            "yyyy-MM-dd"
          );
          const isAgendaDay = agendas.some(
            (agenda) => agenda.date === dateString
          );

          return (
            <div
              key={i}
              className={`p-2 h-12 w-10 mx-auto flex items-center justify-center cursor-pointer ${
                isAgendaDay ? "bg-[#161D6F] text-white rounded-lg" : ""
              }`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
