import React from "react";

interface TextPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const TextPageWrapper = ({ children, className }: TextPageWrapperProps) => {
  return (
    <div className={`w-full`}>
      <div
        className={`mx-auto px-15 max-w-175 py-10 lg:max-w-300 space-y-4 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default TextPageWrapper;
