// pages/admin/anggota.js
import DefaultLayout from "@/components/templates/DefaultAdminTemplate";
import SbuNonKonstruksi from "@/components/organisms/admin/SBU/SbuNonKontruksi";

const AdminMemberPage = () => {
  return (
    <DefaultLayout>
      <SbuNonKonstruksi />
    </DefaultLayout>
  );
};

export default AdminMemberPage;
