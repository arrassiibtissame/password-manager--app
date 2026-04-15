import {useEffect,useState} from "react";
import {
    getPasswords,
    addPassword,
    deletePassword,} from "../services/passwordService";
    export function usePasswords(){
        const [passwords, setPasswords] = useState([]);
        const fetchPasswords = async()=>{
            try {
                const data =await getPasswords();
                setPasswords(data);
            } catch (err) {
                console.error(err);}

            };
            const removePassword = async (id) =>{
                try {
                    await deletePassword(id);
                    fetchPasswords();
                }
                catch (err){
                    console.log(err);
                }
            };
            useEffect(() => {
                fetchPasswords();
            }, []);
            return {passwords, setPasswords, fetchPasswords, removePassword};   
    }
