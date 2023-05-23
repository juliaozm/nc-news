import { BsSortDownAlt, BsSortUpAlt } from "react-icons/bs";
export const ToggleOrder = ({ order, setOrder }) => {
  const handleSelectOrder = (selectedOrder) => {
    setOrder(selectedOrder);
  };
  return (
    <>
      <button
        onClick={() => handleSelectOrder(order === "desc" ? "asc" : "desc")}
        className="rounded border border-solid border-gray-200 p-2 transition-all hover:border-neutral-300 active:border-green-700"
      >
        {order === "desc" ? (
          <BsSortDownAlt className="h-full w-full" />
        ) : (
          <BsSortUpAlt className="h-full w-full" />
        )}
      </button>
    </>
  );
};
