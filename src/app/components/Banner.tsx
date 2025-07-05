import React from "react";

interface BannerProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}

const Banner = ({
  children,
  className,
  bgColor = "bg-lucas-main-color",
}: BannerProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-screen ${bgColor} shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Banner;
