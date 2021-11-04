import React from 'react'
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="heading">
            <h1>SKY HIGH DATA ANALYSIS</h1>
        
            <Link to="/chart">Task</Link>
            <Link to="/" >Table Data</Link>
         
        </div>
        
    )
}

export default Header
