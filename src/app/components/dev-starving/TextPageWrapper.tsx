import clsx from "clsx";
import React from "react";

interface TextPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const TextPageWrapper = ({
  children,
  className = "",
}: TextPageWrapperProps) => {
  return (
    <div className="w-full">
      <div
        className={clsx(
          "mx-auto max-w-175 lg:max-w-300 px-8 pt-10 space-y-4",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default TextPageWrapper;
