import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login Page ✅</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
}

export default Login;