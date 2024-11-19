import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const add = async (event) => {
    event.preventDefault();

    // Basic validation
    // if (!email || !password) {
    //   alert("Email and password are required!");
    //   return;
    // }

    let requestData = JSON.stringify({ email, password });

    try {
      let response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestData
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let parsedResponse = await response.json();
      if (!parsedResponse.data) {
        throw new Error('Invalid response structure');
      }

      let { user_type, token, id } = parsedResponse.data;

      let tokenKey = id;
      localStorage.setItem(tokenKey, token);

      let loginCountKey = `${id}_login_count`;
      let loginCount = parseInt(localStorage.getItem(loginCountKey) || 0);

      if (loginCount === 0) {
        localStorage.setItem(loginCountKey, 1);
        alert("This is your first login. Please reset your password.");
        navigate(`/ResetEmployee?login=${tokenKey}&id=${id}`);
        return;
      } else {
        loginCount += 1;
        localStorage.setItem(loginCountKey, loginCount);
      }

      if (user_type === 'Admin') {
        navigate(`/Admin?login=${tokenKey}&id=${id}`);
      } else if (user_type === "Employee") {
        navigate(`/Employe?login=${tokenKey}&id=${id}`);
      }

    } catch (error) {
      console.error("Login failed:", error);
      alert('Failed to login. Please try again.');
    }
  }
  const forgoten = async() => {
    navigate(`/EmailVerification`);
  }

  return (
    <>
      <div className="login_container">
        <div className="login_form_container">
          <div className="login_form">
            <form onSubmit={add}>
              <h2>Login</h2>
              <div className="input_group">
                <i className="fa fa-user" />
                <input
                  type="text"
                  placeholder="Email"
                  className="input_text"               
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input_group">
                <i className="fa fa-unlock-alt" />
                <input
                  type="password"
                  placeholder="Password"
                  className="input_text"                  
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <input type="submit" className="button_group" id="login_button" />
              </div>
              <div className="footer">
                <span className="forgot"  onClick={forgoten}>
                  Forgot Password?
                </span>
                <a>SignUp</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm;
