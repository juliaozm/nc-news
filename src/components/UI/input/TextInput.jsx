export const TextInput = ({
  setNewValue,
  placeholder,
  minLength,
  maxLength,
  required,
  value,
  autoComplete,
  className,
  disabled=false
}) => {
  const inputClasses =
    "block text-gray-500 outline-none bg-transparent focus:bg-transparent appearance-none focus:outline-none w-full border-b border-solid border-gray-500 p-3 pr-11 mb-4";
  return (
    <input
      type="text"
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      value={value}
      onChange={(e) => setNewValue(e.target.value)}
      autoComplete={autoComplete}
      className={`${inputClasses} ${className}`}
      disabled={disabled}
    />
  );
};
