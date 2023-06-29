import { SelectInput } from "components/UI/input/SelectInput";

export const SelectLimit = ({ setLimit, limit, setPage }) => {
  const sortOptions = [
    { value: "6", label: "6" },
    { value: "10", label: "10" },
    { value: "24", label: "24" },
  ];
  const selectedOption = sortOptions.find((option) => option.value === limit);
  const handleSelectLimit = (selectedOption) => {
    setLimit(selectedOption.value);
    setPage(1);
  };
  return (
    <SelectInput
      name="limit"
      value={selectedOption}
      onChange={handleSelectLimit}
      options={sortOptions}
      selectLabel={"Per page"}
    />
  );
};
