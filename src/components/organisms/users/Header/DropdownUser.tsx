import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "../Sidebar/ClickOutside";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          {/* <span className="block text-sm font-medium text-black dark:text-white">
            User Siapa
          </span> */}
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={"/images/logo.png"}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
          />
        </span>
      </Link>
    </ClickOutside>
  );
};

export default DropdownUser;
