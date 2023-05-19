import { TiCancel } from "react-icons/ti";
import { BackLink } from "components/UI/BackLink";
export const ErrorPage = () => {
  return (
    <section className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center">
      <TiCancel className="animate-pulse fill-red-700" size={200} />
      <h1 className="mb-6 font-mono text-2xl font-bold text-gray-800">
        Ooops... Page Not Found!
      </h1>
      <BackLink />
    </section>
  );
};
