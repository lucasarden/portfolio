import React from "react";

interface TextPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const TextPageWrapper = ({ children, className }: TextPageWrapperProps) => {
  return (
    <main className={`container mx-auto p-8 py-4 md:p-20 md:py-10 ${className}`}>
      {children}
    </main>
  );
};

export default TextPageWrapper;
