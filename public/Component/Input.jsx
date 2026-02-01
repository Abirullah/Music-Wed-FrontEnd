export default function Input({ id, label, placeholder, type = "text", value = "", onChange = () => {}, error = "" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={`border rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-black ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}




