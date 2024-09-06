import { AiOutlineThunderbolt, AiOutlineBell } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-white shadow-sm py-2 px-4">
      <div className="flex items-center">
        <AiOutlineThunderbolt className="text-blue-500 text-2xl" />
        <span className="ml-2 font-bold text-lg">Globex Corporation</span>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full pl-10 pr-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>

        <AiOutlineBell className="ml-6 text-xl text-gray-500 cursor-pointer" />
        <div className="ml-6 w-8 h-8 rounded-full overflow-hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
