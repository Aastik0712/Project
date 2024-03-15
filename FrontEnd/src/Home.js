
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


export default function Home() 
{    const nav = useNavigate();
    
    if(!localStorage.getItem('jwtToken'))
    {
        nav('/login');
    }


    return (
        <div>
            <h1>Home</h1>
            <Link to = "/login">Login</Link>
        </div>
    );
}