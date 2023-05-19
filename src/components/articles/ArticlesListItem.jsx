import { Link } from "react-router-dom";
import {
  HiChatBubbleLeftRight,
  HiStar,
  HiCalendar,
  HiArrowRightCircle,
} from "react-icons/hi2";
import { ButtonPrimary } from "components/UI/ButtonPrimary";

export const ArticlesListItem = ({ article }) => {
  const date = new Date(Date.parse(article.created_at)).toLocaleString(
    "en-GB",
    { timeZone: "UTC" }
  );
  return (
    <Link to={`/articles/${article.article_id}`}>
      <li className="group/item relative flex h-full flex-col lg:rounded-2xl lg:border lg:border-transparent lg:p-4 lg:hover:border-green-700 2xl:p-5">
        <div>
          <div className="relative mb-4 h-52 2xl:h-72">
            <div className="group/read absolute bottom-5 left-3 z-20 opacity-0 transition-all lg:group-hover/item:opacity-100">
              <ButtonPrimary
                text={"Read more"}
                svg={
                  <HiArrowRightCircle
                    size={22}
                    className="ml-2 transition-all group-hover/read:translate-x-1"
                  />
                }
              ></ButtonPrimary>
            </div>
            <img
              src={article.article_img_url}
              alt={`image for ${article.title}`}
              className="h-full w-full object-cover"
            ></img>
            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-black to-transparent opacity-0 group-hover/item:opacity-50 group-hover/item:transition-opacity"></div>
          </div>
          <p className="mb-2 font-semibold uppercase text-green-700">
            {article.topic}
          </p>
        </div>

        <div className="flex h-full flex-col justify-between ">
          <div>
            <h3 className="mb-2 line-clamp-2 font-mono text-xl font-bold capitalize text-gray-900 hover:text-green-700 hover:transition">
              {article.title}
            </h3>
            <p className="mb-2 font-medium capitalize text-gray-500">
              by {article.author}
            </p>
          </div>

          <div className="text-gray-500">
            <p className="mb-4 line-clamp-4 capitalize"> {article.body} </p>
            <div className="flex justify-between font-semibold">
              <time dateTime={date} className="flex items-center">
                <HiCalendar className="mr-2" />
                {date}
              </time>
              <p className="flex items-center">
                <HiStar className="mr-2" />
                <span>{article.votes} </span>
              </p>
              <p className="flex items-center">
                <HiChatBubbleLeftRight className="mr-2" />
                <span>{article.comment_count} </span>
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};
