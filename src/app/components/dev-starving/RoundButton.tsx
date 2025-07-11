"use client";
import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface RoundButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
  doNotDisableMatrix?: boolean;
}

const RoundButton = ({
  href = "",
  children,
  className = "",
  disabled,
  onClick,
  target,
  rel,
  doNotDisableMatrix = false,
}: RoundButtonProps) => {
  const baseClasses =
    "px-4 py-2 rounded-full font-semibold transition duration-300 justify-center";
  const defaultText = "text-lucas-main-color";
  const defaultHover = "hover:bg-lucas-white-hover";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  if (disabled) {
    return (
      <span
        className={clsx(baseClasses, defaultText, disabledClasses, className)}
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={clsx(
        baseClasses,
        // Only add default text color if not present in className
        !className.match(/text-\S+/) && defaultText,
        // Only add default hover if not present in className
        !className.match(/hover:bg-\S+/) && defaultHover,
        className
      )}
    >
      {children}
    </Link>
  );
};

export default RoundButton;
