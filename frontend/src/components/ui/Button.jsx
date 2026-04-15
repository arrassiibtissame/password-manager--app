function Button({ children, onClick, type = "button", variant = "primary" }) {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-600 hover:bg-red-700",
    success: "bg-green-600 hover:bg-green-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 py-2 rounded text-white ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;