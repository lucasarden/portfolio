import React from "react";

interface TextPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const TextPageWrapper = ({ children, className }: TextPageWrapperProps) => {
  return (
    <div className={`w-full dark:bg-black dark:text-white`}>
      <div
        className={`mx-auto px-8 max-w-175 pt-10 lg:max-w-300 space-y-4 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default TextPageWrapper;
