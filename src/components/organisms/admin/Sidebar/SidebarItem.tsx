import React from "react";
import Link from "next/link";
import SidebarDropdown from "./SidebarDropdown";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const SidebarItem = ({ item, pageName, setPageName }: any) => {
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    return setPageName(updatedPageName);
  };

  const pathname = usePathname();

  const isActive = (item: any) => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some((child: any) => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);

  // return (
  //   <>
  //     <li>
  //       <Link
  //         href={item.route}
  //         onClick={handleClick}
  //         className={`${
  //           isItemActive ? "bg-graydark dark:bg-meta-4 text-white" : ""
  //         } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 dark:text-white hover:text-white`}
  //       >
  //         {item.icon}
  //         {item.label}
  //         {item.children && (
  //           <svg
  //             className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
  //               pageName === item.label.toLowerCase() && "rotate-180"
  //             }`}
  //             width="20"
  //             height="20"
  //             viewBox="0 0 20 20"
  //             fill="none"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               fillRule="evenodd"
  //               clipRule="evenodd"
  //               d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
  //               fill=""
  //             />
  //           </svg>
  //         )}
  //       </Link>

  //       {item.children && (
  //         <div
  //           className={`translate transform overflow-hidden  ${
  //             pageName !== item.label.toLowerCase() && "hidden"
  //           }`}
  //         >
  //           <SidebarDropdown item={item.children} />
  //         </div>
  //       )}
  //     </li>
  //   </>
  // );

  return (
    <li>
      {/* Jika ada children: tampilkan parent-nya sebagai teks non-clickable */}
      {item.children ? (
        <div className="px-4 py-2 font-medium text-gray-500">
          <div className="flex items-center gap-2.5">
            {item.icon}
            {item.label}
            <ChevronDown className="ml-auto w-4 h-4"/>
          </div>
          <ul className="mt-2 ml-6 space-y-1 border-l border-graydark pl-2">
            {item.children.map((child: any, idx: number) => {
              const isChildActive = pathname === child.route;

              return (
                <li key={idx}>
                  <Link
                    href={child.route}
                    onClick={() => setPageName(child.label.toLowerCase())}
                    className={`flex items-center gap-2.5 rounded px-3 py-1.5 text-sm transition-all ${
                      isChildActive
                        ? "bg-graydark dark:bg-meta-4 text-white"
                        : "text-black dark:text-white hover:bg-graydark dark:hover:bg-meta-4 hover:text-white"
                    }`}
                  >
                    {child.icon}
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        // Jika tidak ada children: tampilkan sebagai menu biasa
        <Link
          href={item.route}
          onClick={handleClick}
          className={`group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium transition ${
            isItemActive
              ? "bg-graydark dark:bg-meta-4 text-white"
              : "text-black dark:text-white hover:bg-graydark dark:hover:bg-meta-4 hover:text-white"
          }`}
        >
          {item.icon}
          {item.label}
        </Link>
      )}
    </li>
  );

};

export default SidebarItem;
