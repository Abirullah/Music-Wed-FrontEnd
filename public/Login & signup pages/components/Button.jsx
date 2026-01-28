export default function Button({
  text = "Click",
  bg = "bg-black",
  textColor = "text-white",
  type = "button",
  textSize = "text-base",
  rounded = "rounded-full",
  onClick,
  icon,
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        className ||
        `
      flex items-center justify-center gap-2
      ${bg} ${textColor}  ${textSize} ${rounded}
      transition-all duration-300 hover:scale-105`
      }
    >
      {text}
      {icon && icon}
    </button>
  );
}
