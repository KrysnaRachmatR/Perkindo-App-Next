import Text from "../atoms/TextAgenda2";
import AgendaList from "./AgendaList";
import Calendar from "./Calendar";
import { useState } from "react";

export default function DashboardLayout({
  agendas,
  onRemoveAgenda,
  currentMonth,
  onPrevMonth,
  onNextMonth,
  selectedDate,
  setSelectedDate,
}) {
  const [showAgenda, setShowAgenda] = useState(false); 
  const [selectedDay, setSelectedDay] = useState(""); 

  return (
    <div className="flex">
      <div className="w-1/3 p-4 bg-[#161D6F]  rounded-r-lg">
        <Text className="text-2xl mb-4 text-center text-white font-bold">
          AGENDA
        </Text>
        {showAgenda ? (
          <AgendaList
            agendas={agendas.filter((agenda) => {
              const agendaDate = new Date(agenda.date);
              return (
                agendaDate.getMonth() === currentMonth.getMonth() &&
                agendaDate.getFullYear() === currentMonth.getFullYear() &&
                agenda.date === selectedDate
              );
            })}
          />
        ) : (
          <p className="text-white">Tidak ada agenda di hari ini</p>
        )}
      </div>
      <div className="w-2/3 p-4">
        <Calendar
          currentMonth={currentMonth}
          onPrevMonth={onPrevMonth}
          onNextMonth={onNextMonth}
          agendas={agendas}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setShowAgenda={setShowAgenda}
          setSelectedDay={setSelectedDay}
        />
      </div>
    </div>
  );
}
