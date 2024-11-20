"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../organisms/DashboardLayoutAgenda";

export default function HomePage() {
  const [agendas, setAgendas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const fetchAgendas = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/agenda");
      const data = await response.json();
      setAgendas(data);
    } catch (error) {
      console.error("Failed to fetch agendas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAgenda = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/agenda/${id}`, {
        method: "DELETE",
      });
      setAgendas(agendas.filter((agenda) => agenda.id !== id));
    } catch (error) {
      console.error("Failed to delete agenda:", error);
    }
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

  useEffect(() => {
    fetchAgendas();
  }, []);

  if (loading) {
    return <p>Loading agendas...</p>;
  }

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
