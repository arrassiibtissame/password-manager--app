function Button({ children, loading, ...props }) {
  return (
    <button className="btn" disabled={loading} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;