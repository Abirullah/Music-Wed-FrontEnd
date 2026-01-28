export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  className,
  maxLength,
  name,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        name={name}
        className={
          className 
        }
      />
    </div>
  );
}
