// components/organisms/EventList.js

import EventItem from "../molecules/Event";

const EventList = ({ events }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      {events.length > 0 ? (
        events.map((event, index) => (
          <EventItem key={index} time={event.time} title={event.title} />
        ))
      ) : (
        <p className="text-gray-500">No events for this date.</p>
      )}
    </div>
  );
};

export default EventList;
