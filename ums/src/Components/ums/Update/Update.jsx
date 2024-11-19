import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to store fetched user data
  const [error, setError] = useState(null); // State to store any errors
return(
    <>  
<div className="d-flex updatebody">
  <div className="updateform-box Login">
    <div className="">
      <img
        src="images/update-concept-illustration_114360-26109.png"
        alt=""
        className="update"
      />
    </div>
    <div className="">
      <div
        className="position-absolute top-50 start-50 translate-middle"
        style={{ padding: "0px 0px 0px 700px" }}
      >
        <div className="text-center  fs-2 p-3 Details">UPDATE DETAILS</div>
        <form onsubmit="UpdateData(event)" className="updateformpage px-5 p-5">
          <div className="input-box text-center">
            {/* <label for="" class="">Username</label> */}
            <input type="text" id="username" className="box pt-5 text-center" />
            <i className="bx bxs-user" style={{ color: "#ffffff" }} />
          </div>
          <div className="input-box pt-4 text-center">
            {/* <label for="" class="">Email</label> */}
            <input type="text" id="email" className="box pt-4 text-center" />
            <i className="bx bx-envelope" style={{ color: "#ffffff" }} />
          </div>
          <div className="input-box pt-5 text-center">
            <select name="" id="user_type" className="px-5 box">
              <option value="Admin" className="opt">
                Admin
              </option>
              <option value="Employee" className="opt">
                Employee
              </option>
            </select>
          </div>
          <div className="input-box text-center pt-5">
            <input type="submit" defaultValue="submit" className="subbttnupdate p-2 px-5" />
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</>
)
}
export default Update