import PasswordCard from "./PasswordCard";
import api from "../../api/axios";

function PasswordList ({passwords,refresh}){
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
    console.log("Edit clicked:",password);
    //to connect the modal
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
    </div>

);
}
export default PasswordList;


