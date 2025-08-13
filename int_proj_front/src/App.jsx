import {Routes, Route} from 'react-router-dom';
import Welcome from './pages/Welcome.jsx';
import NavBar from './components/NavBar.jsx';
import { useEffect } from 'react';
import LoginPage from './pages/login.jsx';
import Register from './pages/Register.jsx';

function App() {
  useEffect(() => {
      document.querySelector("html").setAttribute("data-theme", "corporate"); // or "corporate"
    }, []);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<Register />} />   
      </Routes>
    </div>
  );
}

export default App
