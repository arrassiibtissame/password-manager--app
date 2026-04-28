import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

function PasswordForm({ onSuccess, onClose }) {
  const [form, setForm] = useState({ title: "", site: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.site || !form.password) {
      return toast.error("Please fill all required fields");
    }
    try {
      setLoading(true);
      await api.post("/passwords", form);
      toast.success("Password added!");
      onSuccess();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add password");
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="modal-title">Add New Password</h2>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-field">
            <label className="modal-label">Title <span className="modal-required">*</span></label>
            <input className="modal-input" name="title" placeholder="e.g. Gmail" value={form.title} onChange={handleChange}/>
          </div>
          <div className="modal-field">
            <label className="modal-label">Site <span className="modal-required">*</span></label>
            <input className="modal-input" name="site" placeholder="e.g. gmail.com" value={form.site} onChange={handleChange}/>
          </div>
          <div className="modal-field">
            <label className="modal-label">Username</label>
            <input className="modal-input" name="username" placeholder="e.g. johndoe" value={form.username} onChange={handleChange}/>
          </div>
          <div className="modal-field">
            <label className="modal-label">Password <span className="modal-required">*</span></label>
            <input className="modal-input" name="password" type="password" placeholder="••••••••••" value={form.password} onChange={handleChange}/>
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="modal-btn-submit" disabled={loading}>
              {loading ? "Adding..." : "Add Password"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default PasswordForm;