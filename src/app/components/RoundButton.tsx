import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface RoundButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const RoundButton = ({
  href,
  children,
  className = "",
  disabled,
}: RoundButtonProps) => {
  // Provide sensible defaults, but allow full override via className
  const baseClasses =
    "px-4 py-2 rounded-full font-semibold transition-colors justify-center";
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
