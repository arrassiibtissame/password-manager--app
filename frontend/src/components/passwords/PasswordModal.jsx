import Modal from "../ui/Modal";
import Input from "../ui/Input";
function PasswordModal({open,onClose,data,setData,onSave}){
    return(
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
        placeholder="Password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button onClick={onSave} className="mt-4 bg-green-600 p-2 rounded">
        Save
      </button>
        </Modal>
    );
}
export default PasswordModal;