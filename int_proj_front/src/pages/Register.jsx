import { useState } from "react";
import { register } from "../services/auth";
import { Navigate, useNavigate } from "react-router-dom";


function Registration(){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [passwordVerif, setPasswordVerif]=useState("");

    const register= async(e)=>{
        e.preventDefault();
        if (password !== passwordVerif) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
        try {
            const response = await register({ email, password });
            if (response.status === 201) {
                alert("Inscription réussie !");
                Navigate("/")
            } else {
                alert("Erreur lors de l'inscription.");
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    }

    return(
        <form onSubmit={register}>
            <input value={email} placeholder="email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="verification du mot de passe" onChange={e => setPasswordVerif(e.target.value)} />
            <button type="submit">Create account</button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </form>
    )
}

export default Registration;