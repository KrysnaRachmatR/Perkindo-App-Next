"use client";
import { useState } from "react";
import DashboardLayout from "../organisms/DashboardLayoutAgenda";

export default function HomePage() {
  const [agendas, setAgendas] = useState([
    { title: "Dinner with John & Daniel", time: "4:30", date: "2024-10-05" },
    { title: "Coffee Meeting with Lisa", time: "6:00", date: "2024-10-05" },
    { title: "Gym", time: "7:30", date: "2024-10-06" },
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleRemoveAgenda = (index) => {
    setAgendas(agendas.filter((_, i) => i !== index));
  };

  const onPrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const onNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <DashboardLayout
      agendas={agendas}
      onRemoveAgenda={handleRemoveAgenda}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      currentMonth={currentMonth}
      onPrevMonth={onPrevMonth}
      onNextMonth={onNextMonth}
    />
  );
}
