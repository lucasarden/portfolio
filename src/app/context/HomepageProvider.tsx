"use client";
import { createContext, useState, useContext } from "react";

interface HomepageContextType {
  isLeavingPage: boolean;
  handleButtonClick: () => void;
  resetState: () => void;
}

const HomepageContext = createContext<HomepageContextType | null>(null);

export const useHomepage = () => {
  const context = useContext(HomepageContext);
  if (context === null) {
    throw new Error("useHomepage must be used within a HomepageProvider");
  }

  return context;
};

export const HomepageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLeavingPage, setIsLeavingPage] = useState(false);

  const handleButtonClick = () => {
    setIsLeavingPage(true);
  };

  const resetState = () => {
    setIsLeavingPage(false);
  };

  return (
    <HomepageContext.Provider
      value={{ isLeavingPage, handleButtonClick, resetState }}
    >
      {children}
    </HomepageContext.Provider>
  );
};
