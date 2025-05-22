import React from "react";

interface TextPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const TextPageWrapper = ({ children, className }: TextPageWrapperProps) => {
  return (
    <main className={`container mx-auto p-20 py-10 ${className}`}>
      {children}
    </main>
  );
};

export default TextPageWrapper;
