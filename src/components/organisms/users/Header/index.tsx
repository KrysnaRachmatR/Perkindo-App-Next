import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import Image from "next/image";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white drop-shadow-md dark:bg-boxdark dark:drop-shadow-md">
      <div className="flex w-full items-center justify-between px-4 py-4 shadow-2 sm:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-sm border-none bg-transparent p-1.5 shadow-none lg:hidden"
          >
            <span className="relative block h-5 w-5 cursor-pointer">
              {/* Top bar */}
              <span
                className={`absolute left-0 top-0 block h-0.5 w-full rounded-sm bg-black transition-all duration-200 ease-in-out dark:bg-white ${
                  props.sidebarOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              {/* Middle bar */}
              <span
                className={`absolute left-0 top-2 block h-0.5 w-full rounded-sm bg-black transition-all duration-200 ease-in-out dark:bg-white ${
                  props.sidebarOpen ? "opacity-0" : ""
                }`}
              ></span>
              {/* Bottom bar */}
              <span
                className={`absolute left-0 top-4 block h-0.5 w-full rounded-sm bg-black transition-all duration-200 ease-in-out dark:bg-white ${
                  props.sidebarOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </span>
          </button>

          {/* <!-- Logo --> */}
          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo.png"}
              alt="Logo"
              className="w-8 h-8"
            />
          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <p className="text-2xl dark:text-white">Welcome User</p>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            <DropdownUser />
            {/* <!-- Dark Mode Toggler --> */}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
