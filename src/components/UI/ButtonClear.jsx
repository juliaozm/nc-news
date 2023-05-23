import { HiOutlineXMark } from "react-icons/hi2";
export const ButtonClear = ({ setDelete, className }) => {
  const buttonClasses =
    "outline-none absolute right-0 bottom-1/2 h-1/2 p-3 text-gray-700 ml-2 hover:text-green-700 active:text-green-600 transition-all";
  return (
    <button onClick={setDelete} className={`${buttonClasses} ${className}`}>
      <HiOutlineXMark />
    </button>
  );
};
