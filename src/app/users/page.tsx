import KtaLayout from "@/components/organisms/users/KTA/page";
import DefaultLayoutUsers from "@/components/templates/DefaultUsersTemplate";

export default function Home() {
  const userData = { name: "John Doe", hasKTA: true };

  return (
    <>
      <DefaultLayoutUsers hasKTA={userData.hasKTA}>
        <KtaLayout />
      </DefaultLayoutUsers>
    </>
  );
}
