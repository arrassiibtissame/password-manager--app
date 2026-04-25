import {useState, useEffect} from "react";
import api from "../../api/axios";

function PasswordModal ({isOpen, onClose, password, refresh}){
  const [form, setForm]=useState({
    title:"",
    site:"",
    username:"",
    password:"",
  });
  //fill the form when editing
  useEffect(()=>{
    if (password){
      setForm({
        title: password.title || "",
        site: password.site || "",
        username: password.username || "",
        password: password.password || "",
      });
    }
  },[password]);
  
  const handleChange =(e) => {
    setForm ({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = async() => {
    try{
      await api.put(`/passwords/${password._id}`,form);
      refresh();
      onClose();

    }
    catch (err){
      console.log(err);
      alert ("Update failed");
    }
  };
  if(!isOpen) return null;
  return( 
    <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
>
  <div
    style ={overlayStyle}>
      <div style ={modalStyle}>
        <h2>Edit Password</h2>
        <input name ="title" value ={form.title || ""} onChange={handleChange}/>
        <input name ="site" value ={form.site || ""} onChange={handleChange}/>
        <input name ="username" value ={form.username || ""} onChange={handleChange}/>
        <input name ="password" value ={form.password || ""} onChange={handleChange}/>

<div style={{marginTop:"10px"}}>
  <button onClick = {handleUpdate} >Save</button>
  <button onClick ={onClose}>Cancel</button>
</div>
      </div>
    </div>
  </motion.div>
  );

  
}
const overlayStyle ={
  position: "fixed",
  top:0,
  left:0,
  right:0,
  bottom:0,
  background:"rgba (0,0,0,0.6)",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",

};
const modalStyle={
  background:"white",
  padding:"20px",
  borderRadius:"10px",
  width:"300px",
  display:"flex",
  flexDirection:"column",
  gap:"10px",
};
export default PasswordModal;