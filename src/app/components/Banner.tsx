import React from "react";

interface BannerProps {
  children: React.ReactNode;
  className?: string;
}

const Banner = ({ children, className }: BannerProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-screen h-64 bg-lucas-main-color shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Banner;
