"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import RoundButton from "@/app/components/dev-starving/RoundButton";
import RoundedSection from "@/app/components/dev-starving/RoundedSection";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

interface MenuButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const MENU_ITEM_COUNT = 4; // Number of dropdown items
const MENU_ITEM_HEIGHT = 57; // px, adjust to match the MenuButton's height
const NAVBAR_HEIGHT = 80.45; // px, adjust to match the navbar's height

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const storeSlug = segments[1];

  const { data: session } = useSession();
  const router = useRouter();

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
    setMenuOpen(false);

    await signOut();

    router.push("/login");
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
        className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/80 z-[-1]"
        style={{ pointerEvents: "none" }}
      />
      {/* Navbar */}
      <div className="fixed w-screen border-b-2 border-gray-300 h-[80.45px]">
        <div className="flex items-center justify-between py-2 px-4 sm:px-7 md:px-15 max-w-450 mx-auto space-x-6">
          {/* Left rounded section */}
          <Link href="/dev-starving">
            <Image
              src="/images/starving-banner.jpg"
              alt="Starving Logo"
              width={275}
              height={65}
              className="hidden md:flex rounded-lg"
            />
            <Image
              src="/images/starving-logo.jpg"
              alt="Starving Logo"
              width={65}
              height={65}
              className="md:hidden rounded-full"
            />
          </Link>
          <SearchBar />
          {/* Right rounded section */}
          <RoundedSection className="flex px-3 py-2.5 lg:space-x-4 lg:px-5">
            <button
              className="block lg:hidden cursor-pointer transition hover:bg-lucas-white-hover rounded-md px-1 py-0.5"
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hamburger"
              >
                <line
                  x1="4"
                  y1="6"
                  x2="20"
                  y2="6"
                  className={`transition-transform duration-300 origin-center ${
                    menuOpen
                      ? "rotate-45 translate-y-[4px] -translate-x-[4px]"
                      : ""
                  }`}
                />
                <line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  className={`transition-transform duration-300 ${
                    menuOpen
                      ? "-rotate-45 translate-y-[12px] -translate-x-[5px]"
                      : ""
                  }`}
                />
                <line
                  x1="4"
                  y1="18"
                  x2="20"
                  y2="18"
                  className={`transition-all duration-300 origin-center ${
                    menuOpen ? "opacity-0 translate-y-1" : ""
                  }`}
                />
              </svg>
            </button>
            {session && session.user ? (
              <>
                <RoundButton
                  onClick={handleLogout}
                  className="hidden lg:flex border-2 border-black"
                >
                  Log Out
                </RoundButton>
                <RoundButton
                  href={`/dev-starving/${storeSlug}/my-account`}
                  className="hidden lg:flex bg-gray-900 text-white hover:bg-gray-800"
                >
                  My Account
                </RoundButton>
              </>
            ) : (
              <>
                <Link
                  href={`/dev-starving/${storeSlug}/cart`}
                  className="hidden lg:flex flex-col items-center rounded-full px-2 py-0.5 hover:text-cyan-600 transition duration-150"
                >
                  <FaShoppingCart />
                  Cart
                </Link>
                <RoundButton
                  href={`/dev-starving/${storeSlug}/login`}
                  className="hidden lg:flex border-2 border-black"
                >
                  Login
                </RoundButton>
                <RoundButton
                  href={`/dev-starving/${storeSlug}/create-account`}
                  className="hidden lg:flex bg-gray-900 text-white hover:bg-tsm-gray"
                >
                  Create Account
                </RoundButton>
              </>
            )}
          </RoundedSection>
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
      <div style={{ height: NAVBAR_HEIGHT }} />
    </div>
  );
};

export default Navbar;
