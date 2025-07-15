"use client";
import clsx from "clsx";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [search, setSearch] = useState("");

  return (
    <form
      className={clsx(
        "flex flex-grow items-center h-12 border border-gray-300 rounded-md overflow-hidden bg-white",
        className
      )}
    >
      <input
        type="text"
        value={search}
        className="flex-grow h-full px-3 placeholder-gray-400 focus:outline-none text-lg"
        placeholder="Search for new and used gear..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="hidden md:flex h-full px-3 border-l border-gray-300 bg-white hover:bg-gray-100 items-center justify-center cursor-pointer"
        aria-label="Search"
      >
        <FiSearch className="w-5 h-5 text-gray-600" />
      </button>
    </form>
  );
};

export default SearchBar;
