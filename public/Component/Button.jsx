export default function Button({
  text = "Click",
  bg = "bg-black",
  textColor = "text-white",

  textSize = "text-base",
  rounded = "rounded-full",
  onClick,
  icon,
}) {
  return (
    <button
      onClick={onClick}
      className={`
      flex items-center justify-center gap-2
      ${bg} ${textColor}  ${textSize} ${rounded}
      transition-all duration-300 hover:scale-105`}
    >
      {text}
      {icon && icon}
    </button>
  );
}
