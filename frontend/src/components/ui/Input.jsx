function Input({ type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 mb-3 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default Input;