import { RiFilterFill, RiFilterOffFill } from "react-icons/ri";

export const ToggleOpenFilters = ({ isFilterOpen, setFilterOpen }) => {
  const handleOpenFilters = () => {
    setFilterOpen(!isFilterOpen);
  };
  return (
    <button
      className="flex w-full items-center rounded border border-solid border-gray-200 p-2 transition hover:border-neutral-300 active:border-green-700"
      onClick={() => handleOpenFilters()}
    >
      {isFilterOpen ? (
        <>
          <RiFilterOffFill className="mr-2 fill-gray-500" />
          <span>Close filters</span>
        </>
      ) : (
        <>
          <RiFilterFill className="mr-2 fill-gray-500" />
          <span>Open filters</span>
        </>
      )}
    </button>
  );
};
