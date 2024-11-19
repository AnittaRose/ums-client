import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Addpage() {
  const navigate = useNavigate();

  useEffect(() => {
    const addpage = () => {
      let params = new URLSearchParams(window.location.search);
      let token_key = params.get("login");
      console.log(token_key);

      if (token_key) {
        navigate(`/Add?login=${token_key}`);
      }
    };

    addpage();
  }, [navigate]);

  const handleSubmit = async (event) => { // Make handleSubmit async
    event.preventDefault();
    console.log("Form submission started...");

    const params = new URLSearchParams(window.location.search);
    const token_key = params.get("login");
    const token = localStorage.getItem(token_key);

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const user_type = document.getElementById("user_type").value;

    if (!username || !email || !user_type) {
      alert("Please fill out all fields.");
      return;
    }

    const data = { username, email, user_type };
    const strdata = JSON.stringify(data);

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: strdata,
      });

      const parsed_response = await response.json();

      if (response.status === 200) {
        if (user_type === "Admin") {
          alert("Admin added successfully");
        } else if (user_type === "Employee") {
          alert("Employee was successfully created");
        }
        // navigate(`/admin?login=${token_key}`);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  const signOut = () => {
    console.log("User signed out");
  };

  return (
    <>
    <div className="hi">
      <div className="navbar">
        <div className="d-flex justify-content-between align-items-center container">
          <div className="link-dark fw-bold fs-3">
            {/* <img
              src="https://www.bing.com/images/blob?bcid=r4G4A1d..bwHRQ"
              className="logoo"
              alt=""
            /> */}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="px-2">
              <a href="./admin.html" className="text-decoration-none link-dark fw-bold">
                Home
              </a>
            </div>
            <div className="px-2">
              <a href="#" className="text-decoration-none link-dark fw-bold">
                AboutUs
              </a>
            </div>
            <div className="px-2">
              <a href="#" className="text-decoration-none link-dark fw-bold">
                Blog
              </a>
            </div>
            <div className="px-2">
              <a href="#" className="text-decoration-none link-dark fw-bold">
                ContactUs
              </a>
            </div>
            <button
              className=""
              type=""
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <i className="fa fa-bars" style={{ fontSize: 24 }} />
            </button>
            <span>
              <img
                src="https://img.icons8.com/?size=100&id=98957&format=png&color=1A1A1A"
                className="user-icon"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop"
                aria-controls="offcanvasTop"
                alt=""
              />
            </span>
            <div
              className="offcanvas offcanvas-top"
              tabIndex={-1}
              id="offcanvasTop"
              aria-labelledby="offcanvasTopLabel"
            >
              <div className="offcanvas-header">
                <h5 id="offcanvasTopLabel">Offcanvas top</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body">...</div>
            </div>
            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body">
                <button className="bttn px-5 p-2" onClick={signOut}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="text-center pt-4 fs-3  addemployee fw-bold">Add Employee</div>
      <div className="addform text-center pt-5">
          <form onSubmit={handleSubmit}>
            {/* <div className="fs-3 text-center add fw-bold">Add Employee</div> */}
            <div className="input-box pt-3">
              {/* <input
                type="text"
                id="username"
                className="text-center  pt-3 px-3"
                placeholder="Enter Username"
              /> */}
              <input type="text" name="text" className="userinput" placeholder="Type your username" id="username"></input>
              <i className="bx bxs-user" style={{ color: "#ffffff" }} />
            </div>
            <div className="input-box pt-4">
              <input
                type="text"
                id="email"
                className="userinput text-center pt-3 px-3"
                placeholder="Enter Email"
              />
            </div>
           
            <div className="input-box pt-4">
              <select id="user_type" className="userinput px-5 select pt-3">
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <div className="input-box pt-4">
              <button className="bttn1 px-5 fw-bold" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="addcontainer">

      </div>
      </div>
    </>
  );
}

export default Addpage;
