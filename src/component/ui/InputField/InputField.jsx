import "./InputField.scss";

const InputField = ({
  id,
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}:</label>}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default InputField;
