import { MdDelete } from "react-icons/md";
export const ButtonDelete = ({ handleDelete }) => {
  return (
    <button
      type="button"
      onClick={handleDelete}
      className="ml-2 text-gray-500 transition-all hover:text-green-700 active:text-green-600"
    >
      <MdDelete className="h-5 w-5" />
    </button>
  );
};
