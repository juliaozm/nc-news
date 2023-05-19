import { SelectInput } from "components/UI/SelectInput";
export const SelectSortBy = ({ sortBy, setSortBy }) => {
  const sortOptions = [
    { value: "created_at", label: "Date" },
    { value: "votes", label: "Votes" },
    { value: "comment_count", label: "Comments" },
  ];
  const selectedOption = sortOptions.find((option) => option.value === sortBy);
  const handleSelectSort = (selectedOption) => {
    setSortBy(selectedOption.value);
  };
  return (
    <SelectInput
      name="sort_by"
      id="sort_by"
      value={selectedOption}
      onChange={handleSelectSort}
      options={sortOptions}
    />
  );
};
