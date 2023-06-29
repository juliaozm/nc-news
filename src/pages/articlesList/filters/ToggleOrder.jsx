import { BsSortDownAlt, BsSortUpAlt } from "react-icons/bs";
export const ToggleOrder = ({ order, setOrder, setPage }) => {
  const handleSelectOrder = (selectedOrder) => {
    setOrder(selectedOrder);
    setPage(1);
  };
  return (
    <div className="mb-1 ml-2 mr-2 mt-1 flex flex-col">
      <span className="mb-1 block font-semibold">Order</span>
      <button
        onClick={() => handleSelectOrder(order === "desc" ? "asc" : "desc")}
        className="h-9 rounded border border-solid border-gray-200 p-2.5 transition-all hover:border-neutral-300 active:border-green-700"
      >
        {order === "desc" ? (
          <BsSortDownAlt className="h-full w-full" />
        ) : (
          <BsSortUpAlt className="h-full w-full" />
        )}
      </button>
    </div>
  );
};
