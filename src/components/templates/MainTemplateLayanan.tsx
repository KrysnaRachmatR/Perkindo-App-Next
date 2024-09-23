import MembershipRequirements from "@/components/organisms/MembershipRequirementsOrganism";
import LayananSectionOrganism from "../organisms/LayananHeaderOrganism";
import MemberInfoSectionOrganism from "../organisms/MemberInfoSectionOrganism";
import SbuKonstruksiRequirements from "@/components/organisms/SbuKonstruksiRequirementsOrganism";
import NonKonstruksiRequirements from "@/components/organisms/NonKonstruksiRequirementsOrganism";

const MainTemplate = () => (
  <div>
    <LayananSectionOrganism />
    <MemberInfoSectionOrganism />
    <MembershipRequirements />
    <SbuKonstruksiRequirements />
    <NonKonstruksiRequirements />
  </div>
);

export default MainTemplate;
