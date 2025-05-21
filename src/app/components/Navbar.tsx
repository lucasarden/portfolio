import React from "react";
import RoundButton from "@/app/components/RoundButton";

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
        <RoundButton
          href="/"
          className="text-2xl font-bold text-lucas-main-color hover:bg-lucas-white-hover"
        >
          Lucas Arden
        </RoundButton>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <RoundButton href="/projects">Projects</RoundButton>
            </li>
            <li>
              <RoundButton href="/contact">Contact</RoundButton>
            </li>
          </ul>
        </nav>
      </RoundedSection>
      {/* Right rounded section */}
      <RoundedSection className="px-6 py-3 space-x-4">
        <RoundButton href="/login" className="border-2 border-lucas-main-color">
          Login
        </RoundButton>
        <RoundButton
          href="/create-account"
          className="bg-lucas-main-color text-white hover:bg-lucas-main-color-hover"
        >
          Create Account
        </RoundButton>
      </RoundedSection>
    </div>
  );
};

export default Navbar;
