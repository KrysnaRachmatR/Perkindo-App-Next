// components/organisms/CalendarWithFilter.js
"use client"
import { useState, useEffect } from 'react';
import Dropdown from '../atoms/Dropdown';
import Calendar from '../molecules/Calendar';
import EventList from './EventList';

const CalendarWithFilter = ({ months, days, eventsByMonth }) => {
  const [selectedMonth, setSelectedMonth] = useState(months[0]); // Default bulan pertama
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Update filtered events ketika bulan atau tanggal berubah
  useEffect(() => {
    if (selectedDate !== null) {
      const events = eventsByMonth[selectedMonth].filter(event => event.date === selectedDate);
      setFilteredEvents(events);
    } else {
      setFilteredEvents([]);
    }
  }, [selectedMonth, selectedDate, eventsByMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setSelectedDate(null); // Reset tanggal ketika bulan berubah
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  // Ambil hanya tanggal-tanggal yang ada event di bulan terpilih
  const eventDates = eventsByMonth[selectedMonth].map(event => event.date);

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col mr-10">
        <Dropdown options={months} onChange={handleMonthChange} />
        <Calendar 
          days={days} 
          selectedDate={selectedDate} 
          events={eventDates} 
          onDateClick={handleDateClick} 
        />
      </div>
      <EventList events={filteredEvents} />
    </div>
  );
};

export default CalendarWithFilter;
