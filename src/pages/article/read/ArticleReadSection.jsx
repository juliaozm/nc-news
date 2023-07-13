export const ArticleReadSection = ({ article }) => {
  const date = new Date(Date.parse(article.created_at)).toLocaleString(
    "en-GB",
    { timeZone: "UTC" }
  );

  return (
    <>
      <article className="text-base 2xl:text-lg">
        <div
          className="flex-column mb-6 flex w-full items-center justify-center rounded bg-cover bg-no-repeat xl:h-[400px]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('${article.article_img_url}')`,
          }}
        >
          <div className="p-4 md:w-3/4 md:p-8">
            <span className="mb-4 block text-gray-100">{date}</span>
            <h1 className="mb-1 font-mono text-lg font-bold text-gray-300 md:text-2xl">
              {article.title}
            </h1>
            <h2 className="mb-6 text-lg text-gray-300">
              by <em className="capitalize">{article.author}</em> in{" "}
              <em className="capitalize">{article.topic}</em>
            </h2>
          </div>
        </div>
        <p className="mx-auto mb-2 indent-6 md:max-w-[900px]">{article.body}</p>
        <p className="mx-auto mb-6 indent-6 md:max-w-[900px]">{article.body}</p>
      </article>
    </>
  );
};
