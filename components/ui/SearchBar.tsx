import { FiSearch } from "react-icons/fi";
import { Input } from "./Input";
export default function SearchBar() {
  return (
    <div className="m-4 p-4">
      <div className="relative">
        <FiSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="할인 검색"
          className="w-full border-emerald-200 pl-9 focus-visible:ring-1 focus-visible:ring-emerald-100 focus-visible:ring-offset-1 dark:focus-visible:ring-emerald-500"
        />
      </div>
    </div>
  );
}
