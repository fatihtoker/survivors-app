import { useState } from "react";

type SearchBarProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
};

export default function SearchBar(props: SearchBarProps) {
  const { onChange, searchText } = props;

  return (
    <form>
      <input
        type="text"
        className="block w-full mb-4 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search survivors..."
        required
        onChange={onChange}
        value={searchText}
      />
    </form>
  );
}
