import React from "react";

interface SearchBarProps {
  search: string;
  setSearch: (val: string) => void;
  availability: string;
  setAvailability: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  availability,
  setAvailability,
}) => (
  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
    <input
      type="text"
      placeholder="Search skills..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-1 px-3 py-2 border rounded"
    />
    <select
      value={availability}
      onChange={(e) => setAvailability(e.target.value)}
      className="px-3 py-2 border rounded"
    >
      <option value="">Any Availability</option>
      <option value="weekends">Weekends</option>
      <option value="evenings">Evenings</option>
      <option value="anytime">Anytime</option>
    </select>
  </div>
);

export default SearchBar;
