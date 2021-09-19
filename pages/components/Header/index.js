import React from "react";

const Header = () => {
  return (
    <nav className="w-full h-24 sticky top-0 bg-gray-50 flex items-center justify-center border-b mb-10 shadow-lg font-semibold">
      <section className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <section className="text-sm lg:flex-grow">
          <a
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Home
          </a>
          <a
            href="/characters"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Characters
          </a>
          <a
            href="/locations"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Locations
          </a>
        </section>
      </section>
    </nav>
  );
};

export default Header;
