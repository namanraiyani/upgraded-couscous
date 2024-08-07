import React from "react";
import { googleLogout } from "@react-oauth/google";

function Logout() {

    const handleLogout = () => {
        googleLogout();
        console.log("Logout successful!");
    };

    return (
        <div id="signInButton">
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
