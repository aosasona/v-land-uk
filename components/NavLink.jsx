import Link from "next/link";
import React from "react";

const NavLink = ({ children, link }) => {
  return (
    <Link href={link} passHref>
      <div className="w-auto flex-shrink-0 text-xs text-primary font-semibold px-4 py-[3px] border-[1.5px] border-primary rounded-2xl hover:scale-90 hover:bg-primary hover:text-white transition-all cursor-pointer">
        {children}
      </div>
    </Link>
  );
};

export default NavLink;
