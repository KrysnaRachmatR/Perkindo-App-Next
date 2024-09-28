import Card from "../atoms/CardAgenda";
import Text from "../atoms/TextAgenda2";

export default function AgendaItem({ title, time }) {
  return (
    <Card>
      <Text className="text-lg font-semibold">{title}</Text>
      <Text className="text-black">{time}</Text>
    </Card>
  );
}
