import React from "react";

const NavbarButton = ({
  href,
  children,
  className = "text-lucas-main-color hover:bg-lucas-white-hover",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={href}
    className={`px-4 py-2 rounded-full font-semibold transition-colors ${className}`}
  >
    {children}
  </a>
);

const RoundedSection = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={`flex items-center bg-white rounded-xl shadow ${className}`}>
    {children}
  </div>
);

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-lucas-main-bg p-6 flex items-center justify-between z-50 pl-50 pr-50">
      {/* Left rounded section */}
      <RoundedSection className="px-8 py-3 space-x-8">
        <h1 className="text-2xl font-bold text-lucas-main-color">
          Lucas Arden
        </h1>
        <nav>
          <ul className="flex space-x-6">
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
      </RoundedSection>
      {/* Right rounded section */}
      <RoundedSection className="px-6 py-3 space-x-4">
        <NavbarButton
          href="/login"
          className="border border-lucas-main-color text-lucas-main-color bg-white hover:bg-lucas-white-hover"
        >
          Login
        </NavbarButton>
        <NavbarButton
          href="/create-account"
          className="bg-lucas-main-color text-white hover:bg-[#3b5d47]"
        >
          Create Account
        </NavbarButton>
      </RoundedSection>
    </div>
  );
};

export default Navbar;
