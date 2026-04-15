import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

function PasswordModal({ open, onClose, data, setData, onSave }) {
  return (
    <Modal open={open} onClose={onClose}>

      <h2 className="text-xl mb-4">Edit Password</h2>

      <Input
        placeholder="Title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <Input
        placeholder="Site"
        value={data.site}
        onChange={(e) => setData({ ...data, site: e.target.value })}
      />

      <Input
        placeholder="Username"
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />

      <Input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <div className="flex justify-end gap-2">
        <Button onClick={onClose} variant="danger">
          Cancel
        </Button>

        <Button onClick={onSave} variant="success">
          Save
        </Button>
      </div>

    </Modal>
  );
}

export default PasswordModal;