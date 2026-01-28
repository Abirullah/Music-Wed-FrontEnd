export default function Input({ label, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}




