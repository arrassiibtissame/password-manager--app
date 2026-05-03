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


return (
    <Layout>
        {/*___________Page header________________*/}
        <motion.div
        className="dash-header"
        initial={{opacity: 0, y:-16}}
        animate={{opacity:1 , y:0}}
        transition={{duration:0.4}}
        >
            <div className="dash-header-left">
                <p className="dash-greeting">Manage</p>
                <h1 className="dash-username">Your Passwords</h1>
                <p className="dash-sub">{passwords.length} passwords stored securely .</p>

            </div>
            <div className="dash-stat-card">
                <span className="dash-stat-number">{passwords.lenght}</span>
                <span className="dash-stat-label">Total saved</span>
            </div>
        </motion.div>
        {/*_____________Password Generator___________*/}
        <motion.div className="gen-card"
        initial ={{opacity: 0, y:16}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.4, delay:0.1}}
        >
            <div className="gen-header">
                 <div className="gen-title-row">
            <div className="gen-icon">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h2 className="gen-title">Password Generator</h2>
              <p className="gen-sub">Create a strong secure password instantly</p>
            </div>
          </div>
        </div>
         {/* Generated output */}
        <div className="gen-output-wrap">
          <div className="gen-output">
            <span className="gen-output-text">{generated || "Click generate"}</span>
            <button className="gen-copy-btn" onClick={handleCopyGenerated}>
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <path d="M20 6L9 17l-5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
           {/* Strength bar */}
          {generated && (
            <div className="gen-strength-row">
              <div className="gen-strength-bars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="gen-strength-bar"
                    style={{ background: i <= strength.score ? strength.color : "rgba(255,255,255,0.08)" }}
                  />
                ))}
              </div>
              <span className="gen-strength-label" style={{ color: strength.color }}>
                {strength.label}
              </span>
            </div>
          )}
        </div>
        {/* Controls */}
        <div className="gen-controls">
          {/* Length slider */}
          <div className="gen-control-row">
            <label className="gen-label">Length</label>
            <div className="gen-slider-wrap">
              <input
                type="range"
                min="8"
                max="32"
                value={genLength}
                onChange={(e) => setGenLength(Number(e.target.value))}
                className="gen-slider"
              />
              <span className="gen-length-badge">{genLength}</span>
            </div>
          </div>
           {/* Checkboxes */}
          <div className="gen-checkboxes">
            {Object.entries(genOptions).map(([key, val]) => (
              <label key={key} className="gen-checkbox-label">
                <input
                  type="checkbox"
                  checked={val}
                  onChange={() => setGenOptions({ ...genOptions, [key]: !val })}
                  className="gen-checkbox"
                />
                <span className="gen-checkbox-text">
                  {key === "upper" ? "Uppercase (A-Z)" :
                   key === "lower" ? "Lowercase (a-z)" :
                   key === "numbers" ? "Numbers (0-9)" : "Symbols (!@#...)"}
                </span>
              </label>
            ))}
          </div>
          <button className="gen-btn" onClick={handleGenerate}>
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M23 4v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Generate new password
          </button>
        </div>
        </motion.div>
        {/* ── Toolbar ── */}
      <div className="dash-toolbar">
        <div className="dash-search-wrap">
          <svg className="dash-search-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            className="dash-search"
            placeholder="Search by title or site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="dash-add-btn" onClick={() => setShowForm(true)}>
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add Password
        </button>
      </div>
 
      {/* ── Password list ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <PasswordList passwords={filtered} refresh={fetchPasswords} />
      </motion.div>
 
      {/* ── Add modal ── */}
      {showForm && (
        <PasswordForm
          onSuccess={() => { fetchPasswords(); setShowForm(false); }}
          onClose={() => setShowForm(false)}
        />
      )}
    </Layout>
  );
}
 
export default Passwords;

 