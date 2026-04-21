import PasswordModal from "./PasswordModal";
import {useState }from "react";
import PasswordCard from "./PasswordCard";
import api from "../../api/axios";



function PasswordList ({passwords,refresh}){
    const [selected, setSelected] = useState(null);
const [open, setOpen] = useState(false);
    const handleDelete =async (id) => {
        try {
        await api.delete (`/passwords/${id}`);
refresh();
    }catch (err){
        console.log(err);
        alert("Error deleting");
    }
};
const handleEdit =(password )=> {
    setSelected(password);
    setOpen(true);
}
return (
    <div>
        {passwords.lenght ===0 ?
        (<p>No passwords yet</p>) :(
            passwords.map((p) =>(
                <PasswordCard 
                key={p._id}
                password={p}
                onDelete={handleDelete}
                onEdit={handleEdit}
                />
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


