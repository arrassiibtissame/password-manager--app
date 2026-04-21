import {useState} from "react";
function PasswordCard ({password,onDelete, onEdit}) {
    const [show, setShow]=useState(false);

    return (
        <div 
        style= {{
            background: "#1f2937",
            padding: "15px",
            borderRadius:"10px",
            marginBottom: "10px",
            color:"white",
        }}>
            <h3>{password.title}</h3>
            <p><strong>Site:</strong>{password.site}</p>
            <p><strong>Username:</strong>{password.username}</p>
<p>
    <strong>Password:</strong>{" "}
    {show ? password.password :"......."}
</p>
<div style ={{display:"flex",gap:"10px",marginTop:"10px"}}>
    <button onClick ={()=> setShow (!show)}>
        {show ? "Hide" : "Show 👁"}
    </button>
    <button onClick ={() => onEdit(password)}>Edit</button>
    <button onClick ={() => onDelete(password._id)}>Delete</button>
</div>
        </div>
    );
}
export default PasswordCard;