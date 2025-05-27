import React from "react";

interface TextPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const TextPageWrapper = ({ children, className }: TextPageWrapperProps) => {
  return (
    <main
      className={`container mx-auto px-20 py-10 max-w-350 space-y-4 ${className}`}
    >
      {children}
    </main>
  );
};

export default TextPageWrapper;
