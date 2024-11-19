import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmailVerification() {
    const [email, setEmail] = useState(""); // Controlled input state
    const navigate = useNavigate(); // Assuming navigation might be used later

    const sendEmail = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const data = { email };
        console.log("Data to send:", data);

        try {
            const response = await fetch('http://localhost:3000/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Email sent successfully!");
                setEmail(""); // Clear the email input
            } else {
                alert("Failed to send email. Please try again.");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert("An error occurred. Please check the console for details.");
        }
    };

    return (
        <div>
            <form onSubmit={sendEmail}>
                <div className="position-absolute top-50 start-50 translate-middle">
                    <div>
                        <div className="text-center">
                            <img
                                src="./images/landing-page-new-message-concept_23-2148304415.jpg"
                                className="email-img"
                                alt="Email concept"
                            />
                        </div>
                        <div className="text-center fs-3 fw-bold link-warning pt-3">
                            Email Confirmation
                        </div>
                        <div className="pt-4 text-center">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email"
                                className="text-center px-5"
                                required
                            />
                        </div>
                        <div className="pt-3 text-center">
                            <button type="submit" className="px-3 bg-success link-light">
                                Send Email
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EmailVerification;
