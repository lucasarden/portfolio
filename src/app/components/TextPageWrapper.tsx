import React from "react";

interface TextPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const TextPageWrapper = ({ children, className }: TextPageWrapperProps) => {
  return (
    <main className={`container mx-auto sm:p-5 sm:py-5 md:p-20 md:py-10 ${className}`}>
      {children}
    </main>
  );
};

export default TextPageWrapper;
