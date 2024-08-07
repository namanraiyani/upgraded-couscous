import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const clientId = "537105498690-rvukqq5ieqde3i664jath4l7su58fvhc.apps.googleusercontent.com";

function Login() {

    const onSuccess = (res) => {
        const decodedToken = jwtDecode(res.credential);
        console.log("login success! Current user: ", decodedToken);
    }

    const onFailure = (res) => {
        console.log("Login Failed! res:", res);
    }

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;
