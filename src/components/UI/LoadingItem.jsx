import InlineSVG from "react-inlinesvg";
import spinner from "assets/svg/spinner.svg";
export const LoadingItem = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <InlineSVG src={spinner} width={160} />
    </div>
  );
};
