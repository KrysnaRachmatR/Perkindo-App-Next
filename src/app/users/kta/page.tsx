import KtaLayout from "@/components/organisms/users/KTA/page";
import DefaultLayoutUsers from "@/components/templates/DefaultUsersTemplate";

const Kta = () => {
  const userData = { name: "John Doe", hasKTA: true };
  return (
    <DefaultLayoutUsers hasKTA={userData.hasKTA}>
      <KtaLayout hasKTA={userData.hasKTA} />
    </DefaultLayoutUsers>
  );
};

export default Kta;
