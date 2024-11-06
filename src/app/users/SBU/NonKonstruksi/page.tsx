import NonKonstruksiLayout from "@/components/organisms/users/Sbu/Nonkonstruksi/page";
import DefaultLayoutUsers from "@/components/templates/DefaultUsersTemplate";

export default function Home() {
  const userData = { name: "John Doe", hasKTA: true };
  return (
    <>
      <DefaultLayoutUsers hasKTA={userData.hasKTA}>
        <NonKonstruksiLayout />
      </DefaultLayoutUsers>
    </>
  );
}
