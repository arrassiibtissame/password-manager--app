import PasswordModal from "./PasswordModal";
import {useState }from "react";
import PasswordCard from "./PasswordCard";
import api from "../../api/axios";
import { motion } from "framer-motion";
import {toast} from "react-hot-toast";

function PasswordList ({passwords,refresh}){
    const [selected, setSelected] = useState(null);
const [open, setOpen] = useState(false);
    const handleDelete =async (id) => {
        try {
        await api.delete (`/passwords/${id}`);
refresh();
    }catch (err){
        console.log(err);
        toast.error ("Something went wrong");
    }
};
const handleEdit =(password )=> {
    setSelected(password);
    setOpen(true);
}
return (
    <div>
        {passwords.length ===0 ?
        (<p>No passwords yet</p>) :(
            passwords.map((p) =>(
                <motion.div
    key={p._id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <PasswordCard 
                password={p}
                onDelete={handleDelete}
                onEdit={handleEdit}
                />
  </motion.div>



            ))
        )
    
    }
    <PasswordModal
    isOpen = {open}
    onClose={() => setOpen(false)}
    password= {selected}
    refresh={refresh}/>
    </div>

);
}
export default PasswordList;


