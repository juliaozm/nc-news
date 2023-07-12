export const APINotification = () => {
  return (
    <div className="w-full bg-green-300">
      <p className="mx-auto px-4 py-2 text-sm lg:container md:text-center lg:px-8 lg:text-base">
        The API is hosted on a free provider
        <span className="px-1 font-bold">
          <a
            href="https://julia-ozmitel-backend-project.onrender.com/api"
            target="_blank"
          >
            Render.com.
          </a>
        </span>
        Please note that it may take up to a minute to serve the first request
        as the server needs to spin up. Subsequent requests should be faster.
      </p>
    </div>
  );
};
