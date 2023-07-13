import { BiHide, BiShow } from "react-icons/bi";

export const ButtonToggleShow = ({ isPasswordShown, setPasswordShown }) => {
  const handleOpen = () => {
    setPasswordShown(!isPasswordShown);
  };
  return (
    <button
      type="button"
      className="flex w-full items-center rounded border border-solid border-gray-200 p-2 transition hover:border-neutral-300 active:border-green-700"
      onClick={() => handleOpen()}
    >
      {isPasswordShown ? (
        <>
          <BiHide className="fill-gray-500" />
        </>
      ) : (
        <>
          <BiShow className="fill-gray-500" />
        </>
      )}
    </button>
  );
};
