import clsx from "clsx";
import { useState } from "react";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [search, setSearch] = useState("");
  return (
    <div
      className={clsx(
        "bg-white mx-4 rounded-md h-12 w-full border-1 border-gray-300 justify-items-center",
        className
      )}
    >
      <form>
        <textarea
          value={search}
          className="w-full h-full px-3"
          placeholder="Search for new and used gear"
          onChange={(e) => setSearch(e.target.value)}
        ></textarea>
      </form>
    </div>
  );
};

export default SearchBar;
