import DashboardAdmin from "@/components/organisms/admin/Dashboard/page";
import DefaultLayout from "@/components/templates/DefaultAdminTemplate";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <DashboardAdmin />
      </DefaultLayout>
    </>
  );
}
