import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


import Home from "./components/Home"
import NavBar from './components/layout/NavBar';
import Conteiner from './components/layout/Conteiner';
import Register from './components/pages/Auth/Register';
import Message from './components/layout/Message';
import Login from './components/pages/Auth/Login';

import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <NavBar />
        <Message />
        <Conteiner>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />
          </Routes>
        </Conteiner>
      </UserProvider>
    </Router>
  );
}

export default App;
