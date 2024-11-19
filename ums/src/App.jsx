import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './components/ums/pages/login.css';
import Login from "./Components/ums/pages/login";

import 'bootstrap/dist/css/bootstrap.min.css';

import Admin from './Components/ums/Admin/Admin';
import './Components/ums/Admin/Admin.css'
import Employe from './Components/ums/Employee/Employe';
import './Components/ums/Employee/Employe.css'
import Add from './Components/ums/Add/Add';
import './Components/ums/Add/Add.css'
import EmployeUserPage from './Components/ums/Employee/EmployeUserPage';
import './Components/ums/Employee/EmployeUserPage.css'
import Single from './Components/ums/single/Singlepage';
import './Components/ums/single/Single.css'
import Update from './Components/ums/Update/Update';
import './Components/ums/Update/Update.css'
import ResetEmployee from './Components/ums/Reset/ResetEmployee';
import './Components/ums/Reset/ResetEmployee.css'
import EmailVerification from './Components/ums/forgot/EmailVerification';
import './Components/ums/forgot/EmailVerification.css'
function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path={'/'} exact element={<Login />} />
          <Route path={'/Login'} exact element={<Login />} />
          <Route path={'/Admin'} exact element={<Admin />} />
          <Route path={'/Employe'} exact element={<Employe />} />
          <Route path={'/Add'} exact element = {<Add />} />
          <Route path={'/EmployeUserPage'} exact element ={<EmployeUserPage />} />
          <Route path={'/Single'}exact element = {<Single />} />
          <Route path={'/Update'} exact element = {<Update />} />
          <Route path={'/ResetEmployee'} exact element = {<ResetEmployee />} />
          <Route path={'/EmailVerification'}exact element = {<EmailVerification />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
