"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import RoundButton from "@/app/components/RoundButton";
import RoundedSection from "@/app/components/RoundedSection";
import { motion, AnimatePresence } from "framer-motion";

interface MenuButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const MENU_ITEM_COUNT = 4; // Number of dropdown items
const MENU_ITEM_HEIGHT = 57; // px, adjust to match your MenuButton's height
const NAVBAR_HEIGHT = 120; // px, adjust to match your navbar's height

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  // Calculate the total height needed for the blur backdrop
  const expandedHeight =
    NAVBAR_HEIGHT + (menuOpen ? MENU_ITEM_COUNT * MENU_ITEM_HEIGHT : 0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    await signOut();

    window.location.reload();
  };

  const MenuButton = ({
    href = "",
    children,
    className = "",
    onClick = () => setMenuOpen(false),
  }: MenuButtonProps) => (
    <Link
      href={href}
      className={`w-full text-center py-4 px-4 font-semibold ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return (
    <div className="relative z-50">
      {/* Backdrop for the expanded menu */}
      <motion.div
        initial={{ height: NAVBAR_HEIGHT }}
        animate={{
          height: menuOpen ? expandedHeight : NAVBAR_HEIGHT,
          transition: {
            duration: 0.3,
            ease: "easeInOut",
            delay: menuOpen ? 0 : 0.1, // Add delay only when closing
          },
        }}
        className="fixed top-0 left-0 w-full backdrop-blur-md bg-lucas-main-bg/80 z-[-1]"
        style={{ pointerEvents: "none" }}
      />
      {/* Navbar */}
      <div className="fixed w-screen">
        <div className="flex items-center justify-between p-6 px-8 max-w-350 mx-auto">
          {/* Left rounded section */}
          <RoundedSection className="lg:px-8 py-3 lg:space-x-8">
            <RoundButton
              href="/"
              className="text-2xl font-bold text-lucas-main-color hover:bg-lucas-white-hover"
            >
              Lucas Arden
            </RoundButton>
            <nav>
              <ul className="hidden lg:flex space-x-6">
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
          {session && session.user ? (
            <RoundedSection className="flex px-4 py-3 lg:space-x-4 lg:px-8">
              <button
                className="block lg:hidden"
                aria-label="Open menu"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {/* Hamburger icon SVG */}
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 10h20M6 16h20M6 22h20" />
                </svg>
              </button>
              <RoundButton
                onClick={handleLogout}
                className="hidden lg:flex border-2 border-lucas-main-color"
              >
                Log Out
              </RoundButton>
              <RoundButton
                href="/my-account"
                className="hidden lg:flex bg-lucas-main-color text-white hover:bg-lucas-main-color-hover"
              >
                My Account
              </RoundButton>
            </RoundedSection>
          ) : (
            <RoundedSection className="flex px-4 py-3 lg:space-x-4 lg:px-8">
              <button
                className="block lg:hidden"
                aria-label="Open menu"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {/* Hamburger icon SVG */}
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 10h20M6 16h20M6 22h20" />
                </svg>
              </button>
              <RoundButton
                href="/login"
                className="hidden lg:flex border-2 border-lucas-main-color"
              >
                Login
              </RoundButton>
              <RoundButton
                href="/create-account"
                className="hidden lg:flex bg-lucas-main-color text-white hover:bg-lucas-main-color-hover"
              >
                Create Account
              </RoundButton>
            </RoundedSection>
          )}
        </div>
      </div>
      {/* Dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, ease: "easeInOut", delay: 0.1 }, // fade in AFTER blur
            }}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.2, ease: "easeInOut", delay: 0 }, // fade out IMMEDIATELY
            }}
            className="fixed left-0 w-full flex flex-col items-center lg:hidden z-40"
            style={{ top: `${NAVBAR_HEIGHT}px` }}
          >
            <MenuButton href="/projects">Projects</MenuButton>
            <MenuButton href="/contact">Contact</MenuButton>
            {session && session.user ? (
              <>
                <MenuButton href="/my-account">My Account</MenuButton>
                <MenuButton onClick={handleLogout}>Log Out</MenuButton>
              </>
            ) : (
              <>
                <MenuButton href="/login">Login</MenuButton>
                <MenuButton href="/create-account">Create Account</MenuButton>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Spacer to push content below the navbar */}
      <div className="h-[120px]" />
    </div>
  );
};

export default Navbar;
