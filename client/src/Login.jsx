import React from 'react';
import "./styles/Signin.css";

import { ethers } from 'ethers';
import abiJson from './contracts/Freelancing.json';
import {address} from './config.js'

export default function Login() {
    const handleSubmit = async (event)=>{
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const userName = formData.get("name");
        const password = formData.get("password");
        if(window.ethereum){
            try{
                const provider = new ethers.BrowserProvider(window.ethereum); 
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(
                    address,
                    abiJson.abi,
                    signer
                )
                let data = contract.sigIn(userName, password);
                if(data == 1){
                    console.log("Got signIn");
                }
                else if(data == 2){
                    console.log("Username already selected");
                }
                else{
                    console.log("Already registerd");
                }
            } 
            catch(err){
                console.log("Error in ethereum connection: ", err);
            }
        }
    }
    return (
        <div className="login-content">
        <form className="signIn-form" action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input id="name" name="name" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" name='password' type="password" />
        <button>Login</button>
        </form>
        </div>
    );
}

