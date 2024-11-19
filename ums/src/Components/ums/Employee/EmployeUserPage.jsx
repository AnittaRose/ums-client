import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeUserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to store fetched user data
  const [error, setError] = useState(null); // State to store any errors

  useEffect(() => {
    const fetchUserData = async () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      const tokenKey = params.get("login");
      const token = localStorage.getItem(tokenKey);

      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const parsedResponse = await response.json();
        setUser(parsedResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    // Add your sign-out logic here
    localStorage.clear();
    navigate("/login"); // Redirect to login page
  };

  const handleReset = () => {


    let params = new URLSearchParams(window.location.search);
        // let token_key = params.get('token');
        const token_key = params.get("login");
        
        let id = params.get('id')
        console.log('id',id)

    navigate(`/ResetEmployee?login=${token_key}&id=${id}`); // Example route for an update page
  };

  return (
    <>
      <div className="bg-dark">
        <div className="d-flex justify-content-between align-items-center container">
          <div className="link-light fs-4">Employee</div>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="px-2">
                <a href="./index.html" className="text-decoration-none link-light">
                  Home
                </a>
              </div>
              <div className="px-2">
                <a href="#" className="text-decoration-none link-light">
                  AboutUs
                </a>
              </div>
              <div className="px-2">
                <a href="#" className="text-decoration-none link-light">
                  Blog
                </a>
              </div>
              <div className="px-2">
                <a href="#" className="text-decoration-none link-light">
                  ContactUs
                </a>
              </div>
              <button
                className="btn btn-outline-light"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <i className="fa fa-bars" style={{ fontSize: 24 }} />
              </button>
              <div
                className="offcanvas offcanvas-end"
                tabIndex={-1}
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                <div className="offcanvas-header">
                  <h5 id="offcanvasRightLabel" />
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  />
                </div>
                <div className="offcanvas-body">
                  <div className="text-center pt-3">
                    <button onClick={handleReset} className="resetbttn px-3">
                      Reset
                    </button>
                  </div>
                  <div>
                    <button className="custom-btn btn-2 fw-bold" onClick={handleSignOut}>
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="Port" className="text-center employeeimages">
        
        {error && <div className="alert alert-danger">Error: {error}</div>}
        {user ? (
          <div className="card position-absolute top-50 start-50 translate-middle">
            <div className="card__img">
              
            </div>
            
            <div className=" text-center">
            <div className="">
              <img src="https://img.freepik.com/free-photo/work-team-digital-art_23-2151492147.jpg?t=st=1731647441~exp=1731651041~hmac=805c52e5240c2cb71134e5745a2bb843c95c74e395aa3b73f988c4765eded4b7&w=996" className="singleEmployeeImage" alt="" />
              </div>
              <div>Name: {user.username}</div>
              <div>Email: {user.email}</div>
              <div>User Type: {user.user_type.user_type}</div>
            </div>
          </div>

          
        ) : (
          !error && <div>Loading...</div>
        )}
      </div>
    </>
  );
}

export default EmployeUserPage;
