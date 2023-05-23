export const ButtonPrimary = ({ text, svg = false, className }) => {
  const buttonClasses =
    "flex items-center font-mono justify-center px-3 py-2 bg-green-700 rounded-lg hover:bg-green-600 active:bg-green-500 outline-none text-white hover:transition-all font-medium text-lg";
  return (
    <button className={`${buttonClasses} ${className}`}>
      {text}
      {svg}
    </button>
  );
};
