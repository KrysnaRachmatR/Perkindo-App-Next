import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import Image from "next/image";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.pathname = "/";
  };
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
            <button
              onClick={onLogout}
              className="flex items-center p-3 mt-auto hover:bg-gray-700 text-black dark:text-white"
            >
              <svg
                className="fill-current"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_130_9814)">
                  <path
                    d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                    fill=""
                  />
                  <path
                    d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                    fill=""
                  />
                </g>
                <defs>
                  <clipPath id="clip0_130_9814">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(0 0.052124)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className="ml-3">Logout</span>
            </button>
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
