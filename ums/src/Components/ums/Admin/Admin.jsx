
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Single from "../single/Singlepage";

function Admin() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);  // State to store fetched users
    const [error, setError] = useState(null); // State to store any errors

    // Fetch users on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const token_key = params.get('login');
                const token = localStorage.getItem(token_key);

                const response = await fetch(`http://localhost:3000/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const parsedResponse = await response.json();
                setUsers(parsedResponse.data);  // Set the users data
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch users.");
            }
        };

        fetchData();
    }, []);

    // Button click handler
    const handleAddButtonClick = () => {
        // event.preventDefault();
        const params = new URLSearchParams(window.location.search);
        const token_key = params.get('login');
        
        const id = params.get('id');
        navigate(`/Add?login=${token_key}&id=${id}`);
    };
    const Singleuser = async(id) =>{
        let params = new URLSearchParams(window.location.search);
        console.log('params', params);

        let token_key = params.get('login');
        console.log("token_key", token_key);

        // let id = params.get('id');
        // console.log("id", id);

        let token = localStorage.getItem(token_key)
        navigate(`/Single?login=${token_key}&id=${id}`);

    }
    return (
        <>
            <div className="navbar">
                <div className="d-flex justify-content-between align-items-center container">
                    <div className="link-dark fw-bold fs-3">
                        {/* <img
                            src="https://www.bing.com/images/blob?bcid=r4G4A1d..bwHRQ"
                            className="logoo"
                            alt=""
                        /> */}
                    </div>
                    {/* Nav links */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="px-2">
                            <a href="./index.html" className="text-decoration-none link-light fw-bold">
                                Home
                            </a>
                        </div>
                        <div className="px-2">
                            <a href="#" className="text-decoration-none link-light fw-bold">
                                AboutUs
                            </a>
                        </div>
                        <div className="px-2">
                            <a href="#" className="text-decoration-none link-light fw-bold">
                                Blog
                            </a>
                        </div>
                        <div className="px-2">
                            <a href="#" className="text-decoration-none link-light fw-bold">
                                ContactUs
                            </a>
                        </div>
                        <button
                            className=""
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                        >
                            <i className="fa fa-bars" style={{ fontSize: 18 }} />
                        </button>
                        <span>
                            <img
                                src="https://img.icons8.com/?size=100&id=86280&format=png&color=FFFFFF"
                                className="user-icon"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasTop"
                                aria-controls="offcanvasTop"
                                alt=""
                            />
                        </span>
                    </div>
                </div>
            </div>
            
            <table className="table container pt-5">
                <thead>
                    <tr className="tr text-center">
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">View</th>
                    </tr>
                </thead>
                <tbody id="userTable" className="tab fw-bold text-center">
                    {error ? (
                        <tr>
                            <td colSpan="3" className="text-danger">{error}</td>
                        </tr>
                    ) : users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id} className="shadow-lg box rounded">
                                <td className="link-dark">{user.username}</td>
                                <td className="link-dark">{user.email}</td>
                                <td>
                                    <button className="bttn px-5 p-2" onClick={()=>Singleuser(user._id)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Loading users...</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>
                <div className="offcanvas-body">
                    <div>
                        <button className="bttn px-5 p-2" onClick={handleAddButtonClick}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;
