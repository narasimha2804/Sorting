import React from "react";

function Footer(){
    var date = new Date();
    var year = date.getFullYear();
    return<div className="Footer"> 
    <p>copyright @{year}</p>
    <p>Made with ♥ by narasimha</p>
    </div>
}

export default Footer;