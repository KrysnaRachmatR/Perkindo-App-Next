import AgendaItem from "../molecules/AgendaItem2";

export default function AgendaList({ agendas }) {
  return (
    <div className="gap-x-10 space-y-4">
      {" "}
      {agendas.length > 0
        ? agendas.map((agenda, index) => (
            <AgendaItem key={index} title={agenda.title} time={agenda.time} />
          ))
        : ""}
    </div>
  );
}
