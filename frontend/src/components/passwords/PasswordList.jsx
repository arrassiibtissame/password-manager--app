import { useState } from "react";
import { motion } from "framer-motion";
import PasswordCard from "./PasswordCard";
import PasswordModal from "./PasswordModal";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

function PasswordList({ passwords, refresh }) {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/passwords/${id}`);
      refresh();
      toast.success("Password deleted");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (password) => {
    setSelected(password);
    setOpen(true);
  };

  if (passwords.length === 0) {
    return (
      <div className="pw-empty">
        <svg viewBox="0 0 24 24" fill="none" width="40" height="40">
          <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p>No passwords yet. Add your first one!</p>
      </div>
    );
  }

  return (
    <>
      <div className="pw-grid">
        {passwords.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <PasswordCard
              password={p}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </motion.div>
        ))}
      </div>

      <PasswordModal
        isOpen={open}
        onClose={() => setOpen(false)}
        password={selected}
        refresh={refresh}
      />
    </>
  );
}

export default PasswordList;