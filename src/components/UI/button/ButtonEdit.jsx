export const ButtonEdit = ({ setEdit, className, text }) => {
  const buttonClasses =
    "outline-none text-xs rounded border md:text-base bg-white font-mono px-2 py-1 hover:bg-gray-300 text-gray-400 hover:text-white active:text-white active:bg-gray-500 transition-all";
  return (
    <button
      type="button"
      onClick={() => setEdit()}
      className={`${buttonClasses} ${className}`}
    >
      {text}
    </button>
  );
};
