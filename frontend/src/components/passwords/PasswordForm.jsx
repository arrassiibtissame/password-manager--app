import {useState} from "react";
import api from "../../api/axios";
function PasswordForm ({onSuccess}){
    const [form, setForm] = useState({
        title:"",
        site:"",
        username:"",
        password:"",
    });
    const [loading,setLoading ] =useState(false);
    const handleChange =(e) =>{
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value,
            });
            };
            const handleSubmit = async (e) => {
                e.preventDefault ();
                if(!form.title || !form.site || !form.password){
                    return alert ("Fill all fields");
                }
                try {
                    setLoading(true);
                    await api.post("/passwords",form);
                    setForm ({
                        title:"",
                        site:"",
                        username:"",
                        password:"",
                    });
                    onSuccess();
                }catch (err){
                    console.log(err);
                    alert("Error");
                }finally{
                    setLoading(false);
                }
                };
                return (
                    <form
                    onSubmit ={handleSubmit}
                    style={{
                        marginBottom:"20px",
                        display:"flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                    
                    ><h3>Add New Password</h3>
                    <input 
                    name ="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    />
                    <input 
                    name="site"
                    palaceholder="Site"
                    value= {form.site}
                    onChange = {handleChange} />
                    
                    <input 
                    name = "username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange} />
                   
                   <input 
                   name= "password"
                   type="password"
                   placeholder ="Password"
                   value= {form.password}
                   onChange ={handleChange}/>
                  <button type="submit" disabled = {loading }>
                    {loading ? "Adding..." : "Add Password"}
                  </button>

                    </form>
                );

                }
            
        
    export default PasswordForm;
