"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import RoundButton from "@/app/components/RoundButton";
import ThemeToggle from "@/app/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface MenuButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const MENU_ITEM_COUNT = 5; // Number of dropdown items
const MENU_ITEM_HEIGHT = 57; // px, adjust to match your MenuButton's height
const NAVBAR_HEIGHT = 64; // px, adjust to match your navbar's height

const navLinkStyles =
  "font-mono text-sm text-muted hover:text-foreground hover:bg-accent-soft";

const MenuButton = ({
  href = "",
  children,
  className = "",
  onClick,
}: MenuButtonProps) => (
  <Link
    href={href}
    className={`w-full text-center py-4 px-4 font-semibold ${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

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

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="relative z-50 print:hidden">
      <motion.div
        initial={{ height: NAVBAR_HEIGHT }}
        animate={{
          height: menuOpen ? expandedHeight : NAVBAR_HEIGHT,
          transition: {
            duration: 0.3,
            ease: "easeInOut",
            delay: menuOpen ? 0 : 0.1,
          },
        }}
        className="fixed top-0 left-0 w-full backdrop-blur-md bg-background/80 border-b border-edge z-[-1]"
        style={{ pointerEvents: "none" }}
      />
      <div className="fixed w-full">
        <div className="mx-auto flex h-16 max-w-350 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-1 lg:gap-6">
            <RoundButton
              href="/"
              className="px-2 text-lg font-semibold tracking-tight text-foreground"
              doNotDisableMatrix
            >
              Lucas Arden
            </RoundButton>
            <nav>
              <ul className="hidden items-center gap-1 lg:flex">
                <li>
                  <RoundButton href="/projects" className={navLinkStyles}>
                    Projects
                  </RoundButton>
                </li>
                <li>
                  <RoundButton href="/resume" className={navLinkStyles}>
                    Resume
                  </RoundButton>
                </li>
                <li>
                  <RoundButton href="/contact" className={navLinkStyles}>
                    Contact
                  </RoundButton>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <ThemeToggle />
            <button
              className="block cursor-pointer rounded-md px-1 py-0.5 transition hover:bg-accent-soft lg:hidden"
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                width="28"
                height="28"
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
                  className="hidden border border-edge-strong font-mono text-sm hover:bg-accent-soft lg:flex"
                >
                  Log Out
                </RoundButton>
                <RoundButton
                  href="/my-account"
                  className="hidden bg-accent font-mono text-sm text-white hover:bg-accent-hover dark:text-background lg:flex"
                >
                  My Account
                </RoundButton>
              </>
            ) : (
              <>
                <RoundButton
                  href="/login"
                  className="hidden border border-edge-strong font-mono text-sm hover:bg-accent-soft lg:flex"
                >
                  Login
                </RoundButton>
                <RoundButton
                  href="/create-account"
                  className="hidden bg-accent font-mono text-sm text-white hover:bg-accent-hover dark:text-background lg:flex"
                >
                  Create Account
                </RoundButton>
              </>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, ease: "easeInOut", delay: 0.1 },
            }}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.2, ease: "easeInOut", delay: 0 },
            }}
            className="fixed left-0 w-full flex flex-col items-center lg:hidden z-40"
            style={{ top: `${NAVBAR_HEIGHT}px` }}
          >
            <MenuButton href="/projects" onClick={closeMenu}>
              Projects
            </MenuButton>
            <MenuButton href="/resume" onClick={closeMenu}>
              Resume
            </MenuButton>
            <MenuButton href="/contact" onClick={closeMenu}>
              Contact
            </MenuButton>
            {session && session.user ? (
              <>
                <MenuButton href="/my-account" onClick={closeMenu}>
                  My Account
                </MenuButton>
                <MenuButton onClick={handleLogout}>Log Out</MenuButton>
              </>
            ) : (
              <>
                <MenuButton href="/login" onClick={closeMenu}>
                  Login
                </MenuButton>
                <MenuButton href="/create-account" onClick={closeMenu}>
                  Create Account
                </MenuButton>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-16" />
    </div>
  );
};

export default Navbar;
