export const ButtonLink = ({
  text,
  svg = false,
  className,
  disabled = false,
  type = "button",
}) => {
  const buttonClasses =
    "flex items-center font-mono justify-center px-3 py-2 bg-green-700 rounded-lg disabled:opacity-75 disabled:bg-green-700 hover:bg-green-600 active:bg-green-500 outline-none text-white transition-all font-medium text-lg";
  return (
    <button
      type={type}
      className={`${buttonClasses} ${className}`}
      disabled={disabled}
    >
      {text}
      {svg}
    </button>
  );
};
