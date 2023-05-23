export const ArticleReadSection = ({ article }) => {
  const date = new Date(Date.parse(article.created_at)).toLocaleString(
    "en-GB",
    { timeZone: "UTC" }
  );

  return (
    <article className="text-base 2xl:text-lg">
      <span className="mb-4 block text-gray-500">{date}</span>
      <h1 className="mb-1 font-mono text-2xl font-bold">{article.title}</h1>
      <h2 className="mb-6 text-lg">
        by <em className="capitalize">{article.author}</em> in{" "}
        <em className="capitalize">{article.topic}</em>
      </h2>
      <div className="mb-6 w-full sm:h-[20rem]">
        <img
          src={article.article_img_url}
          alt={`image for ${article.title}`}
          className="h-full w-full object-cover"
        ></img>
      </div>
      <p className="mb-2 indent-6">{article.body}</p>
      <p className="mb-6 indent-6">{article.body}</p>
    </article>
  );
};
