import { useEffect, useState, useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import {color, motion } from "framer-motion";
import api from  "../api/axios";
import Layout from  "../components/layout/Layout";
import PasswordList from "../components/passwords/PasswordList";
import PasswordForm from "../components/passwords/PasswordForm";
import { toast } from "react-hot-toast";
import { label } from "framer-motion/client";
// password generator logic __________________________
const CHARS ={
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower : "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(lenght, options){
    let charset ="";
    if (options.upper) charset += CHARS.upper;
    if (options.lower) charset += CHARS.lower;
    if (options.numbers) charset += CHARS.numbers;
    if(options.symbols) charset+= CHARS.symbols;
    if (!charset) charset = CHARS.lower;

    let result ="";
    for(let i=0 ; i<lenght; i++){
        result += charset[Math.floor(Math.random()*charset.length)];

    }
    return result ;

}
function getStrentgth  (pwd){
    if (!pwd) return {label: "", color:"", score:0};
    let score=0;
     if (pwd.lenght >= 8) score++;
     if (pwd.lenght>=12) score++;
     if (/[A-Z]/.test(pwd)) score++ ;
     if  (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
 
  if (score <= 1) return {label: "Very weak", color: "#ef444",score};
  if (score === 2) return {label: " weak", color: "#ef97316",score};
  if (score === 3) return {label: "Fair", color: "#eab308",score};
  if (score === 4) return {label: "Strong", color: "#22c55e",score};
  return {label: "Very strong", color: "#9b59f7", score};

}
function Passwords (){
    const {token}= useContext(AuthContext);
    const [passwords, setPasswords]=useState([]);
    const [search, setSearch]=useState("");
    const [showForm, setShowForm]=useState(false);
    //Generator state

    const [genLength, setGenLength]=useState (16);
    const [genOptions, setGenOptions]= useState({
        upper:true, lower: true, numbers, symbols: false ,

    });
    const [generated ,setGenerated] = useState("");
    const [copied, setCopied]=useState(false);

    const fetchPasswords =async () =>{
        const res = await api.get ("/passwords");
        setPasswords (res.data);
    };
    useEffect (()=>{
        if (token) fetchPasswords ();
    },[token]);
    //generate on mount
    useEffect (() => {
        setGenerated(generatePassword(genLength, genOptions));

    }, []);

   const handleGenerate = () => {
    setGenerated(generatePassword(genLength, genOptions));
    setCopied(false);
  };

  const handleCopyGenerated =() => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    toast.success("Password copied!");
    setTimeout(() => setCopied(flase ),2000);
  };
  const strength = getStrentgth(generated);
  const filtered = passwords.filter ((p) => 
p.title?.toLowerCase().includes(search.toLowerCase())||
p.site?.toLowerCase().includes(search.toLowerCase())
);
}