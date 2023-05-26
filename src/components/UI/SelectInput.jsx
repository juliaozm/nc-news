import Select from "react-select";
export const SelectInput = ({ selectLabel, value, onChange, options }) => {
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 50,
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isSelected || state.isFocused ? "#16a34a" : "",
      boxShadow: state.isFocused ? "#22c55e" : "none",
      "&:hover": {
        boxShadow: state.isFocused ? "green" : "none",
        borderColor: state.isFocused ? "green" : "#d4d4d4",
        cursor: "pointer",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#15803d" : "",
      color: state.isSelected ? "#ffffff" : "",
      "&:hover": {
        backgroundColor: "#16a34a",
        color: "#ffffff",
      },
    }),
  };
  return (
    <div className="mb-1 ml-2 mr-2 mt-1 flex flex-col">
      <span className="mb-1 block font-semibold">{selectLabel}</span>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        styles={customStyles}
        closeMenuOnScroll={true}
      />
    </div>
  );
};
