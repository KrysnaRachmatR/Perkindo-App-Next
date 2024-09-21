import AgendaSectionOrganism from "@/components/organisms/agendaHeaderOrganism";
import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import MainTemplateAgenda from "@/components/templates/AgendaTamplate/agenda";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <AgendaSectionOrganism />
      <MainTemplateAgenda />
      <Footer />
    </div>
  );
};

export default HomePage;
