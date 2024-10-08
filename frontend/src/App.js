import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


import Conteiner from './components/layout/Conteiner';
import NavBar from './components/layout/NavBar';
import Message from './components/layout/Message';
import Register from './components/pages/Auth/Register';
import Login from './components/pages/Auth/Login';
import Home from "./components/Home"
import AdminBooks from './components/pages/Books/AdminBooks';
import AddBooks from './components/pages/Books/AddBooks';
import EditBook from './components/pages/Books/EditBook';
import BookDetails from './components/pages/Books/BookDetails';
import Cart from './components/pages/Cart/Cart';

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
            <Route path="/books/adminBooks" element={<AdminBooks />} />
            <Route path="/books/add" element={<AddBooks />} />
            <Route path="/books/edit/:id" element={<EditBook />} />
            <Route path="/books/details/:id" element={<BookDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Conteiner>
      </UserProvider>
    </Router>
  );
}

export default App;
