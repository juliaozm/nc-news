export const ArticleTopics = ({ topic, topicList, setTopic }) => {
  const handleSelectTopic = (e) => {
    setTopic(e.target.value);
  };
  return (
    <section className="select-topic">
      <h1>What topic are you interested in?</h1>
      <select name="selectedTopic" onChange={handleSelectTopic} value={topic}>
        <option key="all" value="all">
          All
        </option>
        {topicList.map((topic) => {
          return (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
            </option>
          );
        })}
      </select>
    </section>
  );
};
