import React from "react";

interface BannerProps {
  children: React.ReactNode;
  className?: string;
}

const Banner = ({ children, className }: BannerProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full shadow-lg dark:shadow-lucas-main-color ${className}`}
    >
      {children}
    </div>
  );
};

export default Banner;
