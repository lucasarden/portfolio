import React from "react";
import clsx from "clsx";

interface RoundButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const RoundButton = ({ href, children, className = "" }: RoundButtonProps) => {
  // Provide sensible defaults, but allow full override via className
  const baseClasses =
    "px-4 py-2 rounded-full font-semibold transition-colors flex justify-center";
  const defaultText = "text-lucas-main-color";
  const defaultHover = "hover:bg-lucas-white-hover";

  return (
    <a
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
    </a>
  );
};

export default RoundButton;
