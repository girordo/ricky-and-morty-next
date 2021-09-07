import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="w-full h-24 sticky top-0 bg-gray-50 flex items-center justify-center border-b mb-10 shadow-lg font-semibold">
      <Link href="/characters">Personagens</Link>
      <Link href="/locations">Localizações</Link>
    </nav>
  );
};

export default Header;
