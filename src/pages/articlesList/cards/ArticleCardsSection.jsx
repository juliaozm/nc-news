import { ArticleCard } from "pages/articlesList/cards/ArticleCard";

export const ArticleCardsSection = ({ articles }) => {
  return (
    <ul className="mx-auto grid gap-x-4 gap-y-12 border-t border-gray-200 pt-4 md:grid-cols-2 lg:gap-x-2 lg:gap-y-8 xl:grid-cols-3">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </ul>
  );
};
