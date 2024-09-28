import AgendaSectionOrganism from "@/components/organisms/agendaHeaderOrganism";
import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import HomePage2 from "@/components/templates/AgendaTemplate";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <AgendaSectionOrganism />
      <HomePage2 />
      <Footer />
    </div>
  );
};

export default HomePage;
