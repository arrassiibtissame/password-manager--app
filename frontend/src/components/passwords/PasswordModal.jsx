import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

function PasswordModal({ isOpen, onClose, password, refresh }) {
  const [form, setForm] = useState({ title: "", site: "", username: "", password: "" });

  useEffect(() => {
    if (password) {
      setForm({
        title: password.title || "",
        site: password.site || "",
        username: password.username || "",
        password: password.password || "",
      });
    }
  }, [password]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/passwords/${password._id}`, form);
      toast.success("Password updated!");
      refresh();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-box"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit Password</h2>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="modal-form">
          <div className="modal-field">
            <label className="modal-label">Title</label>
            <input className="modal-input" name="title" value={form.title} onChange={handleChange}/>
          </div>
          <div className="modal-field">
            <label className="modal-label">Site</label>
            <input className="modal-input" name="site" value={form.site} onChange={handleChange}/>
          </div>
          <div className="modal-field">
            <label className="modal-label">Username</label>
            <input className="modal-input" name="username" value={form.username} onChange={handleChange}/>
          </div>
          <div className="modal-field">
            <label className="modal-label">Password</label>
            <input className="modal-input" name="password" value={form.password} onChange={handleChange}/>
          </div>

          <div className="modal-actions">
            <button className="modal-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="modal-btn-submit" onClick={handleUpdate}>Save changes</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PasswordModal;