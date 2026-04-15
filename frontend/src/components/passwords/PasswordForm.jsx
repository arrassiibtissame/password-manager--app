function PasswordForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [site, setSite] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ title, site, username, password });
        setTitle("");
        setSite("");
        setUsername("");
        setPassword("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Site" value={site} onChange={(e) => setSite(e.target.value)} />
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Add Password</button>
        </form>
    );
}
export default PasswordForm;