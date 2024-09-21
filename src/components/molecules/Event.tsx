// components/molecules/EventItem.js

import Text from "../atoms/textAgenda";

const EventItem = ({ time, title }) => {
  return (
    <div className="flex flex-col mb-2">
      <Text className="text-sm font-bold">{time} WIB</Text>
      <Text className="text-base">{title}</Text>
    </div>
  );
};

export default EventItem;
