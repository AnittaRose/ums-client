import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Single() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to store fetched user
  const [error, setError] = useState(null); // State to store any errors

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const token_key = params.get("login");
      const id = params.get("id");
      const token = localStorage.getItem(token_key);

      if (!token) {
        setError("Token is missing in localStorage.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
        }

        const parsedResponse = await response.json();
        setUser(parsedResponse.data);
      } catch (error) {
        setError("Error fetching user data");
      }
    };

    fetchData();
  }, []);

  // Function to delete a user
  const deleteuser = async (id) => {
    let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);

        try {
            let response = await fetch(`http://localhost:3000/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                alert("Employee successfully deleted ");
                navigate (`/Admin?login=${token_key}&${id}`);
            } else {
                alert("Something went wrong ");
            }
        } catch (error) {
            console.log("error", error);
        }
  };

  // Function to update a user (this could navigate to an update form page)
  const updateuser = (id) => {


    let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);

    navigate(`/Update?login=${token_key}&${id}`); // Example route for an update page
  };

  return (
    <>
      <div className="p-4 view">
        <div className="d-flex justify-content-between align-items-center container">
          <div className="text-white">
            {/* <img
              src="https://www.bing.com/images/blob?bcid=r4G4A1d..bwHRQ"
              className="logoo"
              alt="Logo"
            /> */}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="px-2">
              <a href="./index.html" className="text-decoration-none navbarcontentss">Home</a>
            </div>
            <div className="px-2">
              <a href="#" className="text-decoration-none navbarcontentss">About Us</a>
            </div>
            <div className="px-2">
              <a href="#" className="text-decoration-none navbarcontentss">Blog</a>
            </div>
            <div className="px-2">
              <a href="#" className="text-decoration-none navbarcontentss">Contact Us</a>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container-fluid pt-4 p-3"></div> */}

      <div className="singleform" id="datacontainer">
        {error && <p className="error">{error}</p>}
        {user ? (
          <div className="pp d-flex">
            <div className=""><img src="https://img.freepik.com/free-photo/work-team-digital-art_23-2151492131.jpg?t=st=1731598825~exp=1731602425~hmac=04f58a4982bf5a35c2b260a2573daca76dbed20eb2f975d7799bf18db6f4e6be&w=996" className="singleuserimage" alt="" /></div>
              <div className="text-center singleuserdetails">
                  <div className="singledeatils pt-4">
                      <div className="use text-center pt-5">Name: {user.username}</div>
                      <div className="use text-center pt-2">Email: {user.email}</div>
                      <div className="use text-center pt-2">User Type: {user.user_type?.user_type}</div>
                      <div className="d-flex justify-content-between">
                        <div className="p-4 pt-4">
                          <button onClick={() => deleteuser(user._id)} className="text-center px-4 p-1 fw-bold singlebttn">
                            Delete
                          </button>
                        </div>
                        <div className="p-2 pt-4">
                          <button onClick={() => updateuser(user._id)} className="text-center px-4 p-1 fw-bold singlebttn">
                            Update
                          </button>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
}

export default Single;
