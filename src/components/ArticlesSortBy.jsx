export const ArticlesSortBy = ({ order, sortBy, setSortBy, setOrder }) => {
  const handleSelectSort = (e) => {
    setSortBy(e.target.value);
  };
  const handleSelectOrder = (e) => {
    setOrder(e.target.value);
  };
  return (
    <section className="sort-section">
      <label>
        {" "}
        Sort by:
        <select
          name="sort_by"
          id="sort_by"
          value={sortBy}
          onChange={handleSelectSort}
        >
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </select>
      </label>
      <label>
        Order:
        <select
          name="order"
          id="order"
          value={order}
          onChange={handleSelectOrder}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </section>
  );
};
