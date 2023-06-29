import { SelectInput } from "components/UI/input/SelectInput";

export const SelectTopics = ({ topic, topicList, setTopic, setPage }) => {
  const sortTopics = [{ value: "all", label: "All topics" }].concat(
    topicList.map((topic) => ({
      value: topic,
      label: topic.charAt(0).toUpperCase() + topic.slice(1),
    }))
  );
  const selectedOption = sortTopics.find((option) => option.value === topic);
  const handleSelectTopic = (selectedOption) => {
    setTopic(selectedOption.value);
    setPage(1);
  };
  return (
    <SelectInput
      name="selectedTopic"
      value={selectedOption}
      onChange={handleSelectTopic}
      options={sortTopics}
      selectLabel={"Topic"}
    />
  );
};
