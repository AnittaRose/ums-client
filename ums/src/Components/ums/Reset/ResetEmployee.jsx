import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResetEmployee() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const [error, setError] = useState(null);
    // const [token, setToken] = useState(null);
    // const [id, setId] = useState(null); // Set id from URL params
    const [isLoading, setIsLoading] = useState(false);
    const [password ,setPassword] = useState();
    const [newpassword , setNewPassword] = useState()

    // Extract the query params from the URL

    const handleSubmit = async (event) => {
        event.preventDefault();

        const params = new URLSearchParams(window.location.search);
        const tokenKey = params.get("login");
        const userId = params.get("id");

        let token = localStorage.getItem(tokenKey)

        console.log("tokenKey:", tokenKey);
        console.log("userId:", userId);

        console.log("password",password);
        console.log('newPassword',newpassword);


        let data = {
            password,
            newpassword
        };
        console.log("data",data);

        let strdata  = JSON.stringify(data);
        console.log("strdatda",strdata);

        
        try {
            let response = await fetch(`http://localhost:3000/resetPassword/${userId}`,
                {
                    method : 'PUT',
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                        
                    },
                    body : strdata
                }

            )
            console.log('response,',response)
        } catch (error) {
            
        }



    }
    return (
        <>
            <form onSubmit={handleSubmit} className="resetform">
                <div className="background">
                    <div className="d-flex justify-content-evenly">
                        <div className="resetdetails">
                            <div className="reset">
                                <div className="">Reset Your Password</div>
                            </div>
                            <div className="">
                                <div className="pt-4">
                                    <label htmlFor="Password" className="newone fw-bold">
                                        Password:
                                    </label>
                                    <div className="">
                                        <input type="password" id="Password" className="currentpasswordinputtype" required onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <label htmlFor="newpassword" className="newone fw-bold">
                                        New Password:
                                    </label>
                                    <div className="">
                                        <input type="password" id="newpassword" className="currentpasswordinputtype" required onChange={(e) => setNewPassword(e.target.value)} />
                                    </div>
                                </div>
                                {error && <div className="error">{error}</div>}
                                <div className="pt-4">
                                    <input
                                        type="submit"
                                        className="px-3 resetconfirmbttn"
                                        disabled={isLoading}
                                        value={isLoading ? "Resetting..." : "Reset Password"}
                                    />
                                    {isLoading && <span>Loading...</span>}
                                </div>
                            </div>
                        </div>
                        <div className="">
                            {/* <img
                                src="./images/reset-password-concept-illustration_114360-7876.jpg"
                                className="password-image"
                                alt="Password Reset Illustration"
                            /> */}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default ResetEmployee;
