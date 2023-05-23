import { SelectInput } from "components/UI/SelectInput";
export const SelectTopics = ({ topic, topicList, setTopic }) => {
  const sortTopics = [{ value: "all", label: "All topics" }].concat(
    topicList.map((topic) => ({
      value: topic,
      label: topic.charAt(0).toUpperCase() + topic.slice(1),
    }))
  );
  const selectedOption = sortTopics.find((option) => option.value === topic);
  const handleSelectTopic = (selectedOption) => {
    setTopic(selectedOption.value);
  };
  return (
    <label className="mr-4 flex flex-col">
      <SelectInput
        name="selectedTopic"
        value={selectedOption}
        onChange={handleSelectTopic}
        options={sortTopics}
      />
    </label>
  );
};
