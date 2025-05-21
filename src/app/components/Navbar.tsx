import React from "react";

const NavbarButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      className="px-4 py-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors"
    >
      {children}
    </a>
  );
};

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 className="text-lg font-bold pl-4">Lucas Arden's Portfolio</h1>
      <nav>
        <ul className="flex space-x-4 pr-4">
          <li>
            <NavbarButton href="/">Home</NavbarButton>
          </li>
          <li>
            <NavbarButton href="/about">About</NavbarButton>
          </li>
          <li>
            <NavbarButton href="/projects">Projects</NavbarButton>
          </li>
          <li>
            <NavbarButton href="/contact">Contact</NavbarButton>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
