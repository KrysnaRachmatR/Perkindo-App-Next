// pages/index.js
import CalendarWithFilter from "@/components/organisms/CalendarWithFilter";

const MainTemplateAgenda = () => {
  const months = ["Januari", "Februari", "Maret"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Data event per bulan
  const eventsByMonth = {
    Januari: [
      { date: 8, time: "12:00", title: "Breakfast" },
      { date: 11, time: "10:00", title: "Meeting" },
      { date: 21, time: "14:00", title: "Conference" },
    ],
    Februari: [
      { date: 5, time: "09:00", title: "Workshop" },
      { date: 18, time: "13:00", title: "Lunch with team" },
    ],
    Maret: [
      { date: 2, time: "11:00", title: "Project Kickoff" },
      { date: 15, time: "16:00", title: "Wrap-up Meeting" },
    ],
  };

  return (
    <div className="p-10 bg-[#161D6F] min-h-screen">
      <h1 className="text-4xl text-center item-center text-white font-bold mb-16 mt-8">
        AGENDA
      </h1>

      <CalendarWithFilter
        months={months}
        days={days}
        eventsByMonth={eventsByMonth}
      />
    </div>
  );
};

export default MainTemplateAgenda;
