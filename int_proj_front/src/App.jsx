import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { useEffect } from 'react';
import LoginPage from './pages/Auth/login.jsx';
import Register from './pages/Auth/Register.jsx';
import JobOffers from './pages/JobOffers/JobOffers.jsx'
import Home from './pages/Home.jsx';
import CreateCompany from './pages/Company/CreateCompany.jsx';
import UpdateCompany from './pages/Company/UpdateCompany.jsx';
import ShowCompany from './pages/Company/ShowCompany.jsx';
import EmployeeProfile from './pages/User/EmployeeProfile.jsx';
import EmployerProfile from './pages/User/EmployerProfile.jsx'
import JobOfferPage from './pages/JobOffers/JobOfferPage.jsx';
import Companies from './pages/Company/Companies.jsx';

function App() {
  useEffect(() => {
      document.querySelector("html").setAttribute("data-theme", "corporate"); // or "corporate"
    }, []);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/job-offers' element={<JobOffers />}/>
        <Route path='/create-company' element={<CreateCompany/>}/>
        <Route path='/update-company' element={<UpdateCompany/>}/>
        <Route path='/my-company' element={<ShowCompany/>}/>
        <Route path="/employee/profile" element={<EmployeeProfile />} />
        <Route path="/employer/profile" element={<EmployerProfile />} />
        <Route path="/job-offers/:id" element={<JobOfferPage/>}/>
        <Route path="companies" element={<Companies/>}/>
      </Routes>
    </div>
  );
}

export default App
