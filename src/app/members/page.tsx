import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import SbuKonstruksiTable from "@/components/templates/AnggotaTemplate";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <SbuKonstruksiTable />

      <Footer />
    </div>
  );
};

export default HomePage;
